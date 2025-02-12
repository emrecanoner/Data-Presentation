import { StudentData } from '../types/analytics';

export async function fetchDatasetStats() {
  try {
    const response = await fetch('/student-success-prediction-system/stats.json');
    
    const stats = await response.json();
    
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      studentCount: 0,
      variableCount: 0,
      dropoutCount: 0,
      graduateCount: 0,
      scholarshipCount: 0,
      internationalCount: 0,
      semesterCount: 0,
      averageAge: 0
    };
  }
} 