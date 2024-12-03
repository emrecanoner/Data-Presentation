'use client'
import { Card, Title, Text } from "@tremor/react"
import { FiBook, FiDatabase, FiTrendingUp, FiAward, FiPieChart, FiBarChart2 } from 'react-icons/fi'
import { DetailedModelPerformanceChart, ConfusionMatrixVisualization, ClassificationMetricsChart } from './charts/ReferenceAnalysisCharts'

export function ReferenceAnalysisSection() {
  return (
    <section id="reference-analysis" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <Title className="text-3xl font-bold text-center mb-4 text-gray-100">
          Referans Çalışma Analizi
        </Title>
        
        <Text className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          "Predictive Analytics for Early Identification of At-Risk Students" çalışmasının analizi
        </Text>

        {/* Çalışma Özeti - Başa taşındı */}
        <Card className="bg-gray-800/30 border border-gray-700 mb-12">
          <div className="flex items-center mb-6">
            <FiBook className="w-6 h-6 text-indigo-400 mr-3" />
            <h3 className="text-xl font-semibold text-gray-100">Çalışma Özeti</h3>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Introduction (Giriş)</h4>
              <p className="text-gray-400 text-sm">
                Öğrenci başarısının ve okul terk oranlarının tahmin edilmesi, eğitim kurumları için kritik bir öneme sahiptir. Bu çalışmada, öğrenci verileri kullanılarak akademik başarı ve okul terkini öngörmek amaçlanmıştır. Farklı model ve tekniklerin etkinliği karşılaştırılarak en iyi performansı gösteren yöntemler belirlenmiştir. Eğitim verileri, demografik, akademik ve sosyoekonomik faktörleri içermektedir. Bu faktörlerin, öğrenci başarısı üzerindeki etkileri incelenmiştir.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Literature Review (Literatür Taraması)</h4>
              <p className="text-gray-400 text-sm">
                Öğrenci başarısını tahmin etme konusunda yapılan önceki çalışmalar incelenmiştir. Literatürde, makine öğrenmesi ve istatistiksel yöntemlerin yaygın olarak kullanıldığı görülmüştür. Özellikle, karar ağaçları, destek vektör makineleri ve yapay sinir ağları gibi modellerin etkinliği vurgulanmıştır. Veri dengesizliği probleminin çözümüne yönelik çeşitli dengeleme teknikleri tartışılmıştır. Literatürdeki boşluklar ve mevcut yaklaşımların sınırlamaları ele alınmıştır.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Theoretical Background (Teorik Arka Plan)</h4>
              <p className="text-gray-400 text-sm">
                Çalışmanın teorik temelleri, makine öğrenmesi ve veri madenciliği tekniklerine dayanmaktadır. Sınıflandırma algoritmaları ve dengeleme teknikleri üzerinde durulmuştur. SMOTE, ADASYN ve SVM SMOTE gibi yöntemlerin teorik altyapısı açıklanmıştır. Çapraz doğrulama (cross-validation) ve model değerlendirme metrikleri gibi kavramlar detaylandırılmıştır. Bu teorik çerçeve, çalışmanın metodolojik yaklaşımını desteklemektedir.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Methodology (Metodoloji)</h4>
              <p className="text-gray-400 text-sm">
                Çalışmada kullanılan metodoloji, veri ön işleme, model eğitimi ve değerlendirme aşamalarını kapsamaktadır. Veri seti, eksik veri analizi ve özellik mühendisliği adımlarıyla hazırlanmıştır. Dengesiz veri problemi, çeşitli dengeleme teknikleriyle ele alınmıştır. Model performansı, 5-fold çapraz doğrulama ile değerlendirilmiştir. Random Forest, SVM ve diğer modellerin performansları karşılaştırılmıştır.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Results (Sonuçlar) - Dataset 1</h4>
              <p className="text-gray-400 text-sm">
                İlk veri seti üzerinde yapılan analizler sonucunda, SVM SMOTE ile en yüksek doğruluk oranı elde edilmiştir. Random Forest modeli, sınıf bazlı metriklerde üstün performans göstermiştir. Graduate sınıfında %89 recall değeri kaydedilmiştir. Enrolled sınıfında ise %45 F1-score elde edilmiştir. Sonuçlar, dengeleme tekniklerinin model performansını önemli ölçüde artırdığını göstermektedir.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Conclusion (Sonuç) - Dataset 1</h4>
              <p className="text-gray-400 text-sm">
                Çalışmanın sonuçları, öğrenci başarısını tahmin etmede makine öğrenmesi modellerinin etkinliğini ortaya koymuştur. Dengeleme teknikleri, veri dengesizliği problemini çözmede etkili olmuştur. Random Forest ve SVM SMOTE kombinasyonu, en iyi performansı sağlamıştır. Gelecekteki çalışmalar için, daha geniş veri setleri ve farklı model kombinasyonları önerilmektedir. Eğitim kurumları, bu bulguları kullanarak öğrenci başarısını artırabilir ve okul terk oranlarını azaltabilir.
              </p>
            </div>
          </div>
        </Card>

        {/* Metodolojik Yaklaşım */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
          <Card className="bg-gray-800/30 border border-gray-700 w-full">
            <div className="flex items-center mb-4">
              <FiBarChart2 className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Metodolojik Yaklaşım</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-gray-400">
              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-2">Veri Ön İşleme</h4>
                <ul className="space-y-2">
                  <li>• Eksik veri analizi</li>
                  <li>• Özellik ölçeklendirme (standardizasyon)</li>
                  <li>• Kategorik değişken dönüşümleri</li>
                  <li>• Aykırı değer analizi</li>
                  <li>• Özellik seçimi</li>
                </ul>
                <div className="mt-4">
                  <h5 className="text-white text-sm mb-2">Özellik Dağılımı</h5>
                  <p className="text-gray-400 text-sm">
                    • Demografik: 8 özellik
                    • Akademik: 21 özellik
                    • Sosyoekonomik: 8 özellik
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-2">Dengeleme Teknikleri</h4>
                <ul className="space-y-2">
                  <li>• SMOTE</li>
                  <li>• ADASYN</li>
                  <li>• SMOTE-Tomek</li>
                  <li>• SVM SMOTE</li>
                </ul>
                <div className="mt-4">
                  <h5 className="text-white text-sm mb-2">Sınıf Dağılımı</h5>
                  <p className="text-gray-400 text-sm">
                    • Dropout: %32.1
                    • Enrolled: %18.0
                    • Graduate: %49.9
                  </p>
                </div>
                <div className="mt-4">
                  <h5 className="text-white text-sm mb-2">Veri Boyutu</h5>
                  <p className="text-gray-400 text-sm">
                    • Toplam örnek: 4424
                    • Özellik sayısı: 37
                    • Dönem sayısı: 5
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-2">Model Değerlendirme</h4>
                <ul className="space-y-2">
                  <li>• 5-fold cross validation</li>
                  <li>• Confusion matrix analizi</li>
                  <li>• Sınıf bazlı performans metrikleri</li>
                  <li>• Makro ve ağırlıklı ortalamalar</li>
                  <li>• Model karşılaştırma kriterleri</li>
                </ul>
                <div className="mt-4">
                  <h5 className="text-white text-sm mb-2">Değerlendirme Metrikleri</h5>
                  <p className="text-gray-400 text-sm">
                    • Accuracy
                    • Precision
                    • Recall
                    • F1-Score
                    • ROC-AUC
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Model Performans Grafikleri */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiBarChart2 className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Random Forest Model Performans Analizi</h3>
            </div>
            <DetailedModelPerformanceChart />

            {/* Random Forest Performans Analizi */}
            <div className="mt-8 space-y-8">
              {/* Genel Analiz */}
              <div>
                <h4 className="text-lg font-medium text-blue-400 mb-4">Genel Değerlendirme</h4>
                <p className="text-gray-400 text-sm">
                  • Dört farklı dengeleme tekniği karşılaştırmalı olarak analiz edilmiştir
                  • SVM SMOTE en yüksek CV accuracy değerini sağlamıştır
                  • Tüm teknikler %76'nın üzerinde CV accuracy değeri göstermiştir
                  • Test ve CV accuracy değerleri arasında tutarlılık gözlenmiştir
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-blue-400 mb-4">Teknik Bazlı Analiz</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white text-sm">SVM SMOTE Performansı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • CV Accuracy: %77.22 (En yüksek)
                        • Test Accuracy: %76.38
                        • Macro F1: %69.00
                        • Weighted F1: %76.00
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">SMOTE Performansı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • CV Accuracy: %76.55
                        • Test Accuracy: %76.38
                        • Macro F1: %71.00
                        • Weighted F1: %76.00
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">ADASYN Performansı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • CV Accuracy: %76.66
                        • Test Accuracy: %76.27
                        • Macro F1: %70.00
                        • Weighted F1: %76.00
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">SMOTE-Tomek Performansı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • CV Accuracy: %76.99
                        • Test Accuracy: %75.37
                        • Macro F1: %69.00
                        • Weighted F1: %75.00
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-blue-400 mb-4">Metrik Bazlı Analiz</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white text-sm">CV Accuracy Analizi</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • En yüksek: SVM SMOTE (%77.22)
                        • En düşük: SMOTE (%76.55)
                        • Ortalama: %76.86
                        • Standart sapma: ±0.29
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Test Accuracy Analizi</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • En yüksek: SVM SMOTE ve SMOTE (%76.38)
                        • En düşük: SMOTE-Tomek (%75.37)
                        • Ortalama: %76.10
                        • CV sonuçlarıyla tutarlılık göstermiştir
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">F1-Score Analizi</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Macro F1 en yüksek: SMOTE (%71.00)
                        • Weighted F1 tutarlı: %75-76 aralığında
                        • Sınıf dengesizliği etkisi gözlenmiştir
                        • Weighted F1 daha stabil sonuçlar vermiştir
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Karşılaştırmalı Sonuçlar */}
              <div>
                <h4 className="text-lg font-medium text-blue-400 mb-4">Önemli Bulgular</h4>
                <p className="text-gray-400 text-sm">
                  • Tüm dengeleme teknikleri başarılı performans göstermiştir
                  • SVM SMOTE genel olarak en iyi sonuçları vermiştir
                  • Test ve CV sonuçları arasında tutarlılık gözlenmiştir
                  • Weighted F1 skorları tüm tekniklerde benzer seviyededir
                  • Macro F1 skorlarında SMOTE tekniği öne çıkmıştır
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiPieChart className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Confusion Matrix Analizi</h3>
            </div>
            <ConfusionMatrixVisualization />
            
            {/* Confusion Matrix Analizi */}
            <div className="mt-8 space-y-8">
              {/* Genel Analiz */}
              <div>
                <h4 className="text-lg font-medium text-purple-400 mb-4">Genel Değerlendirme</h4>
                <p className="text-gray-400 text-sm">
                  • Her iki modelde de Graduate (2) sınıfı en başarılı tahmin edilen sınıf olmuştur
                  • Enrolled (1) sınıfı, veri setindeki dengesizlik nedeniyle en zorlu sınıf olarak görülmüştür
                  • Dropout (0) sınıfında her iki model de tutarlı performans göstermiştir
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-purple-400 mb-4">RF + SVM SMOTE Detaylı Analiz</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white text-sm">Doğru Tahminler</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Dropout (0): 246 doğru tahmin
                        • Enrolled (1): 60 doğru tahmin
                        • Graduate (2): 370 doğru tahmin
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Yanlış Sınıflandırmalar</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Dropout olarak yanlış tahmin: 52 örnek (35 Enrolled + 17 Graduate)
                        • Enrolled olarak yanlış tahmin: 57 örnek (26 Dropout + 31 Graduate)
                        • Graduate olarak yanlış tahmin: 100 örnek (44 Dropout + 56 Enrolled)
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Önemli Gözlemler</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Graduate sınıfı en yüksek doğru tahmin oranına sahiptir (%88.7)
                        • Enrolled sınıfının doğru tahmin oranı en düşüktür (%39.7)
                        • Dropout sınıfı orta düzeyde performans göstermiştir (%77.8)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-purple-400 mb-4">RF + SMOTE Detaylı Analiz</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white text-sm">Doğru Tahminler</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Dropout (0): 236 doğru tahmin
                        • Enrolled (1): 72 doğru tahmin
                        • Graduate (2): 365 doğru tahmin
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Yanlış Sınıflandırmalar</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Dropout olarak yanlış tahmin: 48 örnek (31 Enrolled + 17 Graduate)
                        • Enrolled olarak yanlış tahmin: 63 örnek (32 Dropout + 31 Graduate)
                        • Graduate olarak yanlış tahmin: 89 örnek (48 Dropout + 41 Enrolled)
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Önemli Gözlemler</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Graduate sınıfı benzer şekilde en iyi performansı göstermiştir (%88.3)
                        • Enrolled sınıfında SVM SMOTE'a göre daha iyi sonuç alınmıştır (%47.7)
                        • Dropout sınıfında hafif bir düşüş gözlenmiştir (%74.4)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Karşılaştırmalı Sonuçlar */}
              <div>
                <h4 className="text-lg font-medium text-purple-400 mb-4">Karşılaştırmalı Sonuçlar</h4>
                <p className="text-gray-400 text-sm">
                  • SVM SMOTE, Dropout sınıfında daha iyi performans göstermiştir
                  • SMOTE, Enrolled sınıfında daha başarılı sonuçlar vermiştir
                  • Graduate sınıfında her iki teknik de benzer performans sergilemiştir
                  • Genel olarak, her iki teknik de veri dengesizliği problemini iyileştirmiştir
                  • Model seçimi, hedef sınıfa göre değişkenlik gösterebilir
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiTrendingUp className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Sınıflandırma Metrikleri</h3>
            </div>
            <ClassificationMetricsChart />

            {/* Sınıflandırma Metrikleri Analizi */}
            <div className="mt-8 space-y-8">
              {/* Genel Analiz */}
              <div>
                <h4 className="text-lg font-medium text-green-400 mb-4">Genel Değerlendirme</h4>
                <p className="text-gray-400 text-sm">
                  • Sınıflandırma metrikleri, modelin farklı sınıflar üzerindeki performansını ölçmek için kullanılmıştır
                  • Precision, Recall ve F1-Score gibi metrikler, sınıf dengesizliğinin etkilerini değerlendirmede kritik rol oynamıştır
                  • Her sınıf için ayrı ayrı metrikler hesaplanmış ve karşılaştırılmıştır
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-green-400 mb-4">Sınıf Bazlı Metrikler</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white text-sm">Dropout (0) Sınıfı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Precision: %83
                        • Recall: %78
                        • F1-Score: %80
                        • En yüksek precision değeri bu sınıfta elde edilmiştir
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Enrolled (1) Sınıfı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Precision: %47
                        • Recall: %40
                        • F1-Score: %43
                        • En düşük metrik değerleri bu sınıfta gözlemlenmiştir
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Graduate (2) Sınıfı</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • Precision: %88
                        • Recall: %89
                        • F1-Score: %88
                        • En yüksek recall ve F1-Score değerleri bu sınıfta elde edilmiştir
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-green-400 mb-4">Metrik Bazlı Analiz</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white text-sm">Precision Analizi</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • En yüksek: Graduate (%88)
                        • En düşük: Enrolled (%47)
                        • Ortalama: %72.67
                        • Sınıf dengesizliği precision üzerinde etkili olmuştur
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">Recall Analizi</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • En yüksek: Graduate (%89)
                        • En düşük: Enrolled (%40)
                        • Ortalama: %69.00
                        • Recall, sınıf dengesizliğinden daha az etkilenmiştir
                      </p>
                    </div>
                    <div>
                      <h5 className="text-white text-sm">F1-Score Analizi</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        • En yüksek: Graduate (%88)
                        • En düşük: Enrolled (%43)
                        • Ortalama: %70.33
                        • F1-Score, precision ve recall arasındaki dengeyi yansıtmaktadır
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Karşılaştırmalı Sonuçlar */}
              <div>
                <h4 className="text-lg font-medium text-green-400 mb-4">Önemli Bulgular</h4>
                <p className="text-gray-400 text-sm">
                  • Graduate sınıfı, tüm metriklerde en iyi performansı göstermiştir
                  • Enrolled sınıfı, sınıf dengesizliği nedeniyle en düşük performansı sergilemiştir
                  • Dropout sınıfı, precision açısından güçlü bir performans sergilemiştir
                  • Genel olarak, sınıf dengesizliği metrikler üzerinde belirgin bir etkiye sahiptir
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Teknik Terimler */}
        <Card className="bg-gray-800/30 border border-gray-700 mt-8">
          <div className="flex items-center mb-6">
            <FiBook className="w-6 h-6 text-indigo-400 mr-3" />
            <h3 className="text-xl font-semibold text-gray-100">Teknik Terimler</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Dengeleme Teknikleri</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white">SVM SMOTE</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Support Vector Machine tabanlı sentetik örnek üretme tekniğidir. 
                    Dengesiz veri setlerinde sınıf dengesini sağlamak için kullanılır. 
                    En yüksek CV accuracy (%77.22) bu teknikle elde edilmiştir.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">SMOTE</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Synthetic Minority Over-sampling Technique, azınlık sınıf örneklerini artırarak veri dengesizliğini giderir. 
                    %76.38 test accuracy değeri kaydedilmiştir.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">ADASYN</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Adaptive Synthetic Sampling, SMOTE'un bir türevidir ve azınlık sınıf örneklerini adaptif olarak artırır. 
                    %76.66 CV accuracy elde edilmiştir.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">SMOTE-Tomek</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    SMOTE ve Tomek Link kombinasyonu, veri dengesizliğini azaltırken gürültülü örnekleri temizler. 
                    %76.99 CV accuracy sağlanmıştır.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Model Değerlendirme Metrikleri</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white">Cross-validation (Çapraz Doğrulama)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Bir modelin genelleme yeteneğini değerlendirmek için kullanılan bir metriktir. 
                    Veri seti, belirli bir sayıda (örneğin 5) eşit parçaya bölünür ve her parça bir kez test seti olarak kullanılırken diğer parçalar eğitim seti olarak kullanılır. 
                    Bu süreç sonunda elde edilen doğruluk oranlarının ortalaması, CV accuracy olarak adlandırılır.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">Random Forest (Rastgele Orman)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Birden fazla karar ağacının bir araya getirilmesiyle oluşturulan bir ensemble öğrenme yöntemidir. 
                    Tüm dengeleme teknikleriyle en iyi performansı gösteren model olarak belirlenmiştir.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">Precision (Kesinlik)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Pozitif olarak tahmin edilen örnekler içinde gerçekten pozitif olanların oranıdır. 
                    Dropout sınıfında %83 precision değeri elde edilmiştir.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">Recall (Duyarlılık)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Gerçekte pozitif olan örnekler içinde doğru tahmin edilenlerin oranıdır. 
                    Graduate sınıfında %89 recall değeri kaydedilmiştir.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">F1-Score</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Precision ve Recall değerlerinin harmonik ortalamasıdır. 
                    Enrolled sınıfında %45 F1-score elde edilmiştir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}