import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Çerez okumayan, salt-okunur istemci — vitrindeki ürün sorguları için.
 *
 * Çerez okuyan server client'ı kullanmak Next.js'i sayfayı dinamik render
 * etmeye zorluyor (her istekte yeniden), çünkü cookies() dynamic bir API.
 * Ürün listeleri herkese aynı gösterildiğinden çereze ihtiyaç yok; bu
 * istemciyle sayfalar ISR ile önbelleklenebiliyor.
 *
 * Aynı public anon anahtarı ve aynı RLS politikaları geçerli — yetki
 * açısından değişen bir şey yok, sadece oturum bağlamı taşınmıyor.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
