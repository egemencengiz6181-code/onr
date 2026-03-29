"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const sections = [
  {
    title: "1. Genel Bilgi",
    body: `Bu web sitesi, ONR Mücevherat Ticaret A.Ş. ("ONR") tarafından işletilmektedir. Siteye erişerek veya siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız lütfen siteyi kullanmayınız.`,
  },
  {
    title: "2. Fikri Mülkiyet Hakları",
    body: `Bu sitede yer alan tüm içerikler — metinler, fotoğraflar, grafikler, logolar, tasarımlar, yazılım ve diğer materyaller — ONR Mücevherat'ın veya lisans verenlerinin telif hakkı koruması altındadır.

• Hiçbir içerik, önceden yazılı izin alınmaksızın kopyalanamaz, çoğaltılamaz, dağıtılamaz veya yayınlanamaz.
• ONR logosu ve markası, tescilli ticari markadır.
• Kişisel ve ticari olmayan kullanım için sınırlı görüntüleme hakkı tanınmaktadır.`,
  },
  {
    title: "3. Kullanım Kuralları",
    body: `Siteyi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:

• Siteyi yalnızca yasal amaçlarla kullanmak
• Başkalarının haklarını ihlal eden herhangi bir faaliyette bulunmamak
• Siteye veya altyapısına zarar verebilecek işlemler yapmamak
• Otomatik veri toplama araçları (bot, scraper vb.) kullanmamak
• Yanıltıcı veya gerçek dışı bilgi sunmamak`,
  },
  {
    title: "4. Ürün Bilgileri ve Fiyatlar",
    body: `Sitede yer alan ürün açıklamaları, görseller ve fiyatlar bilgilendirme amaçlıdır.

• Ürün görselleri temsilidir; ekran ayarlarına bağlı olarak renk farklılıkları olabilir.
• ONR, fiyat ve ürün bilgilerini önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar.
• Yazım hatası veya sistem kaynaklı belirgin fiyat hatalarında ONR, siparişi iptal etme hakkına sahiptir.
• Tüm fiyatlara KDV dahildir.`,
  },
  {
    title: "5. Sipariş ve Sözleşme",
    body: `Sipariş vermeniz bir satın alma teklifi niteliğindedir. Sipariş onay e-postamız, satış sözleşmesinin kurulması anlamına gelir.

• ONR, haklı nedenlerle (stok tükenmesi, fiyat hatası vb.) siparişi kabul etmeme hakkını saklı tutar.
• Mesafeli satış sözleşmesi, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmeliklere tabidir.`,
  },
  {
    title: "6. Sorumluluk Sınırı",
    body: `ONR Mücevherat, siteyi "olduğu gibi" sunmaktadır.

• Sitenin kesintisiz veya hatasız çalışacağını garanti etmez.
• Üçüncü taraf sitelere verilen bağlantılardan sorumlu değildir.
• Mücbir sebepler (doğal afet, savaş, teknik altyapı sorunları vb.) nedeniyle oluşan aksaklıklardan sorumlu tutulamaz.
• Site kullanımından doğabilecek dolaylı zararlardan sorumluluk kabul etmez.`,
  },
  {
    title: "7. Uyuşmazlık Çözümü",
    body: `Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda Ankara Tüketici Hakem Heyetleri ve Ankara Mahkemeleri ile İcra Daireleri yetkilidir.

Tüketici şikayetleri için T.C. Ticaret Bakanlığı Tüketici Şikayet Hattı: 175`,
  },
  {
    title: "8. Değişiklikler",
    body: `ONR, bu kullanım koşullarını önceden bildirimde bulunmaksızın güncelleme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayımlanacaktır.

Son güncelleme: 1 Ocak 2026`,
  },
];

export default function KullanimKosullariClient() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* ── Header ─────────────────────────── */}
        <section className="pt-36 pb-10 lg:pt-44 lg:pb-14 px-8 lg:px-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4"
          >
            Yasal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="font-serif text-charcoal text-3xl lg:text-5xl"
          >
            Kullanım Koşulları
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-12 h-px bg-gold mx-auto mt-6"
          />
        </section>

        {/* ── Content ────────────────────────── */}
        <section className="max-w-3xl mx-auto px-8 lg:px-0 pb-28 lg:pb-36">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease }}
              >
                <h2 className="font-serif text-charcoal text-xl lg:text-2xl mb-4">
                  {s.title}
                </h2>
                <div className="text-charcoal/60 font-sans font-light text-[14px] leading-[1.9] whitespace-pre-line">
                  {s.body}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </PageWrapper>
  );
}
