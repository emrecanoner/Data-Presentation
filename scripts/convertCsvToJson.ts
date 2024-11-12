const fs = require('fs');
const path = require('path');

// CSV dosyasını oku
const csvPath = path.join(process.cwd(), 'data', 'data.csv');
const outputPath = path.join(process.cwd(), 'public', 'stats.json');

const csvData = fs.readFileSync(csvPath, 'utf-8');
const rows = csvData.split('\n').filter((row: string) => row.trim());

// İstatistikleri hesapla
const stats = {
    studentCount: rows.length,
    graduateCount: rows.filter((row: string) => row.includes('Graduate')).length,
    dropoutCount: rows.filter((row: string) => row.includes('Dropout')).length,
    scholarshipCount: rows.filter((row: string) => row.split(';')[19] === '1').length, // scholarship holder
    internationalCount: rows.filter((row: string) => row.split(';')[21] === '1').length, // international
    averageAge: Math.round(rows.reduce((sum: number, row: string) => sum + parseInt(row.split(';')[20]), 0) / rows.length), // age at enrollment
    semesterCount: new Set(rows.map((row: string) => row.split(';')[2])).size, // application order as semester
    variableCount: rows[0].split(';').length
};

// JSON dosyasını oluştur
fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
console.log('Stats generated successfully:', stats); 