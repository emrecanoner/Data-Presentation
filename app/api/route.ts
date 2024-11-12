import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { StudentData } from '@/app/types/analytics';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'data.csv');
    
    // Debug: Dosya yolunu kontrol et
    console.log('CSV Path:', csvPath);
    
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    
    // Debug: CSV içeriğinin ilk birkaç satırını kontrol et
    console.log('CSV Content (first 100 chars):', fileContent.substring(0, 100));

    const { data } = Papa.parse<StudentData>(fileContent, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true
    });

    // Debug: Parse edilmiş verinin ilk elemanını kontrol et
    console.log('Parsed Data First Row:', data[0]);
    console.log('Total Rows:', data.length);

    const stats = {
      studentCount: data.length,
      variableCount: Object.keys(data[0] || {}).length,
      dropoutCount: data.filter(row => row.Target === 'Dropout').length,
      graduateCount: data.filter(row => row.Target === 'Graduate').length,
      scholarshipCount: data.filter(row => row['Scholarship holder'] === '1').length,
      internationalCount: data.filter(row => row['International'] === '1').length,
      semesterCount: 2,
      averageAge: Math.round(
        data.reduce((sum, row) => {
          const age = parseInt(row['Age at enrollment']);
          return isNaN(age) ? sum : sum + age;
        }, 0) / data.length
      )
    };

    // Debug: Hesaplanan istatistikleri kontrol et
    console.log('Calculated Stats:', stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in stats API:', error);
    return NextResponse.json(
      { error: 'Failed to calculate stats', details: error.message },
      { status: 500 }
    );
  }
}