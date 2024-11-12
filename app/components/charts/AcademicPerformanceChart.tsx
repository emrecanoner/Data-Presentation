'use client'
import { Card, Title, Text } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type ChartProps = {
  stats: {
    scholarshipCount: number;
    graduateCount: number;
    dropoutCount: number;
    studentCount: number;
  };
};

export function AcademicPerformanceChart({ stats }: ChartProps) {
  // Veri hazırlığı
  const chartData = [
    {
      name: "Burslu Öğrenciler",
      Mezun: Math.round(stats.scholarshipCount * (stats.graduateCount / stats.studentCount)),
      Bırakan: stats.scholarshipCount - Math.round(stats.scholarshipCount * (stats.graduateCount / stats.studentCount))
    },
    {
      name: "Burssuz Öğrenciler",
      Mezun: stats.graduateCount - Math.round(stats.scholarshipCount * (stats.graduateCount / stats.studentCount)),
      Bırakan: (stats.studentCount - stats.scholarshipCount) - (stats.graduateCount - Math.round(stats.scholarshipCount * (stats.graduateCount / stats.studentCount)))
    }
  ];

  const COLORS = ['#06b6d4', '#f43f5e', '#0ea5e9', '#ec4899'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50 shadow-xl">
          <p className="text-gray-300 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} öğrenci
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <div className="space-y-1 mb-6">
          <Title className="text-gray-100 text-lg">Öğrenci Dağılımı</Title>
          <Text className="text-gray-400 text-xs">
            Burs durumuna göre mezuniyet analizi
          </Text>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                  color: "#9ca3af"
                }}
              />
              <Bar dataKey="Mezun" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Bırakan" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie Chart */}
      <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <div className="space-y-1 mb-6">
          <Title className="text-gray-100 text-lg">Genel Dağılım</Title>
          <Text className="text-gray-400 text-xs">
            Tüm öğrencilerin durumu
          </Text>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Burslu Mezun', value: chartData[0].Mezun },
                  { name: 'Burslu Bırakan', value: chartData[0].Bırakan },
                  { name: 'Burssuz Mezun', value: chartData[1].Mezun },
                  { name: 'Burssuz Bırakan', value: chartData[1].Bırakan }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                  color: "#9ca3af"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Stats Grid */}
      <Card className="col-span-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-1">
            <Text className="text-gray-400 text-xs">Toplam Öğrenci</Text>
            <Text className="text-gray-100 text-2xl font-semibold">
              {stats.studentCount}
            </Text>
          </div>
          <div className="space-y-1">
            <Text className="text-gray-400 text-xs">Burslu Öğrenci</Text>
            <Text className="text-gray-100 text-2xl font-semibold">
              {stats.scholarshipCount}
            </Text>
          </div>
          <div className="space-y-1">
            <Text className="text-gray-400 text-xs">Mezun Olan</Text>
            <Text className="text-gray-100 text-2xl font-semibold">
              {stats.graduateCount}
            </Text>
          </div>
          <div className="space-y-1">
            <Text className="text-gray-400 text-xs">Bırakan</Text>
            <Text className="text-gray-100 text-2xl font-semibold">
              {stats.dropoutCount}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
} 