'use client'
import { Card, Title, Text } from "@tremor/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export function SemesterTrendChart({ data }: Props) {
  if (!data) {
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Dönemsel Başarı Trendi</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  // Her dönem için yaklaşık başarı oranı hesaplama
  const semesterData = Array.from({ length: data.semesterCount }, (_, i) => {
    const semester = i + 1;
    const totalStudents = Math.round(data.studentCount * (1 - (i * 0.1))); // Her dönem %10 azalma
    const graduates = Math.round(data.graduateCount * (semester / data.semesterCount));
    
    return {
      semester: `${semester}. Dönem`,
      başarıOranı: Number(((graduates / totalStudents) * 100).toFixed(1)),
      öğrenciSayısı: totalStudents
    };
  });

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Dönemsel Başarı Trendi</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Dönemlere göre mezuniyet oranları
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={semesterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="semester" 
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
              labelStyle={{ color: '#9ca3af', marginBottom: '0.5rem' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="başarıOranı" 
              name="Başarı Oranı (%)"
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={{ fill: '#06b6d4', r: 4 }}
              activeDot={{ r: 6, fill: '#06b6d4' }}
            />
            <Line 
              type="monotone" 
              dataKey="öğrenciSayısı" 
              name="Öğrenci Sayısı"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={{ fill: '#f43f5e', r: 4 }}
              activeDot={{ r: 6, fill: '#f43f5e' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 