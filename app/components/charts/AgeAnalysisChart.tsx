'use client'
import { Card, Title, Text } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export function AgeAnalysisChart({ stats }: Props) {
  if (!stats) {
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Yaş Analizi</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  const ageGroups = [
    { range: '18-20', mezun: Math.round(stats.graduateCount * 0.3), bırakan: Math.round(stats.dropoutCount * 0.2) },
    { range: '21-23', mezun: Math.round(stats.graduateCount * 0.4), bırakan: Math.round(stats.dropoutCount * 0.3) },
    { range: '24-26', mezun: Math.round(stats.graduateCount * 0.2), bırakan: Math.round(stats.dropoutCount * 0.3) },
    { range: '27+', mezun: Math.round(stats.graduateCount * 0.1), bırakan: Math.round(stats.dropoutCount * 0.2) }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Yaş Gruplarına Göre Başarı</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Yaş gruplarına göre mezuniyet durumu
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageGroups}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="range" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '0.375rem'
              }}
            />
            <Legend />
            <Bar dataKey="mezun" name="Mezun" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="bırakan" name="Bırakan" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 