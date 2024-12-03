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
          "Predicting Student Dropout and Academic Success: A Comparative Study" çalışmasının analizi
        </Text>

        {/* Metodolojik Yaklaşım */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-4">
              <FiBarChart2 className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Metodolojik Yaklaşım</h3>
            </div>
            <div className="space-y-4 text-gray-400">
              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-2">Veri Ön İşleme</h4>
                <ul className="space-y-2">
                  <li>• Eksik veri analizi</li>
                  <li>• Özellik ölçeklendirme (standardizasyon)</li>
                  <li>• Kategorik değişken dönüşümleri</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-2">Dengeleme Teknikleri</h4>
                <ul className="space-y-2">
                  <li>• SMOTE</li>
                  <li>• ADASYN</li>
                  <li>• SMOTE-Tomek</li>
                  <li>• SVM SMOTE</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-2">Model Değerlendirme</h4>
                <ul className="space-y-2">
                  <li>• 5-fold cross validation</li>
                  <li>• Confusion matrix analizi</li>
                  <li>• Sınıf bazlı performans metrikleri</li>
                </ul>
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
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiPieChart className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Confusion Matrix Analizi</h3>
            </div>
            <ConfusionMatrixVisualization />
          </Card>

          <Card className="bg-gray-800/30 border border-gray-700">
            <div className="flex items-center mb-6">
              <FiTrendingUp className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Sınıflandırma Metrikleri</h3>
            </div>
            <ClassificationMetricsChart />
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
                    En yüksek CV accuracy (%77.22) ve test accuracy (%76.38).
                    Graduate sınıfında %89 recall değeri elde edildi.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">SMOTE</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Test accuracy: %76.38, CV accuracy: %76.55.
                    Graduate sınıfında %88 recall değeri.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-indigo-400 mb-4">Model Değerlendirme</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white">Random Forest</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    Tüm dengeleme teknikleriyle en iyi performansı gösteren model.
                    SVM SMOTE ile en yüksek accuracy değeri.
                  </p>
                </div>
                <div>
                  <h5 className="text-white">Cross-validation</h5>
                  <p className="text-gray-400 text-sm mt-1">
                    5-fold cross validation kullanıldı.
                    Model genelleme yeteneği test edildi.
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