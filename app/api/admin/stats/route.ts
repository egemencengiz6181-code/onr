import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) return null;
  return user;
}

/**
 * Dashboard özeti — tek istekte.
 * Öncesinde dashboard üç tabloyu da tamamen indirip `.length` alıyordu;
 * sayımlar artık `head: true` ile satır gövdesi olmadan geliyor.
 */
export async function GET() {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await createAdminClient();

  const [productCount, orderTotals, recent, customers] = await Promise.all([
    admin.from("products").select("id", { count: "exact", head: true }),
    // Ciro için sadece total kolonu — satır başına tek sayı.
    admin.from("orders").select("total"),
    admin
      .from("orders")
      .select("id, order_number, user_email, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    admin.auth.admin.listUsers({ perPage: 1 }),
  ]);

  const totals = (orderTotals.data ?? []) as { total: number | null }[];
  // listUsers hata durumunda pagination alanları olmayan bir şekil döndürüyor.
  const customerCount =
    customers.data && "total" in customers.data ? customers.data.total : 0;

  return NextResponse.json({
    products: productCount.count ?? 0,
    orders: totals.length,
    customers: customerCount,
    revenue: totals.reduce((sum, o) => sum + (o.total ?? 0), 0),
    recentOrders: recent.data ?? [],
  });
}
