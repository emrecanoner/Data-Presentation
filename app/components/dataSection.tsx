'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnalyticsResponse } from '../types/analytics';
import { BasicStats } from './charts/basicStats';
import { MaritalStatusChart } from './charts/maritalStatusChart';
import { EducationLevelChart } from './charts/EducationLevelChart';
import { EconomicFactorsChart } from './charts/EconomicFactorsChart';
import { AttendanceCorrelationChart } from './charts/AttendanceCorrelationChart';
import { AIPredictionSection } from './AIPredictionSection';

// Recharts bileşenlerini dinamik olarak import et
const DynamicBarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const DynamicCartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });

export function DataSection() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // CSV dosyasını doğrudan fetch edelim
        const response = await fetch('/data/data.csv');
        if (!response.ok) {
          throw new Error('Veri yüklenirken bir hata oluştu');
        }
        const csvText = await response.text();
        
        // CSV'yi işleyip AnalyticsResponse formatına dönüştürelim
        const processedData = processCSVData(csvText);
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage message={error || 'Veri bulunamadı'} />;
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Temel İstatistikler */}
        <BasicStats data={data.basicStats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Medeni Durum Analizi */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <MaritalStatusChart data={data.maritalStatus} />
          </div>

          {/* Eğitim Seviyesi Analizi */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <EducationLevelChart data={data.educationLevel} />
          </div>

          {/* Ekonomik Faktörler */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <EconomicFactorsChart data={data.economicFactors} />
          </div>

          {/* Devam-Başarı İlişkisi */}
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
            <AttendanceCorrelationChart data={data.attendanceCorrelation} />
          </div>
        </div>

        {/* AI Tahmin Sonuçları */}
        <div className="mt-12">
          <AIPredictionSection/>
        </div>
      </div>
    </section>
  );
}