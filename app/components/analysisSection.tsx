'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchDatasetStats } from '../utils/dataProcessor';
import { GenderSuccessChart } from './charts/GenderSuccessChart';
import { ScholarshipPerformanceChart } from './charts/ScholarshipPerformanceChart';
import { AttendanceAnalysisChart } from './charts/AttendanceAnalysisChart';
import { CourseSuccessRateChart } from './charts/CourseSuccessRateChart';
import { SemesterTrendChart } from './charts/SemesterTrendChart';
import { InternationalComparisonChart } from './charts/InternationalComparisonChart';
import { AgeAnalysisChart } from './charts/AgeAnalysisChart';
import { AcademicDistributionChart } from './charts/AcademicDistributionChart';

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
        console.log('Ham veri:', data);
        console.log('data.data:', data.data);
        console.log('Veri tipi:', typeof data);
        console.log('data.data tipi:', typeof data.data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  console.log('Render sırasında data:', data);

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

        <div className="mb-6">
          <AcademicPerformanceChart stats={data} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <GenderSuccessChart data={data} />
          <ScholarshipPerformanceChart data={data} />
          <AttendanceAnalysisChart data={data} />
          <CourseSuccessRateChart data={data} />
          <SemesterTrendChart data={data} />
          <InternationalComparisonChart data={data} />
          <AgeAnalysisChart data={data} />
          <AcademicDistributionChart data={data} />
        </div>

        <div className="mb-6">
          <pre className="text-white">
            {JSON.stringify(data?.data, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}