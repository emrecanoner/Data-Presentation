'use client'
import { useState, useEffect } from 'react';
import { PROJECT_DATA } from '@/app/constants/projectData'
import { StatsSection } from '@/app/components/statsSection'
import SummarySection from '@/app/components/summarySection'
import { MethodologySection } from '@/app/components/methodologySection'
import { AnalysisSection } from './components/analysisSection'
import { fetchDatasetStats } from './utils/dataProcessor';
import { LiteratureSection } from './components/literatureSection';
import { ThanksSection } from './components/thanksSection';

export default function Home() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchDatasetStats();
      setStats(data);
    };
    
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {PROJECT_DATA.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {PROJECT_DATA.description}
            </p>

            <div className="flex items-center justify-center space-x-6">
              <a 
                href="#methodology"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white font-medium rounded-xl hover:opacity-90 transition-opacity
                  shadow-lg shadow-blue-500/25"
              >
                Metodoloji
              </a>
              <a 
                href="#literature"
                className="px-8 py-4 bg-gray-800/50 text-white font-medium rounded-xl 
                  hover:bg-gray-700/50 transition-colors border border-gray-700"
              >
                Literatür
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <StatsSection />
          </div>
        </div>
      </section>

      {/* Araştırma Kapsamı */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Araştırma Kapsamı</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Metodoloji Kartı */}
              <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Metodoloji</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium mb-1">Zamansal Veri Analizi</h4>
                      <p className="text-sm text-gray-400">Öğrenci performans değişimlerinin dönemsel olarak incelenmesi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium mb-1">İstatistiksel Modelleme</h4>
                      <p className="text-sm text-gray-400">Çok değişkenli analiz ve korelasyon çalışmaları</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium mb-1">Tahmin Algoritmaları</h4>
                      <p className="text-sm text-gray-400">Makine öğrenmesi tabanlı tahmin modellerinin geliştirilmesi</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Araştırma Hedefleri Kartı */}
              <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Araştırma Hedefleri</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium mb-1">Faktör Analizi</h4>
                      <p className="text-sm text-gray-400">Akademik başarıyı etkileyen temel faktörlerin belirlenmesi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium mb-1">Model Geliştirme</h4>
                      <p className="text-sm text-gray-400">Zamansal tahmin modelinin oluşturulması ve test edilmesi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium mb-1">Literatür Katkısı</h4>
                      <p className="text-sm text-gray-400">Yeni bir yaklaşım ile literatüre katkı sağlanması</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SummarySection />
      <AnalysisSection />
      <MethodologySection />
      <LiteratureSection />
      <ThanksSection />
    </div>
  )
}