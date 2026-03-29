"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const deliverySections = [
  {
    title: "Sigortalı & Güvenli Teslimat",
    body: `ONR Mücevherat olarak, her kargonuz tam değer sigortası ile gönderilir. Değerli mücevherleriniz, özel güvenlik ambalajı içinde, kimliğiniz doğrulanarak teslim edilir.

• Tüm gönderiler sigortalıdır — kargo sürecindeki her türlü hasar veya kayıp tarafımızca karşılanır.
• Teslimat, yalnızca alıcıya veya yetkilendirdiği kişiye, kimlik kontrolü ile yapılır.
• Özel güvenlik mühürlü, hasara dayanıklı ambalaj kullanılır.`,
  },
  {
    title: "Teslimat Süreleri",
    body: `• Ankara içi: 1 iş günü
• Türkiye geneli: 2-4 iş günü
• Özel tasarım ve kişiselleştirilmiş ürünler: Üretim süresi + kargo süresi (tahmini süre sipariş onayında bildirilir)

Kargo takip numarası, gönderim yapıldığında e-posta ve SMS ile iletilir.`,
  },
  {
    title: "Kargo Ücreti",
    body: `• 10.000 ₺ ve üzeri siparişlerde kargo ücretsizdir.
• 10.000 ₺ altı siparişlerde sigortalı kargo ücreti 249 ₺'dir.
• Mağazadan teslim (Ankara şubeleri) seçeneği ücretsizdir.`,
  },
];

const returnSections = [
  {
    title: "14 Gün İade Hakkı",
    body: `6502 sayılı Tüketicinin Korunması Hakkında Kanun'un 48. maddesi ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, ürünü teslim aldığınız tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkınızı kullanabilirsiniz.

• İade talebinizi info@onrmucevherat.com adresine veya 0312 XXX XX XX numarasına iletebilirsiniz.
• İade onayından sonra ürünü tarafımızca gönderilen sigortalı kargo ile geri göndermeniz gerekir.
• İade kargo ücreti ONR Mücevherat tarafından karşılanır.`,
  },
  {
    title: "İade Koşulları",
    body: `İade edilecek ürünlerin aşağıdaki koşulları sağlaması gerekmektedir:

• Ürün kullanılmamış, hasar görmemiş ve orijinal durumunda olmalıdır.
• Orijinal ambalajı, sertifikası ve faturası ile birlikte iade edilmelidir.
• Kişiye özel tasarım ve gravür yapılmış ürünler cayma hakkı kapsamı dışındadır (Mesafeli Sözleşmeler Yönetmeliği Madde 15/ç).
• Hijyen sebebiyle ambalajı açılmış piercing ürünleri iade edilemez.`,
  },
  {
    title: "İade Süreci ve Geri Ödeme",
    body: `• İade talebiniz onaylandıktan sonra ürünü 10 gün içinde göndermeniz gerekmektedir.
• Ürün tarafımıza ulaştıktan sonra kalite kontrolü yapılır.
• Onaylanan iadeler için geri ödeme, ödeme yönteminize bağlı olarak 14 iş günü içinde gerçekleştirilir.
• Kredi kartı ile yapılan ödemelerde iade, ilgili bankanın süreçlerine bağlı olarak 1-2 hesap döneminde kart ekstrenize yansır.`,
  },
  {
    title: "Değişim",
    body: `• Beden değişimi (yüzük, bileklik) için ürünü iade koşullarına uygun şekilde göndermeniz yeterlidir.
• Değişim kargo ücreti ONR Mücevherat tarafından karşılanır.
• Stok durumuna bağlı olarak, aynı modelin farklı bedeni mevcut değilse iade işlemi başlatılır.`,
  },
];

export default function TeslimatVeIadeClient() {
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
            Müşteri Hizmetleri
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="font-serif text-charcoal text-3xl lg:text-5xl"
          >
            Teslimat & İade
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-12 h-px bg-gold mx-auto mt-6"
          />
        </section>

        {/* ── Delivery ───────────────────────── */}
        <section className="max-w-3xl mx-auto px-8 lg:px-0 pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-10"
          >
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase mb-2">
              Teslimat
            </p>
            <div className="w-8 h-px bg-gold" />
          </motion.div>

          <div className="space-y-10">
            {deliverySections.map((s, i) => (
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

        {/* ── Divider ────────────────────────── */}
        <div className="max-w-3xl mx-auto px-8 lg:px-0">
          <div className="h-px bg-charcoal/8" />
        </div>

        {/* ── Returns ────────────────────────── */}
        <section className="max-w-3xl mx-auto px-8 lg:px-0 pt-16 pb-28 lg:pt-20 lg:pb-36">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-10"
          >
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase mb-2">
              İade & Değişim
            </p>
            <div className="w-8 h-px bg-gold" />
          </motion.div>

          <div className="space-y-10">
            {returnSections.map((s, i) => (
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
