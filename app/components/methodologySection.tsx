'use client'
import { useEffect, useState } from 'react'
import { fetchDatasetStats } from '../utils/dataProcessor'

type MethodologyStats = {
  studentCount: number;
  graduateCount: number;
  dropoutCount: number;
  averageAge: number;
  scholarshipCount: number;
  internationalCount: number;
}

export function MethodologySection() {
  const [stats, setStats] = useState<MethodologyStats | null>(null)
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
        <h2 className="text-3xl font-bold text-center mb-12">Metodoloji ve Bulgular</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Akademik Başarı Analizi */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Akademik Başarı Oranları</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Mezuniyet Oranı</span>
                <span className="text-green-400 font-semibold">
                  {Math.round((stats.graduateCount / stats.studentCount) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Bırakma Oranı</span>
                <span className="text-red-400 font-semibold">
                  {Math.round((stats.dropoutCount / stats.studentCount) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Öğrenci Profili */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Öğrenci Profili</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ortalama Yaş</span>
                <span className="text-blue-400 font-semibold">{stats.averageAge}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Burslu Öğrenci Oranı</span>
                <span className="text-yellow-400 font-semibold">
                  {Math.round((stats.scholarshipCount / stats.studentCount) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Uluslararası Öğrenci Oranı</span>
                <span className="text-purple-400 font-semibold">
                  {Math.round((stats.internationalCount / stats.studentCount) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Metodoloji Açıklaması */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Araştırma Metodolojisi</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-blue-400">Veri Toplama</h4>
                <p className="text-gray-400 text-sm">
                  {stats.studentCount} öğrencinin akademik ve demografik verileri analiz edildi.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-purple-400">Analiz Yöntemi</h4>
                <p className="text-gray-400 text-sm">
                  İstatistiksel analiz ve korelasyon çalışmaları gerçekleştirildi.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-400">Sonuç Değerlendirme</h4>
                <p className="text-gray-400 text-sm">
                  Başarı faktörleri ve risk göstergeleri belirlendi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 