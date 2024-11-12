'use client'
import { Card, Title, Text } from "@tremor/react"
import { BarChart, Bar, Cell, Tooltip, Legend, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';

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

export function CourseSuccessRateChart({ data }: Props) {
  if (!data) {
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Ders Başarı Oranları</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  // Farklı kategorilerdeki başarı oranları
  const chartData = [
    {
      name: "Genel Başarı",
      oran: Number(((data.graduateCount / data.studentCount) * 100).toFixed(1))
    },
    {
      name: "Burslu Başarı",
      oran: Number(((data.scholarshipCount / data.studentCount) * 100).toFixed(1))
    },
    {
      name: "Uluslararası Başarı",
      oran: Number(((data.internationalCount / data.studentCount) * 100).toFixed(1))
    }
  ];

  const COLORS = ['#06b6d4', '#0ea5e9', '#3b82f6'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700/50">
          <p className="text-gray-300">{payload[0].payload.name}</p>
          <p className="text-gray-300">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Başarı Oranları</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Farklı kategorilerde başarı yüzdeleri
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              domain={[0, 100]}
              label={{ 
                value: 'Başarı Oranı (%)', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#9ca3af'
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="oran" 
              fill="#06b6d4"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 