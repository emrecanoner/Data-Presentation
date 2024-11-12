'use client'
import { Card, Title, Text } from "@tremor/react"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

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
  if (!data) return null;

  const chartData = [
    {
      name: "Uluslararası",
      toplam: data.internationalCount,
      mezun: Math.round(data.internationalCount * (data.graduateCount / data.studentCount)),
      burslu: Math.round(data.internationalCount * (data.scholarshipCount / data.studentCount))
    },
    {
      name: "Yerel",
      toplam: data.studentCount - data.internationalCount,
      mezun: data.graduateCount - Math.round(data.internationalCount * (data.graduateCount / data.studentCount)),
      burslu: data.scholarshipCount - Math.round(data.internationalCount * (data.scholarshipCount / data.studentCount))
    }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Öğrenci Grubu Karşılaştırması</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Uluslararası ve yerel öğrenci dağılımı
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              type="category"
              dataKey="name"
              stroke="#9ca3af"
              tick={{ 
                fill: '#9ca3af',
                fontSize: '14px',
                fontWeight: '500'
              }}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '0.375rem'
              }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
            />
            <Bar 
              dataKey="toplam" 
              name="Toplam" 
              fill="#06b6d4" 
              radius={[0, 4, 4, 0]}
            />
            <Bar 
              dataKey="mezun" 
              name="Mezun" 
              fill="#0ea5e9" 
              radius={[0, 4, 4, 0]}
            />
            <Bar 
              dataKey="burslu" 
              name="Burslu" 
              fill="#3b82f6" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 