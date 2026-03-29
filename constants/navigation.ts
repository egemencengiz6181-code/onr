// ─── Navigation Data (Mega Menu) ─────────────────────────────────

export interface MegaMenuItem {
  label: string;
  href: string;
  image?: string;
}

export interface MegaMenuSubTab {
  id: string;
  label: string;
  items: MegaMenuItem[];
  viewAllHref: string;
}

export interface InspirationLink {
  label: string;
  href: string;
}

export interface NavCategory {
  id: string;
  label: string;
  href: string;
  hasMegaMenu: boolean;
  subTabs?: MegaMenuSubTab[];
  inspirationLinks?: InspirationLink[];
}

export const mainCategories: NavCategory[] = [
  {
    id: "yuksek-mucevher",
    label: "Exclusive",
    href: "/exclusive",
    hasMegaMenu: false,
  },
  {
    id: "mucevher",
    label: "Mücevher",
    href: "/koleksiyonlar",
    hasMegaMenu: true,
    subTabs: [
      {
        id: "yuzuk",
        label: "Yüzük",
        viewAllHref: "/koleksiyonlar/halkalar",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/halkalar?tas=P%C4%B1rlanta", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop&crop=center" },
          { label: "Nişan Yüzüğü", href: "/koleksiyonlar/halkalar?tur=nisan", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80&fit=crop&crop=center" },
          { label: "Alyans", href: "/koleksiyonlar/halkalar?tur=alyans", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80&fit=crop&crop=center" },
          { label: "Sonsuzluk Bandı", href: "/koleksiyonlar/halkalar?tur=sonsuzluk", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80&fit=crop&crop=center" },
          { label: "Kokteyl Yüzükleri", href: "/koleksiyonlar/halkalar?tur=kokteyl", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&fit=crop&crop=center" },
          { label: "Safir & Renkli Taş", href: "/koleksiyonlar/halkalar?tas=Safir", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "kolye",
        label: "Kolye",
        viewAllHref: "/koleksiyonlar/kolyeler",
        items: [
          { label: "Pırlanta Kolyeler", href: "/koleksiyonlar/kolyeler?tas=P%C4%B1rlanta", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Kolyeler", href: "/koleksiyonlar/inci", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
          { label: "Zümrüt & Safir", href: "/koleksiyonlar/kolyeler?tas=Safir", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&fit=crop&crop=center" },
          { label: "Altın Zincirler", href: "/koleksiyonlar/kolyeler?mat=18K", image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80&fit=crop&crop=center" },
          { label: "Pandantifler", href: "/koleksiyonlar/kolyeler?tur=pandantif", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "Choker", href: "/koleksiyonlar/kolyeler?tur=choker", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "kupe",
        label: "Küpe",
        viewAllHref: "/koleksiyonlar/kupeler",
        items: [
          { label: "Saplama Küpeler", href: "/koleksiyonlar/kupeler?tur=saplama", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&fit=crop&crop=center" },
          { label: "Sarkıt Küpeler", href: "/koleksiyonlar/kupeler?tur=sark%C4%B1t", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80&fit=crop&crop=center" },
          { label: "Halka Küpeler", href: "/koleksiyonlar/kupeler?tur=halka", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80&fit=crop&crop=center" },
          { label: "Pırlanta Küpeler", href: "/koleksiyonlar/kupeler?tas=P%C4%B1rlanta", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Küpeler", href: "/koleksiyonlar/inci?tur=kupe", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&fit=crop&crop=center" },
          { label: "Asimetrik", href: "/koleksiyonlar/kupeler?tur=asimetrik", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "bileklik",
        label: "Bileklik",
        viewAllHref: "/koleksiyonlar/bileklikler",
        items: [
          { label: "Altın Bileklikler", href: "/koleksiyonlar/bileklikler?mat=18K", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "Pırlanta Kelepçe", href: "/koleksiyonlar/bileklikler?tas=P%C4%B1rlanta", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&fit=crop&crop=center" },
          { label: "Tennis Bileklik", href: "/koleksiyonlar/bileklikler?tur=tennis", image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80&fit=crop&crop=center" },
          { label: "Charm Bileklikler", href: "/koleksiyonlar/bileklikler?tur=charm", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80&fit=crop&crop=center" },
          { label: "İnce Zincir", href: "/koleksiyonlar/bileklikler?tur=ince-zincir", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Bileklikler", href: "/koleksiyonlar/inci?tur=bileklik", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "setler",
        label: "Setler",
        viewAllHref: "/koleksiyonlar/setler",
        items: [
          { label: "Düğün Setleri", href: "/koleksiyonlar/setler?tur=dug%C3%BCn", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Setleri", href: "/koleksiyonlar/setler?tas=inci", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
          { label: "Hediye Setleri", href: "/koleksiyonlar/setler?tur=hediye", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&fit=crop&crop=center" },
          { label: "Pırlanta Setler", href: "/koleksiyonlar/setler?tas=P%C4%B1rlanta", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "inci",
        label: "İnci",
        viewAllHref: "/koleksiyonlar/inci",
        items: [
          { label: "Akoya İnci", href: "/koleksiyonlar/inci?inci=akoya", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
          { label: "South Sea İnci", href: "/koleksiyonlar/inci?inci=south-sea", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "Tatlı Su İnci", href: "/koleksiyonlar/inci?inci=tatl%C4%B1Su", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&fit=crop&crop=center" },
          { label: "Tahiti İnci", href: "/koleksiyonlar/inci?inci=tahiti", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&fit=crop&crop=center" },
          { label: "Baroque İnci", href: "/koleksiyonlar/inci?inci=baroque", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Setleri", href: "/koleksiyonlar/setler?tas=inci", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "markalar",
        label: "Markalar",
        viewAllHref: "/koleksiyonlar",
        items: [
          { label: "ONR Signature", href: "/koleksiyonlar", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&fit=crop&crop=center" },
          { label: "ONR Heritage", href: "/koleksiyonlar", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop&crop=center" },
          { label: "ONR Exclusive", href: "/exclusive", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80&fit=crop&crop=center" },
          { label: "ONR İnci", href: "/koleksiyonlar/inci", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
          { label: "Özel Sipariş", href: "/ozel-tasarim", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80&fit=crop&crop=center" },
        ],
      },
    ],
    inspirationLinks: [
      { label: "Hediye Seçici", href: "/hediye-secici" },
      { label: "Kişiselleştirme", href: "/kisisellestirme" },
      { label: "En Yeni Tasarımlar", href: "/yeni-tasarimlar" },
      { label: "Onun İçin Mücevher", href: "/onun-icin" },
    ],
  },
  {
    id: "ozel-tasarim",
    label: "Özel Tasarım",
    href: "/ozel-tasarim",
    hasMegaMenu: false,
  },
  {
    id: "subelerimiz",
    label: "Şubelerimiz",
    href: "/subelerimiz",
    hasMegaMenu: false,
  },
  {
    id: "hakkimizda",
    label: "Hakkımızda",
    href: "/hakkimizda",
    hasMegaMenu: false,
  },
  {
    id: "iletisim",
    label: "İletişim",
    href: "/iletisim",
    hasMegaMenu: false,
  },
];

// ─── Mobile Menu Items (Accordion) ───────────────────────────────

export interface MobileMenuItem {
  label: string;
  href: string;
  sub: string;
  isExclusive?: boolean;
  subItems?: { label: string; href: string }[];
}

export const mobileMenuItems: MobileMenuItem[] = [
  {
    label: "Mücevher",
    href: "/koleksiyonlar",
    sub: "Tüm Mücevher Kategorileri",
    subItems: [
      { label: "Yüzük", href: "/koleksiyonlar/halkalar" },
      { label: "Kolye", href: "/koleksiyonlar/kolyeler" },
      { label: "Küpe", href: "/koleksiyonlar/kupeler" },
      { label: "Bileklik", href: "/koleksiyonlar/bileklikler" },
      { label: "Setler", href: "/koleksiyonlar/setler" },
      { label: "İnci", href: "/koleksiyonlar/inci" },
      { label: "Markalar", href: "/koleksiyonlar" },
    ],
  },
  {
    label: "Exclusive",
    href: "/exclusive",
    sub: "Sadece Seçkin Misafirlerimize",
    isExclusive: true,
  },
  {
    label: "Özel Tasarım",
    href: "/ozel-tasarim",
    sub: "Hayalinizdeki Mücevheri Yaratalım",
  },
  {
    label: "Şubelerimiz",
    href: "/subelerimiz",
    sub: "Mağazalarımız & Konumlar",
  },
  {
    label: "İletişim",
    href: "/iletisim",
    sub: "Bizimle İletişime Geçin",
  },
];

export const secondaryLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Randevu Al", href: "/iletisim" },
];
