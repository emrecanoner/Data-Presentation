const statisticalGuide = {
  pValue: {
    title: "p-değeri Yorumlama",
    description: "İstatistiksel anlamlılık seviyesi",
    levels: [
      { range: "p < 0.001", meaning: "Çok güçlü kanıt (***)", color: "bg-green-500" },
      { range: "p < 0.01", meaning: "Güçlü kanıt (**)", color: "bg-green-400" },
      { range: "p < 0.05", meaning: "Yeterli kanıt (*)", color: "bg-green-300" },
      { range: "p > 0.05", meaning: "Yetersiz kanıt", color: "bg-red-400" }
    ]
  },
  fStat: {
    title: "F-istatistiği Yorumlama",
    description: "Gruplar arası farkların büyüklüğü",
    levels: [
      { range: "F > 150", meaning: "Çok büyük grup farklılıkları", color: "bg-purple-600" },
      { range: "100 < F < 150", meaning: "Büyük grup farklılıkları", color: "bg-purple-500" },
      { range: "50 < F < 100", meaning: "Önemli farklılıklar", color: "bg-blue-500" },
      { range: "10 < F < 50", meaning: "Orta düzey farklılıklar", color: "bg-green-500" },
      { range: "F < 10", meaning: "Küçük grup farklılıkları", color: "bg-yellow-500" }
    ]
  },
  effectSize: {
    title: "Etki Büyüklüğü (Cohen's d)",
    description: "Gruplar arası farkın pratik anlamlılığı",
    levels: [
      { range: "|d| > 0.8", meaning: "Büyük etki", color: "bg-purple-500" },
      { range: "0.5 < |d| < 0.8", meaning: "Orta düzey etki", color: "bg-blue-500" },
      { range: "0.2 < |d| < 0.5", meaning: "Küçük etki", color: "bg-yellow-500" },
      { range: "|d| < 0.2", meaning: "İhmal edilebilir etki", color: "bg-gray-500" }
    ]
  },
  correlation: {
    title: "Korelasyon Katsayısı (r)",
    description: "İki değişken arasındaki ilişkinin gücü",
    levels: [
      { range: "|r| > 0.7", meaning: "Güçlü ilişki", color: "bg-purple-500" },
      { range: "0.5 < |r| < 0.7", meaning: "Orta-güçlü ilişki", color: "bg-blue-500" },
      { range: "0.3 < |r| < 0.5", meaning: "Orta düzey ilişki", color: "bg-green-500" },
      { range: "0.1 < |r| < 0.3", meaning: "Zayıf ilişki", color: "bg-yellow-500" },
      { range: "|r| < 0.1", meaning: "İhmal edilebilir ilişki", color: "bg-gray-500" }
    ]
  },
  semester_difference: {
    title: "Dönemler Arası Fark",
    description: "İki dönem arasındaki performans değişimi",
    levels: [
      { range: "Fark > 0", meaning: "Performans artışı", color: "bg-green-500" },
      { range: "-0.3 < Fark < 0", meaning: "Küçük düşüş", color: "bg-yellow-500" },
      { range: "-0.6 < Fark < -0.3", meaning: "Orta düzey düşüş", color: "bg-orange-500" },
      { range: "Fark < -0.6", meaning: "Büyük düşüş", color: "bg-red-500" }
    ]
  }
};

export function StatisticalGuide() {
  return (
    <div className="mt-12 bg-gray-800/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-100 mb-6">İstatistiksel Yorumlama Rehberi</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(statisticalGuide).map(([key, guide]) => (
          <div key={key} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">{guide.title}</h4>
            <p className="text-sm text-gray-400">{guide.description}</p>
            <div className="space-y-2">
              {guide.levels.map((level, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${level.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">{level.range}</p>
                    <p className="text-xs text-gray-400">{level.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 