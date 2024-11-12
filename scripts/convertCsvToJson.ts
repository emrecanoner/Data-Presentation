const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

interface StudentData {
  age: number;
  gender: string;
  scholarship: string;
  international: string;
}

const results: StudentData[] = [];
const csvPath = path.join(process.cwd(), 'data', 'data.csv');
const outputPath = path.join(process.cwd(), 'public', 'stats.json');

// İstatistikleri hesaplayacak fonksiyon
function calculateStats(data: StudentData[]) {
  const stats = {
    totalStudents: data.length,
    ageDistribution: {
      '18-20': 0,
      '21-23': 0,
      '24+': 0
    },
    genderDistribution: {
      male: 0,
      female: 0
    },
    scholarshipCount: data.filter(s => s.scholarship === 'Yes').length,
    internationalCount: data.filter(s => s.international === 'Yes').length,
    // diğer istatistikleri ekleyin
  };

  // Yaş dağılımını hesapla
  data.forEach(student => {
    if (student.age <= 20) stats.ageDistribution['18-20']++;
    else if (student.age <= 23) stats.ageDistribution['21-23']++;
    else stats.ageDistribution['24+']++;

    // Cinsiyet dağılımını hesapla
    if (student.gender === 'M') stats.genderDistribution.male++;
    else if (student.gender === 'F') stats.genderDistribution.female++;
  });

  return stats;
}

// CSV'yi oku ve JSON'a dönüştür
fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (data: StudentData) => results.push(data))
  .on('end', () => {
    const stats = calculateStats(results);
    fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
    console.log('Stats generated successfully!');
  });