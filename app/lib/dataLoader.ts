import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { StudentData } from '../types/analytics';

export class DataLoader {
  private static instance: DataLoader;
  private cachedData: StudentData[] | null = null;

  private constructor() {}

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  public async loadData(): Promise<StudentData[]> {
    if (this.cachedData) {
      return this.cachedData;
    }

    try {
      const csvPath = path.join(process.cwd(), 'data', 'data.csv');
      const fileContent = fs.readFileSync(csvPath, 'utf-8');
      
      const { data, errors } = Papa.parse<StudentData>(fileContent, {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
        transform: (value) => {
          // Boş string kontrolü
          if (value === '') return '0';
          return value;
        }
      });

      if (errors.length > 0) {
        console.warn('CSV parse warnings:', errors);
      }

      // Veri doğrulama
      const validatedData = this.validateData(data);
      this.cachedData = validatedData;
      
      return validatedData;

    } catch (error) {
      console.error('Data loading error:', error);
      throw new Error('Failed to load student data');
    }
  }

  private validateData(data: StudentData[]): StudentData[] {
    return data.filter(student => {
      // Gerekli alanların kontrolü
      const requiredFields = [
        'Age at enrollment',
        'Curricular units 1st sem (grade)',
        'Curricular units 2nd sem (grade)',
        'Target'
      ];

      const hasAllFields = requiredFields.every(field => {
        const value = student[field as keyof StudentData];
        return value !== undefined && value !== null && value !== '';
      });

      // Sayısal değerlerin kontrolü
      const isValidAge = !isNaN(Number(student['Age at enrollment']));
      const isValidGrade1 = !isNaN(Number(student['Curricular units 1st sem (grade)']));
      const isValidGrade2 = !isNaN(Number(student['Curricular units 2nd sem (grade)']));
      const isValidTarget = ['Graduate', 'Dropout'].includes(student.Target);

      return hasAllFields && isValidAge && isValidGrade1 && isValidGrade2 && isValidTarget;
    });
  }

  public async getDataStats(): Promise<{
    total: number;
    valid: number;
    invalid: number;
    graduates: number;
    dropouts: number;
  }> {
    const data = await this.loadData();
    
    return {
      total: data.length,
      valid: data.filter(s => this.isValidStudent(s)).length,
      invalid: data.filter(s => !this.isValidStudent(s)).length,
      graduates: data.filter(s => s.Target === 'Graduate').length,
      dropouts: data.filter(s => s.Target === 'Dropout').length
    };
  }

  private isValidStudent(student: StudentData): boolean {
    return (
      !isNaN(Number(student['Age at enrollment'])) &&
      !isNaN(Number(student['Curricular units 1st sem (grade)'])) &&
      !isNaN(Number(student['Curricular units 2nd sem (grade)'])) &&
      ['Graduate', 'Dropout'].includes(student.Target)
    );
  }

  public clearCache(): void {
    this.cachedData = null;
  }
}

// Export singleton instance
export const dataLoader = DataLoader.getInstance();

// Helper function for direct data loading
export async function loadData(): Promise<StudentData[]> {
  return await dataLoader.loadData();
}

// Helper function for data stats
export async function getDataStats() {
  return await dataLoader.getDataStats();
} 