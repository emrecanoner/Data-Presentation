import { StudentData } from '../types/analytics';

export class DataProcessor {
  private data: StudentData[];

  constructor(data: StudentData[]) {
    this.data = data;
  }

  public getBasicStats() {
    return {
      totalStudents: this.data.length,
      dropouts: this.data.filter(s => s.Target === 'Dropout').length,
      graduates: this.data.filter(s => s.Target === 'Graduate').length,
      scholarships: this.data.filter(s => s['Scholarship holder'] === '1').length,
      international: this.data.filter(s => s['International'] === '1').length,
      averageAge: Number((this.data.reduce((acc, s) => 
        acc + parseInt(s['Age at enrollment']), 0) / this.data.length).toFixed(1))
    };
  }

  public getMaritalStatusAnalysis() {
    const statusGroups = new Map<string, { total: number; success: number }>();

    this.data.forEach(student => {
      const status = this.getMaritalStatus(student['Marital status']);
      if (!statusGroups.has(status)) {
        statusGroups.set(status, { total: 0, success: 0 });
      }
      const group = statusGroups.get(status)!;
      group.total++;
      if (student.Target === 'Graduate') {
        group.success++;
      }
    });

    return {
      data: Array.from(statusGroups.entries()).map(([status, stats]) => ({
        status,
        successRate: Number(((stats.success / stats.total) * 100).toFixed(1)),
        totalStudents: stats.total
      }))
    };
  }

  public getEducationLevelAnalysis() {
    const levelGroups = new Map<string, { total: number; success: number }>();

    this.data.forEach(student => {
      const level = this.getEducationLevel(student['Previous qualification']);
      if (!levelGroups.has(level)) {
        levelGroups.set(level, { total: 0, success: 0 });
      }
      const group = levelGroups.get(level)!;
      group.total++;
      if (student.Target === 'Graduate') {
        group.success++;
      }
    });

    return {
      data: Array.from(levelGroups.entries()).map(([level, stats]) => ({
        level,
        successRate: Number(((stats.success / stats.total) * 100).toFixed(1)),
        totalStudents: stats.total
      }))
    };
  }

  public getEconomicFactorsAnalysis() {
    const economicData = this.data.map(student => ({
      unemployment: parseFloat(student['Unemployment rate']),
      isDropout: student.Target === 'Dropout'
    }));

    // İşsizlik oranı aralıklarını belirleme
    const ranges = [0, 5, 10, 15, 20, 25];
    const categories = ranges.slice(0, -1).map((min, i) => {
      const max = ranges[i + 1];
      const studentsInRange = economicData.filter(
        d => d.unemployment >= min && d.unemployment < max
      );
      
      return {
        category: `${min}-${max}%`,
        dropoutRate: Number(
          (studentsInRange.filter(s => s.isDropout).length / 
          studentsInRange.length * 100).toFixed(1)
        )
      };
    });

    return { data: categories };
  }

  public getAttendanceCorrelation() {
    const examCounts = new Map<number, {
      grades: number[];
      graduates: number;
      total: number;
    }>();

    this.data.forEach(student => {
      const examCount = parseInt(student['Curricular units 1st sem (evaluations)']);
      const grade = parseFloat(student['Curricular units 1st sem (grade)']);
      
      if (!examCounts.has(examCount)) {
        examCounts.set(examCount, {
          grades: [],
          graduates: 0,
          total: 0
        });
      }

      const stats = examCounts.get(examCount)!;
      if (!isNaN(grade)) {
        stats.grades.push(grade);
      }
      stats.total++;
      if (student.Target === 'Graduate') {
        stats.graduates++;
      }
    });

    return {
      data: Array.from(examCounts.entries())
        .map(([examCount, stats]) => ({
          examCount,
          averageGrade: Number((stats.grades.reduce((a, b) => a + b, 0) / 
            stats.grades.length).toFixed(1)),
          graduationRate: Number((stats.graduates / stats.total * 100).toFixed(1))
        }))
        .sort((a, b) => a.examCount - b.examCount)
    };
  }

  private getMaritalStatus(code: string): string {
    const statuses: Record<string, string> = {
      '1': 'Bekar',
      '2': 'Evli',
      '3': 'Dul',
      '4': 'Boşanmış',
      '5': 'Birlikte Yaşıyor',
      '6': 'Yasal Ayrı'
    };
    return statuses[code] || 'Diğer';
  }

  private getEducationLevel(code: string): string {
    const levels: Record<string, string> = {
      '1': 'Lise',
      '2': 'Lisans',
      '3': 'Yüksek Lisans',
      '4': 'Doktora'
    };
    return levels[code] || 'Diğer';
  }
}