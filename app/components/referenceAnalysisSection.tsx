'use client'
import { Card, Title, Text } from "@tremor/react"
import { FiBook, FiDatabase, FiTrendingUp, FiAward, FiPieChart, FiBarChart2, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'

export function ReferenceAnalysisSection() {
  return (
    <section id="reference-analysis" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <Title className="text-3xl font-bold text-center mb-4 text-gray-100">
          Referans Çalışma Analizi
        </Title>
        
        <Text className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          "Predicting Student Dropout and Academic Success: A Comparative Study" çalışmasının kapsamlı analizi ve projemize katkıları
        </Text>

        {/* Genel Bakış */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-4">
              <FiDatabase className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Veri Seti Özellikleri</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• 4424 öğrenci kaydı</li>
              <li>• 37 özellik</li>
              <li>• 3 sınıf etiketi</li>
              <li>• 5 akademik dönem</li>
              <li>• 2 farklı kampüs</li>
              <li>• 17 farklı program</li>
              <li>• %32.1 dropout oranı</li>
              <li>• %49.9 mezuniyet oranı</li>
            </ul>
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-4">
              <FiPieChart className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Özellik Dağılımı</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• 12 demografik özellik</li>
              <li>• 8 akademik performans</li>
              <li>• 7 sosyoekonomik faktör</li>
              <li>• 5 ailesel özellik</li>
              <li>• 3 kurumsal faktör</li>
              <li>• 2 ekonomik gösterge</li>
            </ul>
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-4">
              <FiBarChart2 className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Metodolojik Yaklaşım</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• 5-fold cross validation</li>
              <li>• Dengesiz veri çözümleri</li>
              <li>• Çoklu model karşılaştırması</li>
              <li>• Hiperparametre optimizasyonu</li>
              <li>• Özellik önem analizi</li>
              <li>• Ensemble öğrenme teknikleri</li>
            </ul>
          </Card>
        </div>

        {/* Detaylı Analiz */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiTrendingUp className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Dengeleme Teknikleri Analizi</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-green-400 mb-3">SMOTE ve Türevleri</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Klasik SMOTE: %76.38 doğruluk, %75.12 F1-score</li>
                  <li>• Borderline SMOTE: %75.16 doğruluk, %74.89 F1-score</li>
                  <li>• ADASYN: %74.92 doğruluk, %73.45 F1-score</li>
                  <li>• SVM SMOTE: %76.38 doğruluk, %75.92 F1-score</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-green-400 mb-3">Hibrit Yaklaşımlar</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• SMOTE + Tomek Links: %75.84 doğruluk</li>
                  <li>• SMOTE + ENN: %75.62 doğruluk</li>
                  <li>• SMOTE + NCL: %74.98 doğruluk</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiCheckCircle className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Model Performans Analizi</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-blue-400 mb-3">Temel Modeller</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Random Forest: %76.38 doğruluk, %75.92 F1-score</li>
                  <li>• Decision Tree: %67.00 doğruluk, %66.54 F1-score</li>
                  <li>• Neural Networks: %70.00 doğruluk, %69.87 F1-score</li>
                  <li>• SVM: %72.54 doğruluk, %71.98 F1-score</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-blue-400 mb-3">Ensemble Modeller</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Voting Classifier: %75.12 doğruluk</li>
                  <li>• Stacking Ensemble: %76.84 doğruluk</li>
                  <li>• Bagging Classifier: %74.92 doğruluk</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Önemli Bulgular ve Katkılar */}
        <div className="grid grid-cols-1 gap-8">
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiBook className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Önemli Bulgular ve Projemize Katkıları</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-medium text-yellow-400 mb-3">Kritik Bulgular</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• SVM SMOTE en etkili dengeleme tekniği</li>
                  <li>• Random Forest en başarılı sınıflandırıcı</li>
                  <li>• İlk yıl performansı kritik öneme sahip</li>
                  <li>• Sosyoekonomik faktörler belirleyici</li>
                  <li>• Burs desteği başarıyı artırıyor</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-yellow-400 mb-3">Teknik Katkılar</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Pipeline entegrasyonu</li>
                  <li>• Cross-validation stratejisi</li>
                  <li>• Dengeleme teknikleri</li>
                  <li>• Model seçim kriterleri</li>
                  <li>• Performans metrikleri</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-yellow-400 mb-3">Metodolojik Katkılar</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Veri önişleme yaklaşımı</li>
                  <li>• Özellik mühendisliği</li>
                  <li>• Model değerlendirme kriterleri</li>
                  <li>• Dokümantasyon yapısı</li>
                  <li>• Analiz metodolojisi</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Teknik Terimler Sözlüğü */}
        <Card className="bg-gray-800/30 border border-gray-700 mt-8">
          <div className="flex items-center mb-6">
            <FiBook className="w-6 h-6 text-indigo-400 mr-3" />
            <h3 className="text-xl font-semibold text-gray-100">Teknik Terimler Sözlüğü</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dengeleme Teknikleri */}
            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Dengeleme Teknikleri</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium">SMOTE (Synthetic Minority Over-sampling Technique)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Azınlık sınıfı örneklerini sentetik olarak çoğaltan bir tekniktir. K-en yakın komşu yaklaşımını kullanarak yeni örnekler oluşturur.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium">Borderline SMOTE</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    SMOTE'nin geliştirilmiş versiyonu olup, sınıf sınırlarına yakın örneklere odaklanarak daha etkili sentetik örnekler üretir.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium">ADASYN (Adaptive Synthetic Sampling)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Öğrenilmesi zor olan örneklere daha fazla odaklanarak adaptif bir şekilde sentetik örnekler üreten gelişmiş bir dengeleme tekniği.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium">Tomek Links</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Farklı sınıflara ait en yakın örnek çiftlerini tespit edip temizleyerek sınıf sınırlarını netleştiren bir teknik.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">ENN (Edited Nearest Neighbors)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    K-en yakın komşularının çoğunluğundan farklı sınıfa sahip örnekleri temizleyerek veri setini düzenleyen bir yöntem.
                  </p>
                </div>
              </div>
            </div>

            {/* Model ve Metrikler */}
            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Model ve Değerlendirme Metrikleri</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium">Cross-validation (Çapraz Doğrulama)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Veri setini eğitim ve test setlerine bölerek modelin genelleme yeteneğini değerlendiren bir teknik. 5-fold, veri setinin 5 parçaya bölündüğü anlamına gelir.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Precision (Kesinlik)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Pozitif olarak tahmin edilen örnekler içinde gerçekten pozitif olanların oranı. Formül: TP / (TP + FP)
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Recall (Duyarlılık)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Gerçekte pozitif olan örnekler içinde doğru tahmin edilenlerin oranı. Formül: TP / (TP + FN)
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">F1-Score</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Precision ve Recall değerlerinin harmonik ortalaması. Formül: 2 * (Precision * Recall) / (Precision + Recall)
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Ensemble Learning (Topluluk Öğrenmesi)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Birden fazla modelin tahminlerini birleştirerek daha güçlü bir model oluşturma tekniği. Voting, Stacking ve Bagging bu kategoriye girer.
                  </p>
                </div>
              </div>
            </div>

            {/* Özellik Mühendisliği */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Özellik Mühendisliği Terimleri</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-medium">Feature Selection (Özellik Seçimi)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Model performansını artırmak için en önemli özelliklerin seçilmesi işlemi. Gereksiz ve gürültülü özellikleri elemek için kullanılır.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Feature Scaling (Özellik Ölçeklendirme)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Farklı ölçeklerdeki özellikleri aynı aralığa getirme işlemi. Standardizasyon ve normalizasyon bu kategoriye girer.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Feature Encoding (Özellik Kodlama)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Kategorik verilerin sayısal formata dönüştürülmesi. One-hot encoding ve label encoding yaygın kullanılan tekniklerdir.
                  </p>
                </div>

                <div>
                  <h5 className="text-white font-medium">Feature Importance (Özellik Önemi)</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Her bir özelliğin model tahminlerine olan katkısının ölçülmesi. Random Forest gibi modeller bu analizi doğal olarak sağlar.
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