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
    const fetchData = async () => {
      try {
        const response = await fetch('/RealTimeStudentSuccessPredictionSystem/stats.json');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <GenderSuccessChart stats={data} />
          <ScholarshipPerformanceChart stats={data} />
          <AttendanceAnalysisChart stats={data} />
          <CourseSuccessRateChart stats={data} />
          <AcademicDistributionChart stats={data} />
          <AgeAnalysisChart stats={data} />
          <InternationalComparisonChart stats={data} />
          <SemesterTrendChart stats={data} />
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