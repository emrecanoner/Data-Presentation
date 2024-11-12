'use client'
import { useEffect, useState } from 'react'
import { fetchDatasetStats } from '@/app/utils/dataProcessor'
import { FiDatabase, FiTrendingUp, FiAward, FiUserCheck, FiAlertTriangle } from 'react-icons/fi'

export function MethodologySection() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDatasetStats()
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  if (loading || !stats) return (
    <div className="flex justify-center items-center py-20">
      <div className="text-gray-400">Yükleniyor...</div>
    </div>
  )

  return (
    <section id="methodology" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Metodoloji ve Bulgular</h2>
        <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Öğrenci başarısını etkileyen faktörlerin kapsamlı analizi ve risk faktörlerinin belirlenmesi
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Veri Toplama ve Hazırlama */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FiDatabase className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Veri Toplama ve Hazırlama</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• {stats.studentCount} öğrencinin verisi analiz edildi</li>
              <li>• Demografik, akademik ve sosyoekonomik veriler</li>
              <li>• Veri temizleme ve normalizasyon işlemleri</li>
              <li>• Eksik veri analizi ve düzeltme</li>
            </ul>
          </div>

          {/* Analiz Yöntemleri */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FiTrendingUp className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Analiz Yöntemleri</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• İstatistiksel analiz ve hipotez testleri</li>
              <li>• Korelasyon analizi</li>
              <li>• Zaman serisi analizi</li>
              <li>• Makine öğrenmesi modelleri</li>
            </ul>
          </div>

          {/* Başarı Faktörleri */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FiAward className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Başarı Faktörleri</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• Akademik geçmiş ve hazırbulunuşluk</li>
              <li>• Sosyoekonomik faktörler</li>
              <li>• Aile eğitim düzeyi</li>
              <li>• Burs ve destek programları</li>
            </ul>
          </div>

          {/* Risk Faktörleri */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FiAlertTriangle className="w-6 h-6 text-red-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Risk Faktörleri</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• Düşük akademik performans göstergeleri</li>
              <li>• Devamsızlık ve katılım sorunları</li>
              <li>• Ekonomik zorluklar</li>
              <li>• Uyum ve adaptasyon sorunları</li>
            </ul>
          </div>

          {/* Bulgular ve Öneriler */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 md:col-span-2">
            <div className="flex items-center mb-4">
              <FiUserCheck className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-100">Bulgular ve Öneriler</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-400 mb-2">Temel Bulgular</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Akademik başarıda aile eğitim düzeyinin etkisi</li>
                  <li>• Burs desteğinin başarıya pozitif etkisi</li>
                  <li>• İlk yıl performansının mezuniyet üzerindeki etkisi</li>
                  <li>• Sosyoekonomik faktörlerin okulu bırakma üzerindeki etkisi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-400 mb-2">Öneriler</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Erken uyarı sistemlerinin geliştirilmesi</li>
                  <li>• Akademik destek programlarının artırılması</li>
                  <li>• Burs ve finansal destek olanaklarının genişletilmesi</li>
                  <li>• Öğrenci mentörlük programlarının oluşturulması</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 