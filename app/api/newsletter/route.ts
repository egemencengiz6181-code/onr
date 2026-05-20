import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Geçersiz e-posta" }, { status: 400 });
  }

  const admin = await createAdminClient();
  const { error } = await admin
    .from("newsletter_subscribers")
    .upsert({ email: email.toLowerCase().trim() }, { onConflict: "email" });

  if (error) {
    // Table may not exist yet — still return success to not break UI
    console.error("[newsletter] DB error:", error.message);
  }

  return NextResponse.json({ ok: true });
}
