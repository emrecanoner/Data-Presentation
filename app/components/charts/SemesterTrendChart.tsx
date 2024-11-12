'use client'
import { Card, Title, Text } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  if (!data) return null;

  // Daha basit ve anlaşılır dönem verisi
  const semesterData = [
    {
      name: "1. Dönem",
      aktifÖğrenci: data.studentCount,
      bırakanÖğrenci: 0
    },
    {
      name: "2. Dönem",
      aktifÖğrenci: Math.round(data.studentCount * 0.9),
      bırakanÖğrenci: Math.round(data.dropoutCount * 0.3)
    },
    {
      name: "3. Dönem",
      aktifÖğrenci: Math.round(data.studentCount * 0.8),
      bırakanÖğrenci: Math.round(data.dropoutCount * 0.6)
    },
    {
      name: "4. Dönem",
      aktifÖğrenci: Math.round(data.studentCount * 0.7),
      bırakanÖğrenci: data.dropoutCount
    }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Dönemsel Öğrenci Durumu</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Dönemlere göre aktif ve ayrılan öğrenci sayıları
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={semesterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
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
            <Bar 
              dataKey="aktifÖğrenci" 
              name="Aktif Öğrenci" 
              fill="#06b6d4" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="bırakanÖğrenci" 
              name="Bırakan Öğrenci" 
              fill="#f43f5e" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 