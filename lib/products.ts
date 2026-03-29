import { Product } from "./types";

export const products: Product[] = [
  // ── Halkalar ──────────────────────────────────────────────────
  {
    id: "h-001",
    slug: "nebula-pırlanta-tektaş",
    name: "Nebula Tektaş",
    category: "Halkalar",
    categorySlug: "halkalar",
    price: 285000,
    priceFormatted: "₺285.000",
    shortDescription: "Platin üzeri oval kesim D-renk pırlanta tektaş.",
    description:
      "Nebula koleksiyonu, gökyüzünün en saf ışığından ilham alır. Platin masa üzerine oturtulmuş oval kesim pırlantası, her açıdan sizi büyüleyen bir parıltı sunar. GIA sertifikalı, D rengi, IF saflık.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop",
        alt: "Nebula pırlanta tektaş, ön görünüm",
      },
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop",
        alt: "Nebula pırlanta tektaş, yan görünüm",
      },
      {
        src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop",
        alt: "Nebula pırlanta tektaş, detay",
      },
    ],
    stoneSpecs: [
      { label: "Taş Türü", value: "Doğal Pırlanta" },
      { label: "Kesim", value: "Oval Brilliant" },
      { label: "Renk", value: "D (Renksiz)" },
      { label: "Saflık", value: "IF (Lekesiz)" },
      { label: "Karat", value: "2.04 ct" },
      { label: "Sertifika", value: "GIA" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GIA 6204501234" },
      { label: "Sertifika Tarihi", value: "Ocak 2026" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
      { label: "Dijital Doğrulama", value: "gia.edu üzerinden doğrulanabilir" },
    ],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Metal Ağırlığı", value: "4.8 gr" },
      { label: "Toplam Taş Ağırlığı", value: "2.04 ct" },
      { label: "Yüzük Bedeni", value: "52 (özel boyda üretilebilir)" },
    ],
    materials: ["950 Platin", "GIA Sertifikalı Pırlanta"],
    isNew: true,
  },
  {
    id: "h-002",
    slug: "éternité-pırlanta-yarım-ebediyet",
    name: "Éternité Yarım Ebediyet",
    category: "Halkalar",
    categorySlug: "halkalar",
    price: 148000,
    priceFormatted: "₺148.000",
    shortDescription: "18 ayar beyaz altın üzeri tam kesim pırlanta yarım ebediyet.",
    description:
      "Süreklilik ve bağlılığın simgesi olan yarım ebediyet halkası, 18 ayar beyaz altın üzerine özenle yerleştirilmiş 11 adet eşit pırlanta ile süslüdür. Her taş, bir anın sonsuzluğunu temsil eder.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90&fit=crop",
        alt: "Éternité yarım ebediyet halkası",
      },
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop&crop=left",
        alt: "Éternité detay görünüm",
      },
    ],
    stoneSpecs: [
      { label: "Taş Türü", value: "Doğal Pırlanta" },
      { label: "Kesim", value: "Full Brilliant" },
      { label: "Renk", value: "E-F" },
      { label: "Saflık", value: "VS1-VS2" },
      { label: "Toplam Karat", value: "1.10 ct (11 × 0.10 ct)" },
      { label: "Yerleştirme", value: "Kanal (Channel)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "IGI TR-9871234" },
      { label: "Sertifika Kurumu", value: "International Gemological Institute" },
      { label: "Doğrulama", value: "igi.world üzerinden doğrulanabilir" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Beyaz Altın (18K)" },
      { label: "Metal Ağırlığı", value: "3.6 gr" },
      { label: "Toplam Taş Ağırlığı", value: "1.10 ct" },
    ],
    materials: ["18K Beyaz Altın", "Pırlanta"],
    isNew: false,
  },
  {
    id: "h-003",
    slug: "pavé-eternity-rose",
    name: "Pavé Eternity Rose",
    category: "Halkalar",
    categorySlug: "halkalar",
    price: 95000,
    priceFormatted: "₺95.000",
    shortDescription: "18K Rose Gold üzeri tam tur pavé pırlanta ebediyet yüzüğü.",
    description:
      "Bitmez tükenmez bir çemberin sembolü olan tam tur pavé ebediyet yüzüğü, 18 ayar rose gold üzerine yerleştirilmiş 22 adet pırlantayla her ışıkta farklı bir parıltı sunar.",
    images: [
      { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90&fit=crop&crop=right", alt: "Pavé Eternity Rose yüzük" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Pavé Eternity detay" },
    ],
    stoneSpecs: [
      { label: "Taş Sayısı", value: "22 Adet" },
      { label: "Toplam Karat", value: "0.88 ct" },
      { label: "Kesim", value: "Yuvarlak Brilliant" },
      { label: "Renk", value: "F-G" },
      { label: "Saflık", value: "VS1-VS2" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "IGI TR-5590122" },
      { label: "Sertifika Kurumu", value: "International Gemological Institute" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Rose Gold (18K)" },
      { label: "Metal Ağırlığı", value: "3.2 gr" },
    ],
    materials: ["18K Rose Gold", "Pırlanta"],
    isNew: false,
  },
  {
    id: "h-004",
    slug: "solstice-safir-oval",
    name: "Solstice Safir Oval",
    category: "Halkalar",
    categorySlug: "halkalar",
    price: 165000,
    priceFormatted: "₺165.000",
    shortDescription: "18K sarı altın çerçeve, oval kesim Seylan safiri pırlanta halo.",
    description:
      "Gökyüzünün en derin mavisi parmağınızda. Oval kesim Seylan safiri etrafında ince pırlanta halo çerçevesi ve 18 ayar sarı altın gövdesiyle kraliyet estetiğini günlük hayata taşır.",
    images: [
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop", alt: "Solstice Safir Oval yüzük" },
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop", alt: "Solstice detay" },
    ],
    stoneSpecs: [
      { label: "Merkez Taş", value: "Seylan Safiri (Oval Kesim)" },
      { label: "Renk", value: "Royal Blue" },
      { label: "Karat", value: "2.10 ct" },
      { label: "Halo", value: "22 Adet Pırlanta (0.44 ct toplam)" },
      { label: "Sertifika", value: "GIA" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GIA 4401267" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Sarı Altın (18K)" },
      { label: "Metal Ağırlığı", value: "4.1 gr" },
    ],
    materials: ["18K Sarı Altın", "Safir", "Pırlanta"],
    isNew: true,
  },
  {
    id: "h-005",
    slug: "minimal-solitaire-14k",
    name: "Minimal Solitaire",
    category: "Halkalar",
    categorySlug: "halkalar",
    price: 42000,
    priceFormatted: "₺42.000",
    shortDescription: "14K beyaz altın ince gövde, yuvarlak kesim pırlanta tektaş.",
    description:
      "Karmaşıklığa karşı duran sadeliğin güzelliği. İnce 14 ayar beyaz altın gövde üzerinde tek ve saf bir pırlanta; zarafetin en minimal hali.",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop&crop=left", alt: "Minimal Solitaire yüzük" },
      { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90&fit=crop", alt: "Minimal Solitaire detay" },
    ],
    stoneSpecs: [
      { label: "Taş Türü", value: "Doğal Pırlanta" },
      { label: "Kesim", value: "Yuvarlak Brilliant" },
      { label: "Karat", value: "0.30 ct" },
      { label: "Renk", value: "G" },
      { label: "Saflık", value: "VS2" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "IGI TR-2201389" },
      { label: "Sertifika Kurumu", value: "International Gemological Institute" },
    ],
    karatDetails: [
      { label: "Metal", value: "585 Beyaz Altın (14K)" },
      { label: "Metal Ağırlığı", value: "2.1 gr" },
    ],
    materials: ["14K Beyaz Altın", "Pırlanta"],
    isNew: false,
  },
  // ── Kolyeler ─────────────────────────────────────────────────
  {
    id: "k-001",
    slug: "lumière-pırlanta-kolye",
    name: "Lumière Kolye",
    category: "Kolyeler",
    categorySlug: "kolyeler",
    price: 195000,
    priceFormatted: "₺195.000",
    shortDescription: "18K sarı altın zincir üzerinde marquise kesim pırlanta sarkıt.",
    description:
      "Lumière, ışığın altıniyle dans ettiği bir an gibidir. 18 ayar sarı altın incecik zincir üzerine asılı, marquise kesimli merkez pırlanta, boyun hattınızı çerçeveleyen zarif bir ışık kaynağına dönüşür.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop",
        alt: "Lumière pırlanta kolye",
      },
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop",
        alt: "Lumière kolye detay",
      },
    ],
    stoneSpecs: [
      { label: "Merkez Taş", value: "Marquise Kesim Pırlanta" },
      { label: "Renk", value: "F" },
      { label: "Saflık", value: "VVS2" },
      { label: "Karat", value: "1.52 ct" },
      { label: "Yan Taşlar", value: "16 Adet Pave Pırlanta (0.24 ct toplam)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GIA 5203987654" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Sarı Altın (18K)" },
      { label: "Zincir Uzunluğu", value: "42 cm (uzatılabilir)" },
      { label: "Toplam Taş", value: "1.76 ct" },
    ],
    materials: ["18K Sarı Altın", "GIA Sertifikalı Pırlanta"],
    isExclusive: false,
    isNew: true,
  },
  {
    id: "k-002",
    slug: "bezel-solitaire-platin-kolye",
    name: "Bezel Solitaire Kolye",
    category: "Kolyeler",
    categorySlug: "kolyeler",
    price: 175000,
    priceFormatted: "₺175.000",
    shortDescription: "950 Platin incecik zincir, bezel set yuvarlak pırlanta solitaire sarkıt.",
    description:
      "Modern kuyumculuğun zirvesi: bezel set tekniği pırlantayı metalin sıcak kuçağıyla korur. Platin zincir boyun hattınızı zarif çerçeveler.",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Bezel Solitaire kolye" },
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop", alt: "Bezel kolye detay" },
    ],
    stoneSpecs: [
      { label: "Taş Türü", value: "Doğal Pırlanta" },
      { label: "Kesim", value: "Yuvarlak Brilliant" },
      { label: "Karat", value: "0.80 ct" },
      { label: "Renk", value: "E" },
      { label: "Saflık", value: "VVS1" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GIA 3310088" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
    ],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Zincir Uzunluğu", value: "42 cm" },
      { label: "Metal Ağırlığı", value: "4.0 gr" },
    ],
    materials: ["950 Platin", "Pırlanta"],
    isNew: false,
  },
  {
    id: "k-003",
    slug: "station-rose-gold-kolye",
    name: "Station Rose Gold Kolye",
    category: "Kolyeler",
    categorySlug: "kolyeler",
    price: 88000,
    priceFormatted: "₺88.000",
    shortDescription: "18K Rose Gold zincir üzerinde beş eşit pırlanta station dizilimi.",
    description:
      "Beş pırlanta, beş an, beş neden. Station tasarım her taşı kıymetli kılan çok-odaklı bir kolye deneyimi sunar.",
    images: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop&crop=top", alt: "Station Rose Gold kolye" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Station kolye detay" },
    ],
    stoneSpecs: [
      { label: "Taş Sayısı", value: "5 Adet Pırlanta" },
      { label: "Toplam Karat", value: "0.50 ct" },
      { label: "Renk", value: "F-G" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "IGI TR-4412908" },
      { label: "Sertifika Kurumu", value: "International Gemological Institute" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Rose Gold (18K)" },
      { label: "Zincir Uzunluğu", value: "42 cm" },
    ],
    materials: ["18K Rose Gold", "Pırlanta"],
    isNew: true,
  },
  {
    id: "k-004",
    slug: "tennis-kolye-beyaz-altin",
    name: "Tennis Kolye",
    category: "Kolyeler",
    categorySlug: "kolyeler",
    price: 312000,
    priceFormatted: "₺312.000",
    shortDescription: "18K beyaz altın tam tur pırlanta tenis kolye, 45 taş.",
    description:
      "Bileğinizden boynunuza taşınan zarafet: tenis kolye tasarımının en ikonik silueti, 45 adet eşit kesim pırlantayla beyaz altın üzerinde bu sefer boyunda parlıyor.",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop&crop=top", alt: "Tennis Kolye" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Tennis kolye detay" },
    ],
    stoneSpecs: [
      { label: "Taş Sayısı", value: "45 Adet" },
      { label: "Toplam Karat", value: "4.50 ct" },
      { label: "Renk", value: "E-F" },
      { label: "Saflık", value: "VVS2-VS1" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "HRD ANT-228876" },
      { label: "Sertifika Kurumu", value: "HRD Antwerp" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Beyaz Altın (18K)" },
      { label: "Uzunluk", value: "42 cm" },
      { label: "Toplam Ağırlık", value: "14.8 gr" },
    ],
    materials: ["18K Beyaz Altın", "Pırlanta"],
    isNew: false,
  },
  // ── Bileklikler ───────────────────────────────────────────────
  {
    id: "b-001",
    slug: "soleil-pırlanta-bileklik",
    name: "Soleil Pırlanta Bileklik",
    category: "Bileklikler",
    categorySlug: "bileklikler",
    price: 122000,
    priceFormatted: "₺122.000",
    shortDescription: "Platin ayar, tam etrafını saran pave pırlanta tenis bileklik.",
    description:
      "Soleil Tenis Bileklik, bileğinizi çepeçevre saran 38 adet eşit kesim pırlanta ile gün boyunca parlar. Platin masa şeridi ve güvenli kutu kilidi ile günlük kullanıma uygun, uçsuz bucaksız bir zarafet.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop&crop=top",
        alt: "Soleil pırlanta bileklik",
      },
      {
        src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop&crop=bottom",
        alt: "Soleil bileklik detay",
      },
    ],
    stoneSpecs: [
      { label: "Taş Sayısı", value: "38 Adet" },
      { label: "Toplam Karat", value: "3.80 ct" },
      { label: "Kesim", value: "Yuvarlak Brilliant" },
      { label: "Renk", value: "E-F" },
      { label: "Saflık", value: "VVS1-VVS2" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "HRD ANT-114455" },
      { label: "Sertifika Kurumu", value: "HRD Antwerp" },
    ],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Toplam Ağırlık", value: "12.4 gr" },
      { label: "Uzunluk", value: "18 cm" },
    ],
    materials: ["950 Platin", "Pırlanta"],
  },
  {
    id: "b-002",
    slug: "charm-bileklik-sari-altin",
    name: "Charm Gold Bileklik",
    category: "Bileklikler",
    categorySlug: "bileklikler",
    price: 68000,
    priceFormatted: "₺68.000",
    shortDescription: "18K sarı altın zincir, pırlanta charm bileklik.",
    description:
      "Her charm bir anın simgesi. Sarı altının sıcaklığında parlayan ince zincir ve sallantılı pırlanta charm ile bileğinize yeni hikayeler katın.",
    images: [
      { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90&fit=crop", alt: "Charm Gold bileklik" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Charm bileklik detay" },
    ],
    stoneSpecs: [
      { label: "Taş Sayısı", value: "3 Adet Pırlanta" },
      { label: "Toplam Karat", value: "0.15 ct" },
    ],
    certificateInfo: [{ label: "Sertifika No", value: "IGI TR-9980012" }],
    karatDetails: [
      { label: "Metal", value: "750 Sarı Altın (18K)" },
      { label: "Uzunluk", value: "18 cm" },
    ],
    materials: ["18K Sarı Altın", "Pırlanta"],
    isNew: false,
  },
  {
    id: "b-003",
    slug: "rose-gold-pave-bileklik",
    name: "Rose Gold Pavé Bileklik",
    category: "Bileklikler",
    categorySlug: "bileklikler",
    price: 98000,
    priceFormatted: "₺98.000",
    shortDescription: "18K Rose Gold kanal seti pavé pırlanta bileklik.",
    description:
      "Rose goldun romantik sıcaklığı ve pırlantanın soğuk berraklığı bir arada. Kanal seti pavé pırlanta band bileğinizi zarafetle kuşatır.",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop", alt: "Rose Gold Pavé bileklik" },
      { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90&fit=crop", alt: "Rose Gold bileklik detay" },
    ],
    stoneSpecs: [
      { label: "Taş Sayısı", value: "28 Adet" },
      { label: "Toplam Karat", value: "1.12 ct" },
      { label: "Yerleştirme", value: "Kanal (Channel Set)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "IGI TR-7712345" },
      { label: "Sertifika Kurumu", value: "International Gemological Institute" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Rose Gold (18K)" },
      { label: "Uzunluk", value: "18 cm" },
      { label: "Toplam Ağırlık", value: "8.8 gr" },
    ],
    materials: ["18K Rose Gold", "Pırlanta"],
    isNew: true,
  },
  {
    id: "b-004",
    slug: "platin-chain-bileklik",
    name: "Platin Chain Bileklik",
    category: "Bileklikler",
    categorySlug: "bileklikler",
    price: 58000,
    priceFormatted: "₺58.000",
    shortDescription: "950 platin ince zincir, modern ve minimalist bileklik.",
    description:
      "Sadeliğin gücü: saf platinin ağırlığını bileğinizde hissedeceksiniz. Minimalist tasarım her kıyafete uyum sağlar.",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop&crop=top", alt: "Platin Chain bileklik" },
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop", alt: "Platin bileklik detay" },
    ],
    stoneSpecs: [],
    certificateInfo: [],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Uzunluk", value: "17.5 cm" },
      { label: "Toplam Ağırlık", value: "6.2 gr" },
    ],
    materials: ["950 Platin"],
    isNew: false,
  },
  // ── Küpeler ───────────────────────────────────────────────────
  {
    id: "e-001",
    slug: "aurora-pear-sarkıt-küpe",
    name: "Aurora Pear Sarkıt",
    category: "Küpeler",
    categorySlug: "kupeler",
    price: 168000,
    priceFormatted: "₺168.000",
    shortDescription: "18K beyaz altın, pear/damla kesim pırlanta sarkıt küpe çifti.",
    description:
      "Aurora koleksiyonu, sabahın ilk ışığından doğar. Pear/damla kesim ana pırlanta, ince bir pave zinciri üzerinde süzülürken; sizi çevreleyen her ışık kaynağına karşılık vermek için tasarlanmıştır.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop",
        alt: "Aurora pear küpe",
      },
      {
        src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop&crop=right",
        alt: "Aurora küpe sarkıt detay",
      },
    ],
    stoneSpecs: [
      { label: "Ana Taş (x2)", value: "Pear Kesim Pırlanta" },
      { label: "Renk", value: "D-E" },
      { label: "Saflık", value: "VS1" },
      { label: "Taş Başına Karat", value: "0.85 ct" },
      { label: "Toplam Karat", value: "1.70 ct + 0.48 ct pave" },
    ],
    certificateInfo: [
      { label: "Sertifika No (Çift)", value: "GIA 7899012/7899013" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Beyaz Altın (18K)" },
      { label: "Uzunluk", value: "4.2 cm" },
      { label: "Toplam Ağırlık", value: "7.1 gr (çift)" },
    ],
    materials: ["18K Beyaz Altın", "GIA Sertifikalı Pırlanta"],
    isNew: true,
  },
  {
    id: "e-002",
    slug: "pırlanta-stud-küpe",
    name: "Pırlanta Stud Küpe",
    category: "Küpeler",
    categorySlug: "kupeler",
    price: 72000,
    priceFormatted: "₺72.000",
    shortDescription: "18K beyaz altın GIA sertifikalı pırlanta stud küpe çifti.",
    description:
      "Her koleksiyonun vazgeçilmezi: klasik pırlanta stud küpe. GIA sertifikalı pırlantalar sabah kahvaltısından akşam yemeğine her ana eşlik eder.",
    images: [
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop&crop=right", alt: "Pırlanta Stud küpe" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Stud küpe detay" },
    ],
    stoneSpecs: [
      { label: "Ana Taş (x2)", value: "Yuvarlak Brilliant Pırlanta" },
      { label: "Taş Başına Karat", value: "0.40 ct" },
      { label: "Toplam Karat", value: "0.80 ct" },
      { label: "Renk", value: "E" },
      { label: "Saflık", value: "VS1" },
    ],
    certificateInfo: [
      { label: "Sertifika No (Çift)", value: "GIA 5501234 / GIA 5501235" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Beyaz Altın (18K)" },
      { label: "Kapış", value: "Butterfly" },
    ],
    materials: ["18K Beyaz Altın", "Pırlanta"],
    isNew: false,
  },
  {
    id: "e-003",
    slug: "safir-hoop-küpe",
    name: "Safir Hoop Küpe",
    category: "Küpeler",
    categorySlug: "kupeler",
    price: 115000,
    priceFormatted: "₺115.000",
    shortDescription: "18K sarı altın hoop çerçeve, pırlanta ve safir dizişi.",
    description:
      "Klasik hoop tasarımını yeniden tanımlayın. Sarı altın çember üzerine sıra sıra safirler ve pırlantalar — her harekette farkı ortaya koyan bir ritim.",
    images: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop", alt: "Safir Hoop küpe" },
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop", alt: "Safir Hoop detay" },
    ],
    stoneSpecs: [
      { label: "Safir Sayısı", value: "8 Adet (çift başına 4)" },
      { label: "Toplam Safir Karat", value: "0.96 ct" },
      { label: "Pave Pırlanta", value: "0.32 ct" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "IGI TR-6634512" },
      { label: "Sertifika Kurumu", value: "International Gemological Institute" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Sarı Altın (18K)" },
      { label: "Çap", value: "2.8 cm" },
      { label: "Toplam Ağırlık", value: "8.4 gr (çift)" },
    ],
    materials: ["18K Sarı Altın", "Safir", "Pırlanta"],
    isNew: true,
  },
  {
    id: "e-004",
    slug: "rose-gold-cluster-küpe",
    name: "Cluster Rose Küpe",
    category: "Küpeler",
    categorySlug: "kupeler",
    price: 138000,
    priceFormatted: "₺138.000",
    shortDescription: "18K Rose Gold pear safir ve pırlanta cluster küpe.",
    description:
      "Kır çiçeğinden ilham alan cluster tasarım: rose goldun sıcaklığında pear safir ve pırlantaların birlikte dansı.",
    images: [
      { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=90&fit=crop", alt: "Cluster Rose küpe" },
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop", alt: "Cluster küpe detay" },
    ],
    stoneSpecs: [
      { label: "Merkez Taş (x2)", value: "Pear Safir" },
      { label: "Toplam Safir", value: "1.20 ct" },
      { label: "Pave Pırlanta", value: "0.56 ct" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GIA 6690034" },
      { label: "Sertifika Kurumu", value: "Gemological Institute of America" },
    ],
    karatDetails: [
      { label: "Metal", value: "750 Rose Gold (18K)" },
      { label: "Uzunluk", value: "3.5 cm" },
    ],
    materials: ["18K Rose Gold", "Safir", "Pırlanta"],
    isNew: false,
  },
  // ── Exclusive ─────────────────────────────────────────────────
  {
    id: "ex-001",
    slug: "nebula-kashmir-safir",
    name: "Nebula — Kashmir Safir",
    category: "Exclusive",
    categorySlug: "exclusive",
    price: 580000,
    priceFormatted: "₺580.000",
    shortDescription: "Platin, nadir Kashmir safir ve pırlanta pavé. Yalnızca 3 adet.",
    description:
      "Dünyanın en nadir taşlarından Kashmir safiri, ONR atölyesinde altın oran kuralıyla çerçevelenmiş. Bu parça, bir yatırım ve bir miras. GRS sertifikalı Kashmir safiri, 4.2 ct ağırlık.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop",
        alt: "Nebula Kashmir Safir yüzük",
      },
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop&crop=right",
        alt: "Nebula safir detay",
      },
    ],
    stoneSpecs: [
      { label: "Merkez Taş", value: "Kashmir Safir (Doğal, Isıl İşlemsiz)" },
      { label: "Köken", value: "Kashmir, Hindistan" },
      { label: "Renk", value: "Royal Blue" },
      { label: "Karat", value: "4.20 ct" },
      { label: "Yan Taşlar", value: "Pırlanta Pavé 1.60 ct" },
      { label: "Sertifika", value: "GRS (Gem Research Swiss)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GRS2026-099123" },
      { label: "Sertifika Kurumu", value: "Gem Research Swisslab" },
      { label: "Özel Not", value: "No Heat — Isıl işlem uygulanmamış" },
    ],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Toplam Ağırlık", value: "8.2 gr" },
      { label: "Üretim Adedi", value: "Yalnızca 3 Adet" },
    ],
    materials: ["950 Platin", "Kashmir Safir", "Pırlanta Pavé"],
    isExclusive: true,
    limitedPieces: 3,
  },
  {
    id: "ex-002",
    slug: "la-tempete",
    name: "La Tempête — Pembe Pırlanta",
    category: "Exclusive",
    categorySlug: "exclusive",
    price: 920000,
    priceFormatted: "₺920.000",
    shortDescription: "GIA Fancy Intense Pink pırlanta, 18K beyaz altın. Dünyada yalnızca bir adet.",
    description:
      "Doğada yalnızca birkaç milyon karata bir rastlanan Fancy Intense Pink pırlanta; GIA sertifikalı 1.82 ct, VS1 saflıkta. Şiddetli bir fırtınanın sessiz anından ilham alınan bu parça dünyada yalnızca bir tane.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop",
        alt: "La Tempête Pembe Pırlanta Yüzük",
      },
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop",
        alt: "La Tempête detay",
      },
    ],
    stoneSpecs: [
      { label: "Merkez Taş", value: "Fancy Intense Pink Pırlanta" },
      { label: "Ağırlık", value: "1.82 ct" },
      { label: "Saflık", value: "VS1" },
      { label: "Kesim", value: "Fancy Cut" },
      { label: "Sertifika", value: "GIA (Gemological Institute of America)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "GIA2026-187441" },
      { label: "Renk Derecesi", value: "Fancy Intense Pink" },
      { label: "Özel Not", value: "Dünyada tek olan bu parça" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Beyaz Altın" },
      { label: "Toplam Ağırlık", value: "5.4 gr" },
      { label: "Üretim Adedi", value: "Yalnızca 1 Adet" },
    ],
    materials: ["18K Beyaz Altın", "Fancy Intense Pink Pırlanta"],
    isExclusive: true,
    limitedPieces: 1,
  },
  {
    id: "ex-003",
    slug: "velours",
    name: "Velours — Kolombiya Zümrütü",
    category: "Exclusive",
    categorySlug: "exclusive",
    price: 740000,
    priceFormatted: "₺740.000",
    shortDescription: "Muzo madeninden CDT sertifikalı 6.48 ct Kolombiya zümrütü, 18K sarı altın. 7 adet üretim.",
    description:
      "Kadife gibi derin bir yeşil: Muzo madeninden çıkan Kolombiya zümrütü, sarı altının sıcaklığıyla buluştuğunda varoluşun en güzel rengi ortaya çıkar. CDT sertifikalı, doğal, ısıl işlemsiz, 6.48 ct.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop",
        alt: "Velours Kolombiya Zümrüt Kolye",
      },
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop",
        alt: "Velours detay",
      },
    ],
    stoneSpecs: [
      { label: "Merkez Taş", value: "Kolombiya Zümrütü (Doğal, Isıl İşlemsiz)" },
      { label: "Köken", value: "Muzo Madeni, Kolombiya" },
      { label: "Ağırlık", value: "6.48 ct" },
      { label: "Renk", value: "Vivid Green" },
      { label: "Sertifika", value: "CDT (Certificat de Déontologie et de Traçabilité)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "CDT2026-003782" },
      { label: "İşlem Durumu", value: "Isıl İşlemsiz — Doğal" },
      { label: "Köken Belgesi", value: "Muzo, Kolombiya" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Sarı Altın" },
      { label: "Toplam Ağırlık", value: "12.8 gr" },
      { label: "Üretim Adedi", value: "Yalnızca 7 Adet" },
    ],
    materials: ["18K Sarı Altın", "Kolombiya Zümrütü", "Pırlanta Pavé"],
    isExclusive: true,
    limitedPieces: 7,
  },
  {
    id: "ex-004",
    slug: "aurore",
    name: "Aurore — Paraiba Turmalin",
    category: "Exclusive",
    categorySlug: "exclusive",
    price: 660000,
    priceFormatted: "₺660.000",
    shortDescription: "AGL sertifikalı Brezilya Paraíba turmalini, 950 platin. Neon mavisi, 2.94 ct.",
    description:
      "Neon mavisi, yeryüzünün mistik parıltısı. Brezilya Paraíba'sından çıkan bu eşsiz turmalin, doğanın başka hiçbir maddesinde bulunmayan bir ışık yoğunluğuna sahiptir. AGL sertifikalı, 2.94 ct.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop",
        alt: "Aurore Paraiba Turmalin",
      },
      {
        src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop",
        alt: "Aurore detay",
      },
    ],
    stoneSpecs: [
      { label: "Merkez Taş", value: "Paraiba Turmalin" },
      { label: "Köken", value: "Paraíba, Brezilya" },
      { label: "Ağırlık", value: "2.94 ct" },
      { label: "Renk", value: "Neon Blue-Green" },
      { label: "Sertifika", value: "AGL (American Gemological Laboratories)" },
    ],
    certificateInfo: [
      { label: "Sertifika No", value: "AGL2026-052219" },
      { label: "Köken", value: "Brezilya — Paraíba Eyaleti" },
      { label: "Özel Not", value: "Bakır içerikli nadir neon mavi renk" },
    ],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Toplam Ağırlık", value: "6.9 gr" },
      { label: "Üretim Adedi", value: "Yalnızca 7 Adet" },
    ],
    materials: ["950 Platin", "Paraiba Turmalin", "Pırlanta Pavé"],
    isExclusive: true,
    limitedPieces: 7,
  },

  // ── İnci Koleksiyonu ──────────────────────────────────────────
  {
    id: "inci-001",
    slug: "haiku-akoya-inci-kolye",
    name: "Haiku Akoya İnci",
    category: "İnci",
    categorySlug: "inci",
    price: 96000,
    priceFormatted: "₺96.000",
    shortDescription: "18K beyaz altın üzeri çift dizili Akoya inci kolye.",
    description:
      "Japonya'nın Akoya körfezinden gelen 7–7,5 mm çaplı inciler, 18K beyaz altın kilit ve spacer'larla bir araya gelir. Ayna parlaklığındaki yüzeyi ve gümüşümsü pembe rengi ile Haiku, modern zarafetin simgesidir.",
    images: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop", alt: "Haiku Akoya inci kolye" },
      { src: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1200&q=90&fit=crop", alt: "Haiku Akoya inci kolye detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "Akoya (Pinctada fucata)" },
      { label: "Çap", value: "7.0 – 7.5 mm" },
      { label: "Parlaklık", value: "Çok Yüksek (Ayna)" },
      { label: "Renk", value: "Beyaz / Gümüşümsü Pembe" },
      { label: "Köken", value: "Japonya — Mie Eyaleti" },
      { label: "Yüzey Kalitesi", value: "% 99+ Temiz" },
    ],
    certificateInfo: [
      { label: "Kalite Belgesi", value: "GIA Pearl Grading Report" },
      { label: "Menşe", value: "Japonya, Akoya" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Beyaz Altın" },
      { label: "Kilit Tipi", value: "Güvenlik kilidi + klips" },
      { label: "Uzunluk", value: "42 cm (ayarlanabilir)" },
    ],
    materials: ["18K Beyaz Altın", "Akoya İnci"],
    tags: ["inci", "akoya", "beyaz-inci", "luster-cok-yuksek", "Kadın"],
    gender: ["Kadın"],
    isNew: true,
  },
  {
    id: "inci-002",
    slug: "aurora-south-sea-kupe",
    name: "Aurora South Sea Küpe",
    category: "İnci",
    categorySlug: "inci",
    price: 148000,
    priceFormatted: "₺148.000",
    shortDescription: "18K sarı altın üzeri South Sea inci saplama küpe.",
    description:
      "Avustralya'nın masmavi sularından çıkan 11–11,5 mm beyaz South Sea inciyi; 18K sarı altın saplama ile sunan bu küpeler, gece davetinden gün yüzüne her ortamda ışık saçar.",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Aurora South Sea inci küpe" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Aurora South Sea inci küpe detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "White South Sea (Pinctada maxima)" },
      { label: "Çap", value: "11.0 – 11.5 mm" },
      { label: "Parlaklık", value: "Yüksek (Ayna)" },
      { label: "Renk", value: "Beyaz / Krem" },
      { label: "Köken", value: "Avustralya — Broome" },
      { label: "Şekil", value: "Yuvarlak" },
    ],
    certificateInfo: [
      { label: "Kalite Belgesi", value: "GIA Pearl Grading Report" },
      { label: "Menşe", value: "Avustralya, South Sea" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Sarı Altın" },
      { label: "Kapama", value: "Push-back" },
    ],
    materials: ["18K Sarı Altın", "South Sea İnci"],
    tags: ["inci", "south-sea", "beyaz-inci", "krem-inci", "luster-cok-yuksek", "Kadın"],
    gender: ["Kadın"],
    isNew: true,
  },
  {
    id: "inci-003",
    slug: "notte-tahiti-inci-kolye",
    name: "Notte Tahiti İnci",
    category: "İnci",
    categorySlug: "inci",
    price: 185000,
    priceFormatted: "₺185.000",
    shortDescription: "Platin üzeri siyah Tahiti inci kolye, pırlanta aksan.",
    description:
      "Fransız Polinezyası'nın siyah dudaklı istiridyesinden yükselen 10–10,5 mm Tahiti incisi, 950 platin kilit ve 0.42 ct pırlanta pavé aksanlarıyla çerçevelenmiştir. Gecenin kadifesini boynunuza taşır.",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop", alt: "Notte Tahiti inci kolye" },
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop", alt: "Notte Tahiti detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "Tahiti (Pinctada margaritifera)" },
      { label: "Çap", value: "10.0 – 10.5 mm" },
      { label: "Parlaklık", value: "Çok Yüksek" },
      { label: "Renk", value: "Siyah / Yeşilimsi Pembe Işık" },
      { label: "Köken", value: "Fransız Polinezyası" },
      { label: "Aksesuar Taş", value: "Pırlanta 0.42 ct" },
    ],
    certificateInfo: [
      { label: "Kalite Belgesi", value: "IGI Pearl Certificate" },
      { label: "Menşe", value: "Fransız Polinezyası" },
    ],
    karatDetails: [
      { label: "Metal", value: "950 Platin" },
      { label: "Uzunluk", value: "45 cm" },
    ],
    materials: ["950 Platin", "Tahiti İnci", "Pırlanta"],
    tags: ["inci", "tahiti", "siyah-inci", "luster-cok-yuksek", "Kadın"],
    gender: ["Kadın"],
  },
  {
    id: "inci-004",
    slug: "rosee-tatli-su-bileklik",
    name: "Rosée Tatlı Su İnci",
    category: "İnci",
    categorySlug: "inci",
    price: 48000,
    priceFormatted: "₺48.000",
    shortDescription: "18K rose altın üzeri tatlı su inci bileklik.",
    description:
      "Çin'in tatlı su yetiştirme havuzlarından gelen 6–6,5 mm pembe tatlı su inciyi, 18K rose altın uzatmalı kilit ile buluşturan Rosée; günlük zarafetin en kolay hali.",
    images: [
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop", alt: "Rosée tatlı su inci bileklik" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Rosée bileklik detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "Tatlı Su (Freshwater)" },
      { label: "Çap", value: "6.0 – 6.5 mm" },
      { label: "Parlaklık", value: "Yüksek" },
      { label: "Renk", value: "Pembe / Krem" },
      { label: "Köken", value: "Çin (AAA Kalite)" },
      { label: "Şekil", value: "Yuvarlak" },
    ],
    certificateInfo: [
      { label: "Kalite", value: "AAA Premium Grade" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Rose Altın" },
      { label: "Uzunluk", value: "17 + 3 cm uzatma" },
    ],
    materials: ["18K Rose Altın", "Tatlı Su İnci"],
    tags: ["inci", "tatliSu", "pembe-inci", "krem-inci", "luster-yuksek", "Kadın"],
    gender: ["Kadın"],
    isNew: true,
  },
  {
    id: "inci-005",
    slug: "soleil-south-sea-yuzuk",
    name: "Soleil South Sea Yüzük",
    category: "İnci",
    categorySlug: "inci",
    price: 238000,
    priceFormatted: "₺238.000",
    shortDescription: "18K sarı altın üzeri büyük South Sea inci tektaş.",
    description:
      "Soleil, tek bir 13 mm White South Sea incinin tüm ihtişamını sergilediği bir yüzüktür. 18K sarı altın masa ve kanal içine yerleştirilen 0.30 ct pırlantalar, incinin dairesel formunu kucaklar.",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Soleil South Sea inci yüzük" },
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop", alt: "Soleil detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "White South Sea" },
      { label: "Çap", value: "13.0 mm" },
      { label: "Parlaklık", value: "Çok Yüksek (Ayna)" },
      { label: "Renk", value: "Beyaz / Altın Ton" },
      { label: "Köken", value: "Filipinler" },
      { label: "Aksesuar Taş", value: "Pırlanta 0.30 ct" },
    ],
    certificateInfo: [
      { label: "Kalite Belgesi", value: "GIA Pearl Report" },
      { label: "Menşe", value: "Filipinler" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Sarı Altın" },
      { label: "Yüzük Bedeni", value: "52 (özel boyda üretilebilir)" },
    ],
    materials: ["18K Sarı Altın", "South Sea İnci", "Pırlanta"],
    tags: ["inci", "south-sea", "beyaz-inci", "luster-cok-yuksek", "Kadın"],
    gender: ["Kadın"],
  },
  {
    id: "inci-006",
    slug: "baroque-noir-kolye",
    name: "Baroque Noir Kolye",
    category: "İnci",
    categorySlug: "inci",
    price: 124000,
    priceFormatted: "₺124.000",
    shortDescription: "18K beyaz altın üzeri baroque Tahiti inci kolye.",
    description:
      "Mükemmel biçimsizliğin büyüsüne adanmış Baroque Noir; her biri benzersiz formda seçilmiş Tahiti incilerini 18K beyaz altın zincirde harmanlar. Asimetrik güzellik sevenler için.",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90&fit=crop", alt: "Baroque Noir kolye" },
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Baroque Noir detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "Tahiti Baroque" },
      { label: "Çap", value: "9.0 – 12.0 mm (Baroque)" },
      { label: "Parlaklık", value: "Yüksek" },
      { label: "Renk", value: "Siyah / Yeşil Işık / Pembe Işık" },
      { label: "Köken", value: "Fransız Polinezyası" },
    ],
    certificateInfo: [
      { label: "Kalite", value: "Premium Baroque Grade" },
      { label: "Menşe", value: "Fransız Polinezyası" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Beyaz Altın" },
      { label: "Uzunluk", value: "46 cm" },
    ],
    materials: ["18K Beyaz Altın", "Tahiti İnci"],
    tags: ["inci", "tahiti", "siyah-inci", "luster-yuksek", "Kadın"],
    gender: ["Kadın"],
  },

  // ── Setler ────────────────────────────────────────────────────
  {
    id: "set-001",
    slug: "étoile-dugün-seti",
    name: "Étoile Düğün Seti",
    category: "Setler",
    categorySlug: "setler",
    price: 385000,
    priceFormatted: "₺385.000",
    shortDescription: "18K beyaz altın pırlanta kolye + saplama küpe seti.",
    description:
      "Étoile; büyük günlere özel tasarlanmış, kolye ve küpe ikilisinden oluşan bir mücevher seti. Her iki parça 18K beyaz altın üzerine toplamda 1.80 ct pırlanta ile el işçiliğiyle hazırlanmıştır.",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Étoile düğün seti kolye" },
      { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop", alt: "Étoile düğün seti küpe" },
    ],
    stoneSpecs: [
      { label: "Toplam Pırlanta", value: "1.80 ct" },
      { label: "Renk", value: "F–G" },
      { label: "Saflık", value: "VS1–VS2" },
      { label: "Kesim", value: "Yuvarlak Brilliant" },
      { label: "Set İçeriği", value: "1 kolye + 1 küpe çifti" },
    ],
    certificateInfo: [
      { label: "Sertifika", value: "IGI Set Sertifikası" },
      { label: "Garanti", value: "2 Yıl" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Beyaz Altın" },
      { label: "Set Ağırlığı", value: "8.4 gr" },
      { label: "Kolye Uzunluğu", value: "42 cm" },
    ],
    materials: ["18K Beyaz Altın", "Pırlanta"],
    tags: ["set", "dugün", "pırlanta", "Kadın"],
    gender: ["Kadın"],
    isNew: true,
  },
  {
    id: "set-002",
    slug: "riviere-inci-seti",
    name: "Rivière İnci Seti",
    category: "Setler",
    categorySlug: "setler",
    price: 224000,
    priceFormatted: "₺224.000",
    shortDescription: "Akoya inci kolye + küpe + bileklik üçlü seti.",
    description:
      "Rivière, uyumlu Akoya incileri ile hazırlanmış üç parçalı bir set sunuyor: tek dizili kolye, saplama küpe ve bileklik. Özel kutusunda hediye olarak sunulabilir.",
    images: [
      { src: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1200&q=90&fit=crop", alt: "Rivière inci seti" },
      { src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=90&fit=crop", alt: "Rivière set detay" },
    ],
    stoneSpecs: [
      { label: "İnci Türü", value: "Akoya" },
      { label: "Çap", value: "6.5 – 7.0 mm" },
      { label: "Parlaklık", value: "Yüksek (Ayna)" },
      { label: "Renk", value: "Beyaz / Pembe Işık" },
      { label: "Set İçeriği", value: "1 kolye + 1 küpe + 1 bileklik" },
    ],
    certificateInfo: [
      { label: "Kalite Belgesi", value: "GIA Pearl Grading" },
      { label: "Menşe", value: "Japonya" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Beyaz Altın" },
      { label: "Kolye Uzunluğu", value: "42 cm" },
      { label: "Bileklik Uzunluğu", value: "17 + 3 cm" },
    ],
    materials: ["18K Beyaz Altın", "Akoya İnci"],
    tags: ["set", "inci", "akoya", "hediye", "Kadın"],
    gender: ["Kadın"],
  },
  {
    id: "set-003",
    slug: "or-rose-klasik-seti",
    name: "Or Rose Klasik Set",
    category: "Setler",
    categorySlug: "setler",
    price: 176000,
    priceFormatted: "₺176.000",
    shortDescription: "18K rose altın pırlanta kolye + küpe seti.",
    description:
      "Or Rose; rose altının sıcaklığını pırlantanın soğuk parıltısıyla dengeleme sanatıdır. Kolye ve küpe ikilisi, günlük kullanımdan gece şıklığına uzanan geniş bir yelpazede aynı duyguyu taşır.",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=90&fit=crop", alt: "Or Rose klasik set" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90&fit=crop", alt: "Or Rose set detay" },
    ],
    stoneSpecs: [
      { label: "Toplam Pırlanta", value: "0.85 ct" },
      { label: "Renk", value: "G–H" },
      { label: "Saflık", value: "VS2" },
      { label: "Set İçeriği", value: "1 kolye + 1 küpe çifti" },
    ],
    certificateInfo: [
      { label: "Sertifika", value: "IGI" },
      { label: "Garanti", value: "2 Yıl" },
    ],
    karatDetails: [
      { label: "Metal", value: "18K Rose Altın" },
      { label: "Kolye Uzunluğu", value: "42 cm (ayarlanabilir)" },
    ],
    materials: ["18K Rose Altın", "Pırlanta"],
    tags: ["set", "rose-altın", "pırlanta", "Kadın", "Unisex"],
    gender: ["Kadın"],
  },
];

// Helpers
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getExclusiveProducts(): Product[] {
  return products.filter((p) => p.isExclusive);
}

export function getRelatedProducts(current: Product, count = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.categorySlug === current.categorySlug && p.id !== current.id && !p.isExclusive
  );
  const others = products.filter(
    (p) => p.categorySlug !== current.categorySlug && p.id !== current.id && !p.isExclusive
  );
  return [...sameCategory, ...others].slice(0, count);
}

export const categories = [
  { label: "Tümü", slug: "tumu" },
  { label: "Halkalar", slug: "halkalar" },
  { label: "Kolyeler", slug: "kolyeler" },
  { label: "Bileklikler", slug: "bileklikler" },
  { label: "Küpeler", slug: "kupeler" },
  { label: "İnci", slug: "inci" },
  { label: "Setler", slug: "setler" },
];
