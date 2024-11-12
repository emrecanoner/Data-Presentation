'use client'
import { Card, Title, Text } from "@tremor/react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  stats: {
    data: any[];  // API'den gelen ham veri
    // ... diğer istatistikler
  };
};

export function AgeAnalysisChart({ stats }: Props) {
  console.log('AgeAnalysis Stats:', stats);
  
  if (!stats?.data) {
    console.log('Missing data in stats:', stats);
    return (
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <Title className="text-gray-100 text-lg">Yaş ve Başarı İlişkisi</Title>
        <Text className="text-gray-400 text-xs">Veri yükleniyor veya bulunamadı</Text>
      </Card>
    );
  }

  // Yaş gruplarına göre başarı dağılımı
  const ageData = stats.data.map(student => ({
    age: parseInt(student['Age at enrollment']),
    success: student['Target'] === 'Graduate' ? 1 : 0,
    group: student['Scholarship holder'] === '1' ? 'Burslu' : 'Burssuz'
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700/50">
          <p className="text-gray-300">Yaş: {payload[0].payload.age}</p>
          <p className="text-gray-300">Durum: {payload[0].payload.success ? 'Mezun' : 'Bıraktı'}</p>
          <p className="text-gray-300">Grup: {payload[0].payload.group}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
      <Title className="text-gray-100 text-lg">Yaş ve Başarı İlişkisi</Title>
      <Text className="text-gray-400 text-xs mb-6">
        Yaş gruplarına göre mezuniyet durumu
      </Text>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="age" 
              name="Yaş" 
              stroke="#9ca3af"
              label={{ value: 'Yaş', position: 'bottom', fill: '#9ca3af' }}
            />
            <YAxis 
              dataKey="success" 
              name="Başarı" 
              stroke="#9ca3af"
              label={{ value: 'Mezuniyet Durumu', angle: -90, position: 'left', fill: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter name="Burslu" data={ageData.filter(d => d.group === 'Burslu')} fill="#06b6d4" />
            <Scatter name="Burssuz" data={ageData.filter(d => d.group === 'Burssuz')} fill="#f43f5e" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 