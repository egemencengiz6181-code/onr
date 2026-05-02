// ─── Navigation Data (Mega Menu) ─────────────────────────────────

export interface MegaMenuItem {
  label: string;
  href: string;
  image?: string;
  isBaby?: boolean;
}

export interface MegaMenuSubTab {
  id: string;
  label: string;
  items: MegaMenuItem[];
  viewAllHref: string;
  isBaby?: boolean;
  isSpecial?: boolean;
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
  isMothersDay?: boolean;
  subTabs?: MegaMenuSubTab[];
  inspirationLinks?: InspirationLink[];
  editorialImage?: string;
  layoutMode?: "columns" | "grid";
}

export const mainCategories: NavCategory[] = [
  {
    id: "yuksek-mucevher",
    label: "Exclusive",
    href: "/exclusive",
    hasMegaMenu: false,
  },
  {
    id: "altin",
    label: "Altın",
    href: "/koleksiyonlar",
    hasMegaMenu: true,
    editorialImage: "/images/web/7 (2).png",
    subTabs: [
      {
        id: "altin-kategoriler",
        label: "Kategoriler",
        viewAllHref: "/koleksiyonlar",
        items: [
          { label: "Bileklik", href: "/koleksiyonlar/bileklikler", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "Kolye", href: "/koleksiyonlar/kolyeler", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&fit=crop&crop=center" },
          { label: "Küpe", href: "/koleksiyonlar/kupeler", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80&fit=crop&crop=center" },
          { label: "Yüzük", href: "/koleksiyonlar/halkalar", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop&crop=center" },
          { label: "Alyans", href: "/koleksiyonlar/halkalar?tur=alyans", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80&fit=crop&crop=center" },
          { label: "Kelepçe", href: "/koleksiyonlar/bileklikler?tur=kelepce", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&fit=crop&crop=center" },
          { label: "Gerdanlık", href: "/koleksiyonlar/kolyeler?tur=gerdanlik", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&fit=crop&crop=center" },
          { label: "Setler", href: "/koleksiyonlar/setler", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80&fit=crop&crop=center" },
          { label: "Piercing", href: "/koleksiyonlar/kupeler?tur=piercing", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80&fit=crop&crop=center" },
          { label: "Bebek Özel", href: "/koleksiyonlar/bebek-ozel", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&fit=crop&crop=center", isBaby: true },
        ],
      },
    ],
    inspirationLinks: [
      { label: "Özel Tasarım", href: "/ozel-tasarim" },
      { label: "Kişiselleştirme", href: "/kisisellestirme" },
      { label: "Hediye Seçici", href: "/hediye-secici" },
      { label: "Yeni Tasarımlar", href: "/yeni-tasarimlar" },
    ],
  },
  {
    id: "mucevher",
    label: "Mücevher",
    href: "/koleksiyonlar",
    hasMegaMenu: true,
    editorialImage: "/images/web/7 (2).png",
    subTabs: [
      {
        id: "yuzuk",
        label: "Yüzük",
        viewAllHref: "/koleksiyonlar/halkalar",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/halkalar?type=tektas-pirlanta", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop&crop=center" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/halkalar?type=baget-pirlanta", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80&fit=crop&crop=center" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/halkalar?type=tasarim-pirlanta", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80&fit=crop&crop=center" },
          { label: "Beştaş Pırlanta", href: "/koleksiyonlar/halkalar?type=bestas-pirlanta", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80&fit=crop&crop=center" },
          { label: "Tamtur Pırlanta", href: "/koleksiyonlar/halkalar?type=tamtur-pirlanta", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&fit=crop&crop=center" },
          { label: "Yarımtur Pırlanta", href: "/koleksiyonlar/halkalar?type=yarimtur-pirlanta", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&fit=crop&crop=center" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/halkalar?type=renkli-taslar", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "kolye",
        label: "Kolye",
        viewAllHref: "/koleksiyonlar/kolyeler",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/kolyeler?type=tektas-pirlanta", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&fit=crop&crop=center" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/kolyeler?type=baget-pirlanta", image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80&fit=crop&crop=center" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/kolyeler?type=tasarim-pirlanta", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "Harf Pırlanta", href: "/koleksiyonlar/kolyeler?type=harf-pirlanta", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&fit=crop&crop=center" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/kolyeler?type=renkli-taslar", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "kupe",
        label: "Küpe",
        viewAllHref: "/koleksiyonlar/kupeler",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/kupeler?type=tektas-pirlanta", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80&fit=crop&crop=center" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/kupeler?type=baget-pirlanta", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80&fit=crop&crop=center" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/kupeler?type=tasarim-pirlanta", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80&fit=crop&crop=center" },
          { label: "Halka Pırlanta", href: "/koleksiyonlar/kupeler?type=halka-pirlanta", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80&fit=crop&crop=center" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/kupeler?type=renkli-taslar", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&fit=crop&crop=center" },
          { label: "Pırlanta Piercing", href: "/koleksiyonlar/kupeler?type=pirlanta-piercing", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "bileklik",
        label: "Bileklik",
        viewAllHref: "/koleksiyonlar/bileklikler",
        items: [
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/bileklikler?type=tasarim-pirlanta", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "Pırlanta Su Yolu", href: "/koleksiyonlar/bileklikler?type=pirlanta-su-yolu", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80&fit=crop&crop=center" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/bileklikler?type=baget-pirlanta", image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80&fit=crop&crop=center" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/bileklikler?type=renkli-taslar", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80&fit=crop&crop=center" },
          { label: "Charm Pırlanta", href: "/koleksiyonlar/bileklikler?type=charm-pirlanta", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "setler",
        label: "Setler",
        viewAllHref: "/koleksiyonlar/setler",
        items: [
          { label: "İnci Setler", href: "/koleksiyonlar/setler?type=inci-setler", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
          { label: "Pırlanta Setler", href: "/koleksiyonlar/setler?type=pirlanta-setler", image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80&fit=crop&crop=center" },
        ],
      },
      {
        id: "inci",
        label: "İnci",
        viewAllHref: "/koleksiyonlar/inci",
        isSpecial: true,
        items: [
          { label: "İnci Yüzük", href: "/koleksiyonlar/inci?type=yuzuk", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Kolye", href: "/koleksiyonlar/inci?type=kolye", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Küpe", href: "/koleksiyonlar/inci?type=kupe", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Bileklik", href: "/koleksiyonlar/inci?type=bileklik", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80&fit=crop&crop=center" },
          { label: "İnci Setler", href: "/koleksiyonlar/inci?type=setler", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop&crop=center" },
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
    id: "annelere-ozel",
    label: "Annelere Özel",
    href: "/anneler-gunu",
    hasMegaMenu: false,
    isMothersDay: true,
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
  subGroups?: { heading: string; items: { label: string; href: string }[] }[];
}

export const mobileMenuItems: MobileMenuItem[] = [
  {
    label: "Altın",
    href: "/koleksiyonlar",
    sub: "Tüm Altın Kategorileri",
    subItems: [
      { label: "Bileklik", href: "/koleksiyonlar/bileklikler" },
      { label: "Kolye", href: "/koleksiyonlar/kolyeler" },
      { label: "Küpe", href: "/koleksiyonlar/kupeler" },
      { label: "Yüzük", href: "/koleksiyonlar/halkalar" },
      { label: "Alyans", href: "/koleksiyonlar/halkalar?tur=alyans" },
      { label: "Setler", href: "/koleksiyonlar/setler" },
      { label: "Bebek Özel", href: "/koleksiyonlar/bebek-ozel" },
    ],
  },
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
    ],
    subGroups: [
      {
        heading: "Yüzük",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/halkalar?type=tektas-pirlanta" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/halkalar?type=baget-pirlanta" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/halkalar?type=tasarim-pirlanta" },
          { label: "Beştaş Pırlanta", href: "/koleksiyonlar/halkalar?type=bestas-pirlanta" },
          { label: "Tamtur Pırlanta", href: "/koleksiyonlar/halkalar?type=tamtur-pirlanta" },
          { label: "Yarımtur Pırlanta", href: "/koleksiyonlar/halkalar?type=yarimtur-pirlanta" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/halkalar?type=renkli-taslar" },
        ],
      },
      {
        heading: "Kolye",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/kolyeler?type=tektas-pirlanta" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/kolyeler?type=baget-pirlanta" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/kolyeler?type=tasarim-pirlanta" },
          { label: "Harf Pırlanta", href: "/koleksiyonlar/kolyeler?type=harf-pirlanta" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/kolyeler?type=renkli-taslar" },
        ],
      },
      {
        heading: "Küpe",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/kupeler?type=tektas-pirlanta" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/kupeler?type=baget-pirlanta" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/kupeler?type=tasarim-pirlanta" },
          { label: "Halka Pırlanta", href: "/koleksiyonlar/kupeler?type=halka-pirlanta" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/kupeler?type=renkli-taslar" },
          { label: "Pırlanta Piercing", href: "/koleksiyonlar/kupeler?type=pirlanta-piercing" },
        ],
      },
      {
        heading: "Bileklik",
        items: [
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/bileklikler?type=tasarim-pirlanta" },
          { label: "Pırlanta Su Yolu", href: "/koleksiyonlar/bileklikler?type=pirlanta-su-yolu" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/bileklikler?type=baget-pirlanta" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/bileklikler?type=renkli-taslar" },
          { label: "Charm Pırlanta", href: "/koleksiyonlar/bileklikler?type=charm-pirlanta" },
        ],
      },
      {
        heading: "Setler",
        items: [
          { label: "İnci Setler", href: "/koleksiyonlar/setler?type=inci-setler" },
          { label: "Pırlanta Setler", href: "/koleksiyonlar/setler?type=pirlanta-setler" },
        ],
      },
      {
        heading: "İnci",
        items: [
          { label: "İnci Yüzük", href: "/koleksiyonlar/inci?type=yuzuk" },
          { label: "İnci Kolye", href: "/koleksiyonlar/inci?type=kolye" },
          { label: "İnci Küpe", href: "/koleksiyonlar/inci?type=kupe" },
          { label: "İnci Bileklik", href: "/koleksiyonlar/inci?type=bileklik" },
          { label: "İnci Setler", href: "/koleksiyonlar/inci?type=setler" },
        ],
      },
    ],
  },
  {
    label: "Exclusive",
    href: "/exclusive",
    sub: "Sadece Seçkin Misafirlerimize",
    isExclusive: true,
  },
  {
    label: "Annelere Özel",
    href: "/anneler-gunu",
    sub: "Anneler Günü Özel Koleksiyonu",
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
