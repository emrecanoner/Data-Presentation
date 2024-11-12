export interface StudentData {
  'Marital status': string;
  'Application mode': string;
  'Application order': string;
  'Course': string;
  'Daytime/evening attendance': string;
  'Previous qualification': string;
  'Nationality': string;
  'Mother\'s qualification': string;
  'Father\'s qualification': string;
  'Mother\'s occupation': string;
  'Father\'s occupation': string;
  'Admission grade': string;
  'Displaced': string;
  'Educational special needs': string;
  'Debtor': string;
  'Tuition fees up to date': string;
  'Gender': string;
  'Scholarship holder': string;
  'Age at enrollment': string;
  'International': string;
  'Curricular units 1st sem (enrolled)': string;
  'Curricular units 1st sem (evaluations)': string;
  'Curricular units 1st sem (approved)': string;
  'Curricular units 1st sem (grade)': string;
  'Curricular units 2nd sem (enrolled)': string;
  'Curricular units 2nd sem (evaluations)': string;
  'Curricular units 2nd sem (approved)': string;
  'Curricular units 2nd sem (grade)': string;
  'Unemployment rate': string;
  'Inflation rate': string;
  'GDP': string;
  'Target': 'Dropout' | 'Enrolled' | 'Graduate';
}

export interface DatasetStats {
  studentCount: number;
  variableCount: number;
  dropoutCount: number;
  graduateCount: number;
  scholarshipCount: number;
  internationalCount: number;
  semesterCount: number;
  averageAge: number;
}