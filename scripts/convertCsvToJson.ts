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
  });

function calculateStats(data: any[]) {
  // Mevcut istatistik hesaplamalarınız
  // ...

  return {
    data: {
      averageAge: /* hesaplama */,
      dropoutCount: /* hesaplama */,
      graduateCount: /* hesaplama */,
      internationalCount: /* hesaplama */,
      scholarshipCount: /* hesaplama */,
      semesterCount: /* hesaplama */,
      studentCount: /* hesaplama */,
      variableCount: /* hesaplama */
    }
  };
} 