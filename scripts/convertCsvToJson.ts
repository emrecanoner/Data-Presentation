const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const results: any[] = [];

// CSV dosyasının yolunu doğru şekilde belirleyelim
const csvPath = path.join(process.cwd(), 'data', 'data.csv');
const outputPath = path.join(process.cwd(), 'public', 'stats.json');

// Basit bir örnek veri oluşturalım (test için)
const sampleData = {
  studentCount: 100,
  dropoutCount: 20,
  graduateCount: 80,
  averageAge: 22,
  internationalCount: 15,
  scholarshipCount: 30
};

// Test verisi oluşturup kaydedelim
fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2));
console.log('Sample stats.json created successfully!');