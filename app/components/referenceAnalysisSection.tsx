'use client'
import { Card, Title, Text } from "@tremor/react"
import { FiBook, FiDatabase, FiTrendingUp, FiAward } from 'react-icons/fi'

export function ReferenceAnalysisSection() {
  return (
    <section id="reference-analysis" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <Title className="text-3xl font-bold text-center mb-4 text-gray-100">
          Referans Çalışma Analizi
        </Title>
        
        <Text className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Realinho ve diğerleri (2022) tarafından yapılan "Öğrenci Terk ve Akademik Başarının Tahmini" çalışmasının detaylı analizi
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Veri Seti Analizi */}
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-4">
              <FiDatabase className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Veri Seti Özellikleri</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• 4424 öğrenci kaydı</li>
              <li>• 37 özellik (demografik, akademik, sosyoekonomik)</li>
              <li>• 3 sınıf: Dropout, Enrolled, Graduate</li>
              <li>• Dengesiz sınıf dağılımı problemi</li>
            </ul>
          </Card>

          {/* Metodoloji Analizi */}
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-4">
              <FiTrendingUp className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Metodoloji</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• SMOTE ve türevleri ile veri dengeleme</li>
              <li>• 5-fold cross validation</li>
              <li>• Random Forest, Decision Tree, SVM modelleri</li>
              <li>• Kapsamlı performans metrikleri</li>
            </ul>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Detaylı Analiz */}
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiBook className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Detaylı Analiz</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-blue-400 mb-3">Dengeleme Teknikleri</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• SMOTE: %76.38 doğruluk</li>
                  <li>• ADASYN: %74.92 doğruluk</li>
                  <li>• Borderline SMOTE: %75.16 doğruluk</li>
                  <li>• SVM SMOTE: %76.38 doğruluk (en iyi performans)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium text-purple-400 mb-3">Model Performansları</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Random Forest + SVM SMOTE: %76.38</li>
                  <li>• Decision Tree + SMOTE: %67.00</li>
                  <li>• Neural Networks + ADASYN: %70.00</li>
                  <li>• SVM + Borderline SMOTE: %72.54</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-3">Sınıf Bazlı Performans</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Dropout: Precision=0.83, Recall=0.78, F1=0.80</li>
                  <li>• Enrolled: Precision=0.51, Recall=0.40, F1=0.45</li>
                  <li>• Graduate: Precision=0.79, Recall=0.89, F1=0.83</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Projemize Katkıları */}
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiAward className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Projemize Katkıları</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-yellow-400 mb-3">Teknik Katkılar</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• SVM SMOTE implementasyonu</li>
                  <li>• Cross-validation stratejisi</li>
                  <li>• Pipeline entegrasyonu</li>
                  <li>• Performans metriklerinin seçimi</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium text-green-400 mb-3">Metodolojik Katkılar</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Veri dengeleme yaklaşımı</li>
                  <li>• Model seçim kriterleri</li>
                  <li>• Değerlendirme metrikleri</li>
                  <li>• Dokümantasyon yapısı</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
} 