import { FiTarget, FiTrendingUp, FiAward, FiBarChart2 } from 'react-icons/fi'

export default function SummarySection() {
  return (
    <section id="summary" className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Proje Özeti
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Yükseköğretimde öğrenci başarısını etkileyen faktörlerin zamansal analizi ve tahmin modeli geliştirme çalışması
            </p>
          </div>

          {/* Ana İçerik Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Problem Tanımı */}
            <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                  <FiTarget className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">Problem Tanımı</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Yükseköğretimde öğrenci başarısını etkileyen faktörlerin zamansal değişiminin analizi ve okulu bırakma riskinin erken tespiti için tahmin modeli geliştirilmesi.
                  </p>
                </div>
              </div>
            </div>

            {/* Araştırma Amacı */}
            <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
                  <FiTrendingUp className="w-7 h-7 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">Araştırma Amacı</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Öğrenci başarısını etkileyen faktörlerin dönemsel etkilerini analiz ederek, risk altındaki öğrencilerin erken tespitini sağlayacak bir model geliştirmek.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hedefler ve Katkılar */}
          <div className="space-y-8">
            {/* Hedefler */}
            <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-pink-500/10 rounded-lg flex items-center justify-center mr-4">
                  <FiAward className="w-7 h-7 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Araştırma Hedefleri</h3>
                  <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Öğrenci başarısını etkileyen faktörlerin zamansal değişiminin analizi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Okulu bırakma riskinin erken tespiti için tahmin modeli geliştirilmesi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Faktörler arası ilişkilerin dönemsel değişiminin incelenmesi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Beklenen Katkılar */}
            <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                  <FiBarChart2 className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Beklenen Katkılar</h3>
                  <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Yükseköğretimde öğrenci başarısının zamansal analizi için yeni bir yaklaşım</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Risk altındaki öğrencilerin erken tespiti için tahmin modeli</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Eğitim kurumları için veri odaklı karar destek sistemi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}