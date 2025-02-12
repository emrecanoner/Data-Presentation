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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        const response = await fetch('/student-success-prediction-system/stats.json');
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

        <div className="mb-12">
          <Tabs defaultValue="grades" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/30">
              <TabsTrigger 
                value="grades" 
                className="data-[state=active]"
              >
                Not Analizi
              </TabsTrigger>
              <TabsTrigger 
                value="zero-grades"
                className="data-[state=active]"
              >
                Sıfır Not Analizi
              </TabsTrigger>
              <TabsTrigger 
                value="marital-gdp"
                className="data-[state=active]"
              >
                Medeni Durum ve GDP
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grades">
              <Card className="border-gray-300 bg-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-gray-100">Dönem Not Ortalamaları Analizi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Mezuniyet Durumuna Göre Ortalamalar:</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-white">Mezun</span>
                          <span className="font-semibold text-green-400">13.2</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-white">Kayıtlı</span>
                          <span className="font-semibold text-yellow-400">11.8</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-white">Bırakan</span>
                          <span className="font-semibold text-red-400">5.9</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zero-grades">
              <Card className="border-gray-700 bg-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-gray-100">Sıfır Not ile Mezuniyet Analizi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-white">
                      Sıfır not ile mezun olan öğrencilerin özel durumları:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="text-white">Kredi transferi yapan öğrenciler (Curricular units credited greater than 0)</li>
                      <li className="text-white">Yatay geçiş yapan öğrenciler (Application mode: 42 - Transfer)</li>
                      <li className="text-white">Önceki yükseköğrenim deneyimi olanlar (Previous qualification: 2,3,4,5)</li>
                      <li className="text-white">Uluslararası değişim öğrencileri (International: 1)</li>
                      <li className="text-white">Özel eğitim ihtiyacı olan öğrenciler (Educational special needs: 1)</li>
                    </ul>
                    <p className="text-sm text-gray-400 mt-4">
                      Not: Bu öğrencilerin notları genellikle muafiyet, transfer veya özel değerlendirme süreçleri sonucunda işlenmektedir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marital-gdp">
              <Card className="border-gray-300 bg-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-gray-100">Medeni Durum ve GDP İlişkisi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-white">Medeni Durum Dağılımı</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-white" >Bekar</span>
                            <span className="font-semibold text-green-400">%85+</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-white">Evli</span>
                            <span className="font-semibold text-yellow-400">%12</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-white">Diğer</span>
                            <span className="font-semibold text-red-400">%3</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-white">GDP İlişkisi</h4>
                        <p className="text-sm text-gray-400">
                          Medeni duruma göre GDP değerleri arasında anlamlı bir farklılık gözlenmemiştir.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

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