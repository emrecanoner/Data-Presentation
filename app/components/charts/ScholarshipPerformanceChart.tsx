'use client'
import { Card, Title, Text } from "@tremor/react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  stats: {
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

export function ScholarshipPerformanceChart({ stats }: Props) {
  if (!stats) {
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Burs Dağılımı</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  const chartData = [
    {
      name: "Burslu",
      value: stats.scholarshipCount
    },
    {
      name: "Burssuz",
      value: stats.studentCount - stats.scholarshipCount
    }
  ];

  const COLORS = ['#06b6d4', '#f43f5e'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700/50">
          <p className="text-gray-300">{payload[0].name}</p>
          <p className="text-gray-300">{`${payload[0].value} öğrenci`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Burs Dağılımı</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Burslu ve burssuz öğrenci sayıları
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 