'use client'
import { Card, Title, Text } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  students: Array<{
    'Curricular units 1st sem (grade)': string;
    'Target': string;
  }>;
};

export function AcademicDistributionChart({ students }: Props) {
  if (!students || !Array.isArray(students)) {
    console.log('Invalid students data:', students);
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Not Dağılımı</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  // Not aralıklarına göre dağılım
  const gradeRanges = [
    { min: 0, max: 10, label: '0-10' },
    { min: 11, max: 12, label: '11-12' },
    { min: 13, max: 14, label: '13-14' },
    { min: 15, max: 16, label: '15-16' },
    { min: 17, max: 20, label: '17-20' }
  ];

  const gradeData = gradeRanges.map(range => ({
    range: range.label,
    mezun: students.filter(s => 
      s['Target'] === 'Graduate' && 
      Number(s['Curricular units 1st sem (grade)']) >= range.min && 
      Number(s['Curricular units 1st sem (grade)']) <= range.max
    ).length,
    bırakan: students.filter(s => 
      s['Target'] === 'Dropout' && 
      Number(s['Curricular units 1st sem (grade)']) >= range.min && 
      Number(s['Curricular units 1st sem (grade)']) <= range.max
    ).length
  }));

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Not Dağılımı</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Not aralıklarına göre öğrenci dağılımı
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gradeData}>
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
              itemStyle={{ color: '#9ca3af' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Legend />
            <Bar 
              dataKey="mezun" 
              name="Mezun" 
              fill="#06b6d4" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="bırakan" 
              name="Bırakan" 
              fill="#f43f5e" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 