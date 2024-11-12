'use client'
import { Card, Title, Text } from "@tremor/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  stats: {
    rawData: any[]; // Ham veri array'i
    semesterStats: {
      semester: number;
      totalStudents: number;
      graduateCount: number;
    }[];
  };
};

export function SemesterTrendChart({ stats }: Props) {
  if (!stats?.rawData) {
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Dönemsel Başarı Trendi</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor...</Text>
      </Card>
    );
  }

  // Dönemlere göre başarı oranı
  const semesterData = Array.from({ length: 6 }, (_, i) => {
    const semester = i + 1;
    const studentsInSemester = stats.rawData.filter(s => 
      s['Curricular units 1st sem (approved)'] >= semester
    );
    const graduatesInSemester = studentsInSemester.filter(s => 
      s['Target'] === 'Graduate'
    );
    
    return {
      semester: `${semester}. Dönem`,
      başarıOranı: Number((graduatesInSemester.length / studentsInSemester.length * 100).toFixed(1)),
      öğrenciSayısı: studentsInSemester.length
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
            <Legend 
              wrapperStyle={{
                paddingTop: '1rem'
              }}
            />
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