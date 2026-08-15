import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getGoldSettings } from "@/lib/supabase/gold";
import { computeMilyemPrice } from "@/lib/goldPricing";

async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) return null;
  return user;
}

/** Liste tablosunun gerçekten gösterdiği kolonlar. description / specs gibi
 *  ağır alanları çekmemek listeyi onlarca kat küçültüyor. */
const LIST_COLUMNS =
  "id, name, category, sku, price, stock_count, is_published, is_sold_out, images, created_at, price_by_milyem, gram, milyem";

/** Milyem ile fiyatlanan ürünlerde satış fiyatını istemciye bırakmıyoruz —
 *  tek doğru kaynak sunucudaki çarpan tablosu ve güncel gram altın. */
type ProductFields = Record<string, unknown>;

async function applyMilyemPrice(fields: ProductFields): Promise<ProductFields> {
  if (!fields.price_by_milyem) return fields;

  const gram = Number(fields.gram);
  const milyem = Number(fields.milyem);
  if (!(gram > 0) || !(milyem > 0)) {
    throw new Error("Milyem ile fiyatlanan üründe gram ve milyem değerleri zorunludur.");
  }

  const settings = await getGoldSettings();
  const price = computeMilyemPrice(gram, milyem, settings);
  if (price <= 0) throw new Error("Fiyat hesaplanamadı — milyem çarpan tablosunu kontrol edin.");

  return { ...fields, price };
}

export async function GET(request: Request) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const view = searchParams.get("view");

  const admin = await createAdminClient();

  // Tek ürün — düzenleme sayfası tüm katalogu indirmek zorunda kalmasın.
  if (id) {
    const { data, error } = await admin
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    return NextResponse.json(data);
  }

  const { data, error } = await admin
    .from("products")
    .select(view === "list" ? LIST_COLUMNS : "*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const admin = await createAdminClient();

  let payload: ProductFields;
  try {
    payload = await applyMilyemPrice(body);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }

  const { data, error } = await admin.from("products").insert(payload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...fields } = await request.json();
  const admin = await createAdminClient();

  // Yayın anahtarı gibi kısmi güncellemeler fiyata dokunmasın; sadece milyem
  // alanları gelen isteklerde yeniden hesapla.
  const milyemKeys = ["price_by_milyem", "gram", "milyem"] as const;
  let payload: ProductFields = fields;

  if (milyemKeys.some((k) => k in fields)) {
    let merged: ProductFields = fields;
    if (!milyemKeys.every((k) => k in fields)) {
      const { data: existing } = await admin
        .from("products")
        .select("price_by_milyem, gram, milyem")
        .eq("id", id)
        .maybeSingle();
      merged = { ...(existing ?? {}), ...fields };
    }
    if (merged.price_by_milyem) {
      try {
        const priced = await applyMilyemPrice(merged);
        payload = { ...fields, price: priced.price };
      } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 400 });
      }
    }
  }

  const { data, error } = await admin
    .from("products")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  const admin = await createAdminClient();
  const { error } = await admin.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
