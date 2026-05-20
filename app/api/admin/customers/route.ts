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

export async function GET() {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await createAdminClient();

  // List all auth users (includes users without profiles)
  const { data: { users }, error: authErr } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (authErr) return NextResponse.json({ error: authErr.message }, { status: 500 });

  // Get profiles for extra data (full_name, role)
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, full_name, role");

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

  const result = users.map((u) => {
    const profile = profileMap.get(u.id);
    return {
      id: u.id,
      full_name: profile?.full_name ?? (u.user_metadata?.full_name as string | null) ?? null,
      email: u.email ?? null,
      role: profile?.role ?? "user",
      created_at: u.created_at,
    };
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json(result);
}
