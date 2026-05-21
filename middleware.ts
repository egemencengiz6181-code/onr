import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If Supabase env vars are not configured, redirect /admin to /admin/login
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // auth check failed — treat as unauthenticated
  }

  // Protect /admin — redirect to /admin/login if not authenticated
  // Allow /admin/login through always
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Protect /odeme — redirect to /sepet if not authenticated
  if (pathname.startsWith("/odeme") && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sepet";
    return NextResponse.redirect(redirectUrl);
  }

  // Protect /profil and /siparislerim — redirect to home if not authenticated
  if ((pathname.startsWith("/profil") || pathname.startsWith("/siparislerim")) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/odeme/:path*", "/profil/:path*", "/siparislerim/:path*"],
};
