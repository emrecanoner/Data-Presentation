'use client'
import { Card, Title, Text } from "@tremor/react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  students: Array<{
    'International': string;
    'Target': string;
    'Curricular units 1st sem (grade)': string;
    'Scholarship holder': string;
    'Curricular units 1st sem (approved)': string;
  }>;
};

export function InternationalComparisonChart({ students }: Props) {
  if (!students || !Array.isArray(students)) {
    console.log('Invalid students data:', students);
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Uluslararası/Yerel Karşılaştırma</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  // Metrik hesaplama fonksiyonu
  const calculateMetrics = (studentGroup: any[]) => ({
    mezuniyetOranı: (studentGroup.filter(s => s['Target'] === 'Graduate').length / studentGroup.length * 100).toFixed(1),
    ortalamaNotlar: (studentGroup.reduce((acc, s) => acc + Number(s['Curricular units 1st sem (grade)']), 0) / studentGroup.length).toFixed(1),
    bursluOranı: (studentGroup.filter(s => s['Scholarship holder'] === '1').length / studentGroup.length * 100).toFixed(1),
    devamlılık: (studentGroup.reduce((acc, s) => acc + Number(s['Curricular units 1st sem (approved)']), 0) / studentGroup.length).toFixed(1)
  });

  const internationalStudents = students.filter(s => s['International'] === '1');
  const localStudents = students.filter(s => s['International'] === '0');

  const metrics = {
    international: calculateMetrics(internationalStudents),
    local: calculateMetrics(localStudents)
  };

  const comparisonData = [
    {
      metric: 'Mezuniyet Oranı',
      uluslararası: Number(metrics.international.mezuniyetOranı),
      yerel: Number(metrics.local.mezuniyetOranı)
    },
    {
      metric: 'Ortalama Not',
      uluslararası: Number(metrics.international.ortalamaNotlar),
      yerel: Number(metrics.local.ortalamaNotlar)
    },
    {
      metric: 'Burslu Oranı',
      uluslararası: Number(metrics.international.bursluOranı),
      yerel: Number(metrics.local.bursluOranı)
    },
    {
      metric: 'Devamlılık',
      uluslararası: Number(metrics.international.devamlılık),
      yerel: Number(metrics.local.devamlılık)
    }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Uluslararası/Yerel Karşılaştırma</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Öğrenci grupları arasındaki performans karşılaştırması
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={comparisonData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="metric" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <PolarRadiusAxis stroke="#9ca3af" />
            <Radar
              name="Uluslararası"
              dataKey="uluslararası"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.3}
            />
            <Radar
              name="Yerel"
              dataKey="yerel"
              stroke="#f43f5e"
              fill="#f43f5e"
              fillOpacity={0.3}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 