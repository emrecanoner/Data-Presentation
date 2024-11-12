export const PROJECT_DATA = {
  title: 'Öğrenci Başarısında Zamansal Analiz',
  subtitle: 'Zamansal Tahmin ve Veri Analizi',
  description: 'Yükseköğretimde öğrenci başarısını ve okulu bırakma riskini tahmin etmek için geliştirilmiş yenilikçi bir yaklaşım.',
  
  // Statik veri yapısı
  statLabels: {
    students: 'Toplam Öğrenci',
    variables: 'Analiz Değişkeni',
    dropout: 'Okulu Bırakan',
    graduate: 'Mezun Olan',
    scholarship: 'Burslu Öğrenci',
    international: 'Uluslararası Öğrenci',
    semester: 'Dönem Sayısı',
    age: 'Ortalama Yaş'
  },

  icons: {
    students: 'UserGroupIcon',
    variables: 'ChartBarIcon',
    dropout: 'UserMinusIcon',
    graduate: 'UserCheckIcon',
    scholarship: 'AwardIcon',
    international: 'GlobeIcon',
    semester: 'CalendarIcon',
    age: 'UserIcon'
  },
  
  colors: {
    students: 'blue',
    variables: 'purple',
    dropout: 'pink',
    graduate: 'green',
    scholarship: 'yellow',
    international: 'indigo',
    semester: 'red',
    age: 'orange'
  }
} as const;
