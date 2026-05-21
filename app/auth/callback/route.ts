import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Password recovery → go to admin login so user can sign in with new password
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/admin/login`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to home on error
  return NextResponse.redirect(`${origin}/`);
}
