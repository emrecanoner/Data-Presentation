'use client'
import { useEffect, useState } from 'react'
import { PROJECT_DATA } from '@/app/constants/projectData'
import { fetchDatasetStats } from '@/app/utils/dataProcessor'
import { FiUsers, FiBarChart2, FiUserMinus, FiUserCheck, 
         FiAward, FiGlobe, FiCalendar, FiUser } from 'react-icons/fi'

type Stats = {
  studentCount: number;
  variableCount: number;
  dropoutCount: number;
  graduateCount: number;
  scholarshipCount: number;
  internationalCount: number;
  semesterCount: number;
  averageAge: number;
}

const ICONS = {
  students: FiUsers,
  variables: FiBarChart2,
  dropout: FiUserMinus,
  graduate: FiUserCheck,
  scholarship: FiAward,
  international: FiGlobe,
  semester: FiCalendar,
  age: FiUser
};

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatasetStats()
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) return (
    <div className="flex justify-center items-center py-20">
      <div className="text-gray-400">Yükleniyor...</div>
    </div>
  );

  const statsData = [
    { id: 'students', value: stats.studentCount },
    { id: 'variables', value: stats.variableCount },
    { id: 'dropout', value: stats.dropoutCount },
    { id: 'graduate', value: stats.graduateCount },
    { id: 'scholarship', value: stats.scholarshipCount },
    { id: 'international', value: stats.internationalCount },
    { id: 'semester', value: stats.semesterCount },
    { id: 'age', value: stats.averageAge }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {statsData.map((stat) => {
        const Icon = ICONS[stat.id as keyof typeof ICONS];
        const colorClass = `text-${PROJECT_DATA.colors[stat.id as keyof typeof PROJECT_DATA.colors]}-400`;
        const label = PROJECT_DATA.statLabels[stat.id as keyof typeof PROJECT_DATA.statLabels];
        
        return (
          <div 
            key={stat.id}
            className="bg-gray-800/30 p-6 rounded-xl border border-gray-800 group"
          >
            <div className="w-12 h-12 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
            <div className={`text-3xl font-bold ${colorClass} mb-2`}>
              {stat.value.toLocaleString()}
            </div>
            <div className="text-gray-300 text-sm">{label}</div>
          </div>
        );
      })}
    </div>
  );
}