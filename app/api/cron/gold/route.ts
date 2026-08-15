import { NextResponse } from "next/server";
import { syncGoldPrice } from "@/lib/supabase/gold";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Zamanlanmış gram altın senkronizasyonu (vercel.json → crons).
 * Vercel'in kendi cron çağrısı ya da CRON_SECRET taşıyan istekler kabul edilir.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const isVercelCron = request.headers.has("x-vercel-cron");

  if (!isVercelCron && (!secret || auth !== `Bearer ${secret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // force yok: panelden otomatik güncelleme kapatıldıysa cron da dokunmaz.
    const result = await syncGoldPrice();
    return NextResponse.json({
      ok: true,
      gramPrice: result.quote?.price ?? null,
      source: result.quote?.source ?? null,
      updated: result.updated,
      skipped: result.skipped,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Beklenmeyen hata";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
