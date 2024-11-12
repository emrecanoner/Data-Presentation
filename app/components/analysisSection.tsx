'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchDatasetStats } from '../utils/dataProcessor';

const AcademicPerformanceChart = dynamic(
  () => import('./charts/AcademicPerformanceChart').then(mod => mod.AcademicPerformanceChart),
  { ssr: false }
);

export function AnalysisSection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatasetStats()
      .then(data => {
        console.log('API Response:', data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  if (!data) return null;

  console.log('Chart Data:', {
    scholarshipCount: data.scholarshipCount,
    graduateCount: data.graduateCount,
    dropoutCount: data.dropoutCount,
    studentCount: data.studentCount
  });

  return (
    <section id="data-analysis" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-100">
          Akademik Başarı Analizi
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Öğrenci Başarısını Etkileyen Faktörler
        </p>

        <AcademicPerformanceChart stats={data} />
      </div>
    </section>
  );
}