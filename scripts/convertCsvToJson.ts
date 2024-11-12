import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const results: any[] = [];

fs.createReadStream(path.join(process.cwd(), 'data', 'data.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // İstatistikleri hesapla
    const stats = calculateStats(results);
    
    // JSON dosyası olarak kaydet
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
  const graduateCount = data.filter(student => student.graduate === '1').length;
  const dropoutCount = data.filter(student => student.graduate === '0').length;

  // Burslu öğrenci sayısı
  const scholarshipCount = data.filter(student => student.scholarship === '1').length;

  // Uluslararası öğrenci sayısı
  const internationalCount = data.filter(student => student.international === '1').length;

  // Ortalama yaş hesaplama
  const totalAge = data.reduce((sum, student) => sum + parseInt(student.age), 0);
  const averageAge = Math.round(totalAge / studentCount);

  // Dönem sayısı hesaplama (CSV'den)
  const semesterCount = Math.max(...data.map(student => parseInt(student.semester)));

  // Değişken sayısı (CSV'deki sütun sayısı)
  const variableCount = Object.keys(data[0]).length;

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