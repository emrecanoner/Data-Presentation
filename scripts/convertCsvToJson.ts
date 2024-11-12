const fs = require('fs');
const path = require('path');

const outputPath = path.join(process.cwd(), 'public', 'stats.json');

const stats = {
  studentCount: 4424,
  graduateCount: 2209,
  dropoutCount: 1421,
  scholarshipCount: 1099,
  internationalCount: 110,
  averageAge: 23,
  semesterCount: 2,
  variableCount: 37
};

// JSON dosyasını oluştur
fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
console.log('Stats generated successfully!'); 