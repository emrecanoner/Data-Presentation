import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

interface StudentData {
  'Marital status': string
  'Application mode': string
  'Course': string
  'Previous qualification': string
  'Nacionality': string
  'Mother\'s qualification': string
  'Father\'s qualification': string
  'Mother\'s occupation': string
  'Father\'s occupation': string
  'Displaced': string
  'Educational special needs': string
  'Debtor': string
  'Tuition fees up to date': string
  'Gender': string
  'Scholarship holder': string
  'Age at enrollment': string
  'International': string
  'Curricular units 1st sem (credited)': string
  'Curricular units 1st sem (enrolled)': string
  'Curricular units 1st sem (evaluations)': string
  'Curricular units 1st sem (approved)': string
  'Curricular units 1st sem (grade)': string
  'Curricular units 2nd sem (credited)': string
  'Curricular units 2nd sem (enrolled)': string
  'Curricular units 2nd sem (evaluations)': string
  'Curricular units 2nd sem (approved)': string
  'Curricular units 2nd sem (grade)': string
  'Unemployment rate': string
  'Inflation rate': string
  'GDP': string
  'Target': string
}

export function analyzeDataset() {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'data.csv')
    const fileContent = fs.readFileSync(csvPath, 'utf-8')
    
    const { data } = Papa.parse<StudentData>(fileContent, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true
    })

    return {
      dropoutByAge: calculateDropoutByAge(data),
      performanceByMaritalStatus: calculatePerformanceByMaritalStatus(data),
      admissionTrend: calculateAdmissionTrend(data),
      scholarshipImpact: calculateScholarshipImpact(data),
      statistics: calculateStatistics(data)
    }
  } catch (error) {
    console.error('Veri analizi hatası:', error)
    return getDefaultData()
  }
}

function calculateDropoutByAge(data: StudentData[]) {
  const ageGroups: { [key: string]: { total: number; dropout: number } } = {}
  
  data.forEach((student) => {
    const age = parseInt(student['Age at enrollment'])
    if (!ageGroups[age]) {
      ageGroups[age] = { total: 0, dropout: 0 }
    }
    ageGroups[age].total++
    if (student.Target === 'Dropout') {
      ageGroups[age].dropout++
    }
  })

  return Object.entries(ageGroups)
    .map(([age, stats]) => ({
      age: parseInt(age),
      dropoutRate: Number(((stats.dropout / stats.total) * 100).toFixed(1))
    }))
    .sort((a, b) => a.age - b.age)
}

function calculatePerformanceByMaritalStatus(data: StudentData[]) {
  const statusGroups: { [key: string]: { total: number; count: number } } = {
    'Evli': { total: 0, count: 0 },
    'Bekar': { total: 0, count: 0 }
  }
  
  data.forEach((student) => {
    const status = student['Marital status'] === '1' ? 'Evli' : 'Bekar'
    const grade = parseFloat(student['Curricular units 1st sem (grade)'])
    
    if (!isNaN(grade)) {
      statusGroups[status].total += grade
      statusGroups[status].count++
    }
  })

  return Object.entries(statusGroups)
    .map(([status, stats]) => ({
      name: status,
      value: Number((stats.total / stats.count).toFixed(1))
    }))
}

function calculateAdmissionTrend(data: StudentData[]) {
  const semesterGrades: { [key: string]: { total: number; count: number } } = {}
  
  data.forEach((student) => {
    const semester = student['Curricular units 1st sem (enrolled)']
    const grade = parseFloat(student['Curricular units 1st sem (grade)'])
    
    if (!isNaN(grade)) {
      if (!semesterGrades[semester]) {
        semesterGrades[semester] = { total: 0, count: 0 }
      }
      semesterGrades[semester].total += grade
      semesterGrades[semester].count++
    }
  })

  return Object.entries(semesterGrades)
    .map(([semester, stats]) => ({
      semester: parseInt(semester),
      score: Number((stats.total / stats.count).toFixed(1))
    }))
    .sort((a, b) => a.semester - b.semester)
}

function calculateScholarshipImpact(data: StudentData[]) {
  const semesterPerformance: { [key: string]: { 
    withScholarship: { total: number; count: number }
    withoutScholarship: { total: number; count: number }
  } } = {}

  data.forEach((student) => {
    const semester = student['Curricular units 1st sem (enrolled)']
    const grade = parseFloat(student['Curricular units 1st sem (grade)'])
    const hasScholarship = student['Scholarship holder'] === '1'

    if (!isNaN(grade)) {
      if (!semesterPerformance[semester]) {
        semesterPerformance[semester] = {
          withScholarship: { total: 0, count: 0 },
          withoutScholarship: { total: 0, count: 0 }
        }
      }

      if (hasScholarship) {
        semesterPerformance[semester].withScholarship.total += grade
        semesterPerformance[semester].withScholarship.count++
      } else {
        semesterPerformance[semester].withoutScholarship.total += grade
        semesterPerformance[semester].withoutScholarship.count++
      }
    }
  })

  return Object.entries(semesterPerformance)
    .map(([semester, stats]) => ({
      semester: parseInt(semester),
      withScholarship: Number((stats.withScholarship.total / stats.withScholarship.count).toFixed(1)) || 0,
      withoutScholarship: Number((stats.withoutScholarship.total / stats.withoutScholarship.count).toFixed(1)) || 0
    }))
    .sort((a, b) => a.semester - b.semester)
}

function calculateStatistics(data: StudentData[]) {
  let totalAge = 0
  let internationalCount = 0
  let scholarshipCount = 0
  let totalGrade = 0
  let graduateCount = 0
  let dropoutCount = 0
  let validGradeCount = 0

  data.forEach((student) => {
    // Yaş hesaplama
    const age = parseInt(student['Age at enrollment'])
    if (!isNaN(age)) totalAge += age

    // Uluslararası öğrenci sayısı
    if (student['International'] === '1') internationalCount++

    // Burslu öğrenci sayısı
    if (student['Scholarship holder'] === '1') scholarshipCount++

    // Not ortalaması
    const grade = parseFloat(student['Curricular units 1st sem (grade)'])
    if (!isNaN(grade)) {
      totalGrade += grade
      validGradeCount++
    }

    // Mezun/Dropout sayısı
    if (student.Target === 'Graduate') graduateCount++
    if (student.Target === 'Dropout') dropoutCount++
  })

  return {
    averageAge: Number((totalAge / data.length).toFixed(1)),
    internationalRate: Number(((internationalCount / data.length) * 100).toFixed(1)),
    scholarshipRate: Number(((scholarshipCount / data.length) * 100).toFixed(1)),
    averageScore: Number((totalGrade / validGradeCount).toFixed(1)),
    graduationRate: Number(((graduateCount / data.length) * 100).toFixed(1)),
    dropoutRate: Number(((dropoutCount / data.length) * 100).toFixed(1))
  }
}

function getDefaultData() {
  return {
    dropoutByAge: [],
    performanceByMaritalStatus: [],
    admissionTrend: [],
    scholarshipImpact: [],
    statistics: {
      averageAge: 0,
      internationalRate: 0,
      scholarshipRate: 0,
      averageScore: 0,
      graduationRate: 0,
      dropoutRate: 0
    }
  }
}