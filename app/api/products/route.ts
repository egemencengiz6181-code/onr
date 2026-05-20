import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Public products endpoint — no auth required, only published products
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categorySlug = url.searchParams.get("category");
    const slug = url.searchParams.get("slug");
    const limit = url.searchParams.get("limit");

    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (categorySlug) query = query.eq("category_slug", categorySlug);
    if (limit) query = query.limit(parseInt(limit));
    if (slug) {
      query = query.eq("slug", slug).single();
      const { data, error } = await query;
      if (error) return NextResponse.json(null);
      return NextResponse.json(data);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json([]);
    return NextResponse.json(data ?? [], {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
