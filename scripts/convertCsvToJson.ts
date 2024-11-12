const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const results: any[] = [];

fs.createReadStream(path.join(process.cwd(), 'data', 'data.csv'))
  .pipe(csv({ 
    separator: ';' // CSV ayırıcısını noktalı virgül olarak belirtiyoruz
  }))
  .on('data', (data: any) => {
    results.push(data);
  })
  .on('end', () => {
    const stats = calculateStats(results);
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'stats.json'),
      JSON.stringify(stats)
    );
    console.log('Stats generated successfully!');
  });

function calculateStats(data: any[]) {
  // Toplam öğrenci sayısı
  const studentCount = data.length;

  // Mezun ve bırakan öğrenci sayıları
  const graduateCount = data.filter(student => student.Target === 'Graduate').length;
  const dropoutCount = data.filter(student => student.Target === 'Dropout').length;

  // Burslu öğrenci sayısı
  const scholarshipCount = data.filter(student => student['Scholarship holder'] === '1').length;

  // Uluslararası öğrenci sayısı
  const internationalCount = data.filter(student => student.International === '1').length;

  // Ortalama yaş hesaplama
  const totalAge = data.reduce((sum, student) => sum + parseInt(student['Age at enrollment']), 0);
  const averageAge = Math.round(totalAge / studentCount);

  // Dönem sayılarını kontrol edelim
  const uniqueSemesters = [...new Set(data.map(student => student.semester))];
  console.log('Mevcut dönemler:', uniqueSemesters);
  
  // Dönem sayısı hesaplama
  const semesterCount = uniqueSemesters.length;

  // Değişken sayısı (CSV'deki sütun sayısı)
  const variableCount = Object.keys(data[0]).length;

  console.log({
    studentCount,
    graduateCount,
    dropoutCount,
    scholarshipCount,
    internationalCount,
    averageAge,
    semesterCount,
    variableCount
  });

  return {
    data: {
      averageAge,
      dropoutCount,
      graduateCount,
      internationalCount,
      scholarshipCount,
      semesterCount,
      studentCount,
      variableCount
    }
  };
} 