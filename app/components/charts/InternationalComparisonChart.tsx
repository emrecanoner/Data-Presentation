'use client'
import { Card, Title, Text } from "@tremor/react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  data: {
    averageAge: number;
    dropoutCount: number;
    graduateCount: number;
    internationalCount: number;
    scholarshipCount: number;
    semesterCount: number;
    studentCount: number;
    variableCount: number;
  };
};

export function InternationalComparisonChart({ data }: Props) {
  if (!data) {
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Uluslararası/Yerel Karşılaştırma</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  const comparisonData = [
    {
      metric: 'Mezuniyet Oranı',
      uluslararası: Number(((data.graduateCount / data.studentCount) * 100).toFixed(1)),
      yerel: Number(((data.graduateCount / (data.studentCount - data.internationalCount)) * 100).toFixed(1))
    },
    {
      metric: 'Burslu Oranı',
      uluslararası: Number(((data.scholarshipCount / data.internationalCount) * 100).toFixed(1)),
      yerel: Number(((data.scholarshipCount / (data.studentCount - data.internationalCount)) * 100).toFixed(1))
    },
    {
      metric: 'Ortalama Yaş',
      uluslararası: data.averageAge + 1,
      yerel: data.averageAge
    },
    {
      metric: 'Dönem Başarısı',
      uluslararası: Number(((data.graduateCount / data.internationalCount) * data.semesterCount).toFixed(1)),
      yerel: Number(((data.graduateCount / (data.studentCount - data.internationalCount)) * data.semesterCount).toFixed(1))
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