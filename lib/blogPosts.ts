export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Zanaat" | "Trendler" | "Pırlanta Rehberi" | "Tasarım";
  date: string;
  image: string;
  content: { heading?: string; body: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "pirlanta-secim-rehberi",
    title: "Pırlanta Seçim Rehberi: 4C Kuralının Ötesi",
    excerpt:
      "Karat, Berraklık, Renk ve Kesim temelidir. Ancak gerçek lüks, bu dört kriterin çok ötesinde yatar.",
    category: "Pırlanta Rehberi",
    date: "12 Ocak 2026",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=85&fit=crop",
    content: [
      {
        body: "Karat, Berraklık, Renk ve Kesim — bu dört kriter her kuyumcu sunumunun başlangıç noktasıdır. Pırlanta değerlendirmesinin alfabesi olan 4C, alıcıya objektif bir referans çerçevesi sunar. Ancak ONR Mücevherat olarak biz, bu çerçevenin yalnızca bir başlangıç olduğuna inanıyoruz. Gerçek bir pırlantayı eşsiz kılan şey, sayıların ve sertifikaların yakalayamadığı bir özellikte gizlidir: ateş.",
      },
      {
        heading: "Ateş, Parlaklık ve Serillik",
        body: "Bir pırlantanın ışıkla konuşma biçimini üç kavramla tanımlarız: brilliance (beyaz ışığın yansıması), fire (ışığın renk tayfına ayrılması) ve scintillation (taşın hareketiyle oluşan ışık-karanlık desenleri). GIA 4C sistemi bu görsel nitelikleri dolaylı olarak kesim notu üzerinden değerlendirir; ancak aynı \"Excellent\" kesim notuna sahip iki taş, göz önünde bambaşka bir hayat sürebilir. Taşın proporsiyon geometrisi, tavan açısı ve masaya oranı, kağıt üstündeki değerinin ötesinde bir karakteri şekillendirir.",
      },
      {
        heading: "Etik Kaynak: Vicdanı Rahatlatan Parlaklık",
        body: "ONR Mücevherat olarak kullandığımız her pırlanta, GIA veya IGI'nin uluslararası sertifikasına sahipdir ve Kimberley Süreci onaylı kaynaklardan temin edilir. Pek çok alıcı için bu bir detay gibi görünebilir. Biz ise aksine inanıyoruz: Gerçek lüks, yalnızca parlayan değil, vicdanı da rahatlatan bir taşa sahip olmaktır. Madenin hangi topraktan çıktığını, kimin elinden geçtiğini bilen bir taş, sahibine farklı bir anlam katmanı sunar.",
      },
      {
        heading: "ONR'ın Seçim Felsefesi",
        body: "Her yıl binlerce taş incelenir; yalnızca bir kısmı atölyemize kabul edilir. Taş seçim sürecimizde standart kriterlerin yanı sıra laboratuvar koşullarında görsel değerlendirme, florüesans testi ve orantı analizi yapılır. Amacımız, vitrinde sergilendiğinde ve parmağınızda taşındığında eşit derecede büyüleyici bir taş sunmaktır. Bir ONR pırlantası seçtiğinizde, yalnızca bir taş değil; onlarca saatlik titiz bir seçim sürecinin mirasını da alıyorsunuz.",
      },
    ],
  },
  {
    slug: "2026-mucevher-trendleri",
    title: "2026 Mücevher Trendleri: Sessiz Lüksün Yükselişi",
    excerpt:
      "Gösterişli logolar yerini ustaca işlenmiş minimalist altın tasarımlara bırakıyor. Bu sezon, pürüzsüz yüzeyler ve heykelsi formlar ön planda.",
    category: "Trendler",
    date: "3 Şubat 2026",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=85&fit=crop",
    content: [
      {
        body: "Gösterişli logolar ve marka isimlerini ön plana çıkaran tasarımlar, yerini ustaca işlenmiş minimalist formlara bırakıyor. 2026 sezonunun egemen ruhu olan \"Sessiz Lüks\" (Quiet Luxury) akımı, mücevher dünyasını da derinden etkiliyor. Bu yeni anlayışta önemli olan, taşınan parçanın ne kadar dikkat çektiği değil; ne kadar iyi yapıldığıdır.",
      },
      {
        heading: "Heykelsi Formlar ve Pürüzsüz Yüzeyler",
        body: "Bu sezonun öne çıkan tasarımları, geometrik berraklık ve organik formu aynı anda barındırıyor. Pürüzsüz, cilalı altın yüzeyler; fütüristik bir sadeliği çağrıştıran bombeli yüzükler ve tektonik plakalar gibi üst üste binen katmanlar yoğun ilgi görüyor. Taşın yerini zaman zaman formun kendisi alıyor: Küçük bir pırlanta ya da değerli taş, sadece bir vurgu noktası olarak kullanılıyor.",
      },
      {
        heading: "Renk Paleti: Sıcak Metaller ve Zengin Tonlar",
        body: "Sarı ve gül altının 2026'da hakimiyetini sürdürdüğü görülüyor. Soğuk tonların popülerliği bir miktar azalırken, altının doğal sıcaklığı tercih ediliyor. Renkli taşlar ise ihtiyatla kullanılıyor: Derin zümrüt yeşili, sıcak safir mavisi ve haşin bir kırmızı korindon, aşırı gösteriş yapmadan güç hissini aktarıyor.",
      },
      {
        heading: "ONR'ın Koleksiyonu ve Bu Aktime Yanıtı",
        body: "ONR'nin 2026 koleksiyonu, Sessiz Lüks akımının zarafetini Türk zanaatkârlığıyla buluşturuyor. Milimetrik hassasiyetle işlenmiş altın yüzeyler, sertifikalı tek taşlar ve bilezikte kesintisiz akan formlar — her parça, dikkat çekmek için değil, yakından fark edilmek için tasarlandı. Koleksiyonumuzu keşfetmek için Exclusive serimizi incelemenizi davet ediyoruz.",
      },
    ],
  },
  {
    slug: "zanaatin-kalbi",
    title: "Zanaatın Kalbi: Bir Mücevherin Atölye Yolculuğu",
    excerpt:
      "İlk karakalem çizimden son cilaya kadar, bir ONR parçasının doğuşu ortalama 48 saatlik hassas bir emek gerektirir.",
    category: "Zanaat",
    date: "18 Şubat 2026",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1400&q=85&fit=crop&sat=-100",
    content: [
      {
        body: "İlk karakalem çizimden, ustanın tezgahındaki son cilaya kadar... Bir ONR parçasının doğuşu, ortalama 48 saatlik hassas bir emek gerektirir. Bu süre, bir fabrikasyon sürecinin çok ötesinde; her adımda insan eli ve insan gözü olan, her kararın kişisel sorumluluk taşıdığı bir yolculuktur. Atölyemizin perdelerini aralıyor ve bu sanatsal sürecin her aşamasını sizlerle paylaşıyoruz.",
      },
      {
        heading: "Eskiz ve Mum Model",
        body: "Her parça, bir tasarımcının kağıt üzerindeki ilk çizgisiyle başlar. Proporsiyon dengeleri otururken serbest el çizimleri yerini dijital modelleme araçlarına bırakabilir — ancak nihai karar her zaman ustanın gözündedir. Onaylanan tasarım, mum model aşamasına geçer. Hassas oyma aletleriyle şekillendirilen bu geçici kalıp, döküm sürecinin temelini oluşturur.",
      },
      {
        heading: "Döküm ve Metal İşçiliği",
        body: "Mum model, alçı kılıfına alınır ve fırında eritilir; geriye kalan boşluğa erimiş altın dökülür. Bu kayıp mum dökümü tekniği, yüzyıllardır değişmeden kullanılmaktadır. Metal soğuduktan sonra kaba formunu elde eden parça, tornalamadan törpülemeye, zımparalamadan perdahlama aşamalarına kadar onlarca el sürecinden geçer. Her işlem; parçanın yüzeyini, ağırlık dengesini ve ışıkla ilişkisini şekillendirir.",
      },
      {
        heading: "Taş Kapatma ve Son Cila",
        body: "Taş kapatma, atölyenin en kritik ve en sabır isteyen adımıdır. Bir pırlantanın yuvası, milyondan küçük farklar taşır — pençenin açısı, derinliği ve sıkışma basıncı taşın hem güvenliğini hem de görsel etkisini doğrudan belirler. Son aşamada parça, ultrasonik temizlikten geçer; ardından rodaj ya da mat yüzey işlemleriyle son kimliğine kavuşur. Gözden çıkmadan önce kalite kontrol masasında tek tek incelenir. Sizi bekleyecek parça, işte o masadan çıkar.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
