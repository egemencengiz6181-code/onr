"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const sections = [
  {
    title: "1. Veri Sorumlusu",
    body: `ONR Mücevherat Ticaret A.Ş. ("ONR" veya "Şirket") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi işlemekteyiz. Şirket merkez adresi: Çankaya, Ankara, Türkiye.`,
  },
  {
    title: "2. Toplanan Kişisel Veriler",
    body: `Sitemizi ziyaret ettiğinizde ve/veya hizmetlerimizden yararlandığınızda aşağıdaki kişisel veriler toplanabilir:

• Kimlik bilgileri (ad, soyad)
• İletişim bilgileri (e-posta adresi, telefon numarası, adres)
• Alışveriş geçmişi ve sipariş bilgileri
• Ödeme bilgileri (kart numarası doğrudan tarafımızca saklanmaz; PCI-DSS uyumlu ödeme altyapısı kullanılır)
• Web sitesi kullanım verileri (IP adresi, tarayıcı bilgileri, çerez verileri)
• İletişim formları aracılığıyla ilettiğiniz mesaj ve talepler`,
  },
  {
    title: "3. Verilerin İşlenme Amaçları",
    body: `Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:

• Sipariş süreçlerinin yönetimi ve teslimat
• Müşteri ilişkileri yönetimi ve destek
• Yasal yükümlülüklerin yerine getirilmesi
• Hizmet kalitesinin artırılması ve analiz
• İlgili mevzuat gereği saklama ve raporlama
• Açık rızanız doğrultusunda pazarlama iletişimi`,
  },
  {
    title: "4. Verilerin Aktarılması",
    body: `Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlara uygun olarak aşağıdaki taraflara aktarılabilir:

• Kargo ve lojistik firmaları (teslimat amacıyla)
• Ödeme kuruluşları ve bankalar (ödeme işlemleri için)
• Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları
• Hizmet aldığımız iş ortakları ve tedarikçiler (veri işleyen sıfatıyla, gizlilik sözleşmeleri kapsamında)

Kişisel verileriniz yurt dışına aktarılmamaktadır. Yurt dışı aktarım gerektiğinde KVKK'nın öngördüğü açık rıza veya yeterli koruma koşulları sağlanacaktır.`,
  },
  {
    title: "5. Çerez Politikası",
    body: `Web sitemizde teknik olarak zorunlu çerezler, performans çerezleri ve analitik çerezler kullanılmaktadır.

• Zorunlu çerezler: Sitenin düzgün çalışması için gereklidir ve devre dışı bırakılamaz.
• Analitik çerezler: Ziyaretçi davranışını anonim olarak analiz etmemize yardımcı olur (Google Analytics).
• Tercih çerezleri: Dil ve bölge tercihlerinizi hatırlar.

Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Çerezleri devre dışı bırakmanız sitenin bazı özelliklerini etkileyebilir.`,
  },
  {
    title: "6. Veri Güvenliği",
    body: `Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari tedbirler alınmaktadır:

• SSL/TLS şifreleme ile veri iletimi
• Erişim kontrolleri ve yetkilendirme mekanizmaları
• Düzenli güvenlik değerlendirmeleri
• Çalışanlara yönelik veri koruma eğitimleri
• PCI-DSS uyumlu ödeme altyapısı`,
  },
  {
    title: "7. Veri Saklama Süresi",
    body: `Kişisel verileriniz, işleme amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatın öngördüğü yasal saklama süreleri dahilinde muhafaza edilir. Saklama süresinin sona ermesiyle birlikte, veriler KVKK'ya uygun şekilde silinir, yok edilir veya anonim hale getirilir.`,
  },
  {
    title: "8. Haklarınız (KVKK Madde 11)",
    body: `KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenmişse buna ilişkin bilgi talep etme
• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
• Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme
• KVKK'nın 7. maddesi kapsamında silinmesini veya yok edilmesini isteme
• Düzeltme, silme veya yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme
• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme
• Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme

Başvurularınızı info@onrmucevherat.com adresine veya şirket merkezimize yazılı olarak iletebilirsiniz.`,
  },
  {
    title: "9. Değişiklikler",
    body: `Bu gizlilik politikası en son 1 Ocak 2026 tarihinde güncellenmiştir. ONR Mücevherat, yasal düzenlemeler veya iş süreçlerindeki değişiklikler doğrultusunda bu politikayı güncelleme hakkını saklı tutar. Güncellemeler bu sayfada yayımlanacaktır.`,
  },
];

export default function GizlilikPolitikasiClient() {
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
            Gizlilik Politikası
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
