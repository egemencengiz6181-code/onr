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
    href: "/altin",
    hasMegaMenu: true,
    editorialImage: "/images/products/vera-pirlanta-kolye/1.png",
    subTabs: [
      {
        id: "altin-kategoriler",
        label: "Kategoriler",
        viewAllHref: "/altin",
        items: [
          { label: "Bileklik", href: "/altin/bileklikler", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/bileklik/alt%C4%B1n%20bileklik.webp" },
          { label: "Kolye", href: "/altin/kolyeler", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/kolye/alt%C4%B1nkolye.webp" },
          { label: "Küpe", href: "/altin/kupeler", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/k%C3%BCpe/ku%CC%88pe%20kategori.webp" },
          { label: "Yüzük", href: "/altin/halkalar", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/y%C3%BCz%C3%BCk/yu%CC%88zu%CC%88k%20kategori.webp" },
          { label: "Alyans", href: "/altin/halkalar?tur=alyans", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/alyans/alyans.webp" },
          { label: "Kelepçe", href: "/altin/bileklikler?tur=kelepce", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/kelep%C3%A7e/kelepc%CC%A7e%20kategori.webp" },
          { label: "Gerdanlık", href: "/altin/kolyeler?tur=gerdanlik", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/gerdanl%C4%B1k/gerdanl%C4%B1k%20kategori.webp" },
          { label: "Setler", href: "/altin/setler", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/setler/set%20kategori.webp" },
          { label: "Piercing", href: "/altin/kupeler?tur=piercing", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/piercing/gold%20piercing.webp" },
          { label: "Bebek Özel", href: "/koleksiyonlar/bebek-ozel", image: "/images/kategori%20g%C3%B6rselleri/alt%C4%B1n/bebek%20%C3%B6zel/bebeko%CC%88zel.webp", isBaby: true },
        ],
      },
    ],
    inspirationLinks: [
      { label: "Hediye Seçici", href: "/hediye-secici" },
      { label: "En Yeni Tasarımlar", href: "/yeni-tasarimlar" },
      { label: "Onun İçin Mücevher", href: "/onun-icin" },
    ],
  },
  {
    id: "mucevher",
    label: "Mücevher",
    href: "/koleksiyonlar",
    hasMegaMenu: true,
    editorialImage: "/images/products/bleu-pirlanta-yuzuk/1.png",
    subTabs: [
      {
        id: "yuzuk",
        label: "Yüzük",
        viewAllHref: "/koleksiyonlar/halkalar",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/halkalar?type=tektas-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/tektas%CC%A7/045-karat-kenar-tasli-tektas-pirlanta-damla-yuzuk-kenar-tasli-tektas-pirlanta-yuzuk-amor-pirlanta-7478-23-B.webp" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/halkalar?type=baget-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/baget/0-15-karat-yuvarlak-baget-pirlanta-yuzuk-869_1.webp" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/halkalar?type=tasarim-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/tasar%C4%B1m/Gemini_Generated_Image_hrdsmqhrdsmqhrds.webp" },
          { label: "Beştaş Pırlanta", href: "/koleksiyonlar/halkalar?type=bestas-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/bes%CC%A7tas%CC%A7/0.60-karat-bestas-pirlanta-yuzuk-x-form-galeri-tasarim-yuvarlak-kesim-tasli-model.webp" },
          { label: "Tamtur Pırlanta", href: "/koleksiyonlar/halkalar?type=tamtur-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/tamtur/110-karat-tamtur-pirlanta-yuzuk-2405-89-B.webp" },
          { label: "Yarımtur Pırlanta", href: "/koleksiyonlar/halkalar?type=yarimtur-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/yar%C4%B1mtur/122-karat-yarimtur-pirlanta-yuzuk-2684-96-B.webp" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/halkalar?type=renkli-taslar", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/yu%CC%88zu%CC%88k/renkli%20tas%CC%A7/renklitas%CC%A7.webp" },
        ],
      },
      {
        id: "kolye",
        label: "Kolye",
        viewAllHref: "/koleksiyonlar/kolyeler",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/kolyeler?type=tektas-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/kolye/tektas%CC%A7/005-karat-tektas-pirlanta-kolye-231-497-23-B.webp" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/kolyeler?type=baget-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/kolye/baget/e4abdddb-49c7-4143-998d-7bdc22f2ba5d_size800x800_cropTop.webp" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/kolyeler?type=tasarim-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/kolye/tasar%C4%B1m/Gemini_Generated_Image_czdl01czdl01czdl.webp" },
          { label: "Harf Pırlanta", href: "/koleksiyonlar/kolyeler?type=harf-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/kolye/harf/Gemini_Generated_Image_awz8meawz8meawz8.webp" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/kolyeler?type=renkli-taslar", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/kolye/renkli%20tas%CC%A7/Gemini_Generated_Image_g16addg16addg16a.webp" },
        ],
      },
      {
        id: "kupe",
        label: "Küpe",
        viewAllHref: "/koleksiyonlar/kupeler",
        items: [
          { label: "Tektaş Pırlanta", href: "/koleksiyonlar/kupeler?type=tektas-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/ku%CC%88pe/tektas%CC%A7/Gemini_Generated_Image_affe9waffe9waffe.webp" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/kupeler?type=baget-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/ku%CC%88pe/baget/1-28-karat-baget-pirlanta-kupe-BG12-1.webp" },
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/kupeler?type=tasarim-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/ku%CC%88pe/tasar%C4%B1m/Gemini_Generated_Image_9r5cp19r5cp19r5c.webp" },
          { label: "Halka Pırlanta", href: "/koleksiyonlar/kupeler?type=halka-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/ku%CC%88pe/halka/emel-0-70-karat-pirlanta-halka-kupe-ml0048173-1708536928-1.webp" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/kupeler?type=renkli-taslar", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/ku%CC%88pe/renkli%20tas%CC%A7/Gemini_Generated_Image_dvyt9udvyt9udvyt.webp" },
          { label: "Pırlanta Piercing", href: "/koleksiyonlar/kupeler?type=pirlanta-piercing", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/ku%CC%88pe/piercing/White_08e1d8a4-c132-45b9-92cd-b75fecfe9012.webp" },
        ],
      },
      {
        id: "bileklik",
        label: "Bileklik",
        viewAllHref: "/koleksiyonlar/bileklikler",
        items: [
          { label: "Tasarım Pırlanta", href: "/koleksiyonlar/bileklikler?type=tasarim-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/bileklik/tasar%C4%B1m/Gemini_Generated_Image_lkvkm7lkvkm7lkvk.webp" },
          { label: "Pırlanta Su Yolu", href: "/koleksiyonlar/bileklikler?type=pirlanta-su-yolu", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/bileklik/p%C4%B1rlanta%20su%20yolu/Gemini_Generated_Image_3q0dgj3q0dgj3q0d.webp" },
          { label: "Baget Pırlanta", href: "/koleksiyonlar/bileklikler?type=baget-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/bileklik/baget%20p%C4%B1rlanta/Gemini_Generated_Image_7jvmvy7jvmvy7jvm.webp" },
          { label: "Renkli Taşlar", href: "/koleksiyonlar/bileklikler?type=renkli-taslar", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/bileklik/renkli%20tas%CC%A7lar/Gemini_Generated_Image_vwwgtkvwwgtkvwwg.webp" },
          { label: "Charm Pırlanta", href: "/koleksiyonlar/bileklikler?type=charm-pirlanta", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/bileklik/charm%20p%C4%B1rlanta/Ekran%20Resmi%202026-07-26%2013.19.54.webp" },
        ],
      },
      {
        id: "setler",
        label: "Setler",
        viewAllHref: "/koleksiyonlar/setler",
        items: [
          { label: "İnci Setler", href: "/koleksiyonlar/setler?type=inci-setler", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/setler/inci/Gemini_Generated_Image_knhii0knhii0knhi.webp" },
          { label: "Pırlanta Setler", href: "/koleksiyonlar/setler?type=pirlanta-setler", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/setler/p%C4%B1rlanta/Gemini_Generated_Image_pzg94npzg94npzg9.webp" },
        ],
      },
      {
        id: "inci",
        label: "İnci",
        viewAllHref: "/koleksiyonlar/inci",
        isSpecial: true,
        items: [
          { label: "İnci Yüzük", href: "/koleksiyonlar/inci?type=yuzuk", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/inci/yu%CC%88zu%CC%88k/Gemini_Generated_Image_ykl2x2ykl2x2ykl2.webp" },
          { label: "İnci Kolye", href: "/koleksiyonlar/inci?type=kolye", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/inci/kolye/Ekran%20Resmi%202026-07-26%2013.27.47.webp" },
          { label: "İnci Küpe", href: "/koleksiyonlar/inci?type=kupe", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/inci/ku%CC%88pe/Gemini_Generated_Image_mdq1ymdq1ymdq1ym.webp" },
          { label: "İnci Bileklik", href: "/koleksiyonlar/inci?type=bileklik", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/inci/bileklik/Gemini_Generated_Image_j3x3j3j3x3j3j3x3.webp" },
          { label: "İnci Setler", href: "/koleksiyonlar/inci?type=setler", image: "/images/kategori%20g%C3%B6rselleri/m%C3%BCcevher/inci/set/Gemini_Generated_Image_knhii0knhii0knhi.webp" },
        ],
      },
    ],
    inspirationLinks: [
      { label: "Hediye Seçici", href: "/hediye-secici" },
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
