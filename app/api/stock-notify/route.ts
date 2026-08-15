import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/** Herkese açık uç — service-role ile yazar, tabloya public policy açmaya gerek kalmaz. */
function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { productId?: string; email?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const phone = (body.phone ?? "").trim();
  const productId = (body.productId ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
  }
  // Rakam sayısına bakıyoruz; kullanıcı boşluk/parantez/+90 kullanabilsin.
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Geçerli bir telefon numarası girin." }, { status: 400 });
  }
  if (!productId) {
    return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, name, slug")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !product) {
    return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  const { error } = await supabase.from("stock_notifications").insert({
    product_id: product.id,
    product_name: product.name,
    product_slug: product.slug,
    email,
    phone,
  });

  if (error) {
    // Aynı ürün + e-posta zaten kayıtlı — kullanıcı için bu bir hata değil.
    if (error.code === "23505") return NextResponse.json({ ok: true, alreadyRegistered: true });
    return NextResponse.json({ error: "Kayıt alınamadı, lütfen tekrar deneyin." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
