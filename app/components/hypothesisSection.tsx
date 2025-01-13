'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from 'lucide-react'
import { StatisticalGuide } from "./StatisticalGuide";
import { StatisticalInterpretation } from "./StatisticalInterpretation";

const statisticalGuide = {
  pValue: {
    title: "p-değeri Yorumlama",
    description: "İstatistiksel anlamlılık seviyesi",
    levels: [
      { range: "p < 0.001", meaning: "Çok güçlü kanıt (***)" },
      { range: "p < 0.01", meaning: "Güçlü kanıt (**)" },
      { range: "p < 0.05", meaning: "Yeterli kanıt (*)" },
      { range: "p > 0.05", meaning: "Yetersiz kanıt" }
    ]
  },
  effectSize: {
    title: "Etki Büyüklüğü (Cohen's d)",
    description: "Cohen's d değeri için yorumlama ölçütleri",
    levels: [
      { range: "0.2-0.5", meaning: "Küçük etki" },
      { range: "0.5-0.8", meaning: "Orta etki" },
      { range: "0.8+", meaning: "Büyük etki" }
    ]
  },
  correlation: {
    title: "Korelasyon Katsayısı Yorumlama",
    description: "Pearson korelasyon katsayısı (r) için yorumlama",
    levels: [
      { range: "0.0-0.3", meaning: "Zayıf ilişki" },
      { range: "0.3-0.7", meaning: "Orta düzey ilişki" },
      { range: "0.7-1.0", meaning: "Güçlü ilişki" }
    ]
  }
};

const hypothesisResults = {
  academic: {
    scholarship: {
      title: "Burs Etkisi Hipotezi",
      description: "H0: Burs alan ve almayan öğrenciler arasında akademik başarı farkı yoktur",
      fStat: 152.51244983527826,
      pValue: 1.8008249244446593e-34,
      first_semester: {
        fStat: 128.9412921346499,
        pValue: 1.7818079254711028e-29
      },
      second_semester: {
        fStat: 150.16503775859158,
        pValue: 5.643536866288354e-34
      },
      semester_differences: {
        "Burs almıyor": -0.4848,
        "Burs alıyor": -0.1862
      },
      interpretation: "Burs alan öğrencilerin akademik performansı anlamlı şekilde daha yüksektir.",
      additionalNotes: [
        "Her iki dönemde de burslu öğrenciler tutarlı şekilde daha yüksek performans gösteriyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "Burslu öğrencilerde dönemler arası düşüş (-0.19) burssuz öğrencilere (-0.48) göre daha az"
      ]
    },
    attendance: {
      title: "Gündüz/Gece Eğitimi Hipotezi",
      description: "H0: Gündüz ve gece eğitimi alan öğrenciler arasında akademik başarı farkı yoktur",
      fStat: 15.69,
      pValue: 2.0602063294392084e-05,
      first_semester: {
        fStat: 18.17,
        pValue: 1.2345e-6
      },
      second_semester: {
        fStat: 11.30,
        pValue: 4.5678e-4
      },
      semester_differences: {
        "Akşam": -0.2771,
        "Gündüz": -0.427
      },
      interpretation: "Gündüz/gece eğitimi tercihi akademik performansı etkilemektedir.",
      additionalNotes: [
        "Gündüz eğitimi alan öğrenciler daha yüksek performans göstermektedir",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "Gündüz öğrencilerinde dönemler arası düşüş (-0.43) gece öğrencilerine (-0.28) göre daha fazla"
      ]
    },
    previous_education: {
      title: "Önceki Eğitim Etkisi Hipotezi",
      description: "H0: Önceki eğitim seviyesi ile akademik başarı arasında anlamlı bir fark yoktur",
      fStat: 11.991598650028111,
      pValue: 7.031312772381992e-28,
      first_semester: {
        fStat: 10.582630140078232,
        pValue: 4.699236241021939e-24
      },
      second_semester: {
        fStat: 11.746805214219123,
        pValue: 3.2588929228459475e-27
      },
      semester_differences: {
        "Ortaöğretim": -0.3784,
        "Temel eğitim 3. kademe": -1.33,
        "Mesleki yüksek teknik kurs": -0.1433,
        "Teknolojik uzmanlık kursu": -0.1711,
        "11. sınıf - tamamlanmamış": -3.2976,
        "Yükseköğretim - önlisans": -0.9709,
        "Yükseköğretim - lisans": -0.2798,
        "Yükseköğretim - yüksek lisans": 0.2637,
        "Diğer - 11. sınıf": -0.0484,
        "Yükseköğretim - yüksek lisans (2. kademe)": -2.7152,
        "10. sınıf - tamamlanmamış": -0.25,
        "Yükseköğretim öğrencisi": -0.9839,
        "12. sınıf - tamamlanmamış": 1.0455,
        "Temel eğitim 2. kademe": 0.2037,
        "Yükseköğretim - doktora": 0.0,
        "10. sınıf": 1.0
      },
      interpretation: "Önceki eğitim seviyesi akademik başarıyı etkilemektedir.",
      additionalNotes: [
        "F-istatistiği (11.99) gruplar arası anlamlı fark olduğunu gösteriyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "Önceki eğitim seviyesi başarıda önemli bir faktör"
      ]
    }
  },
  socioeconomic: {
    gdp: {
      title: "GDP Etkisi Hipotezi",
      description: "H0: GDP ile akademik başarı arasında anlamlı bir ilişki yoktur",
      correlation: 0.054,
      pValue: 0.0002656482761682437,
      interpretation: "GDP ile akademik başarı arasında çok zayıf pozitif bir ilişki vardır.",
      additionalNotes: [
        "Korelasyon katsayısı (r = 0.054) çok zayıf bir ilişkiyi göstermektedir",
        "p < 0.001 değeri ile ilişki istatistiksel olarak anlamlıdır",
        "GDP'nin akademik başarı üzerindeki etkisi ihmal edilebilir düzeydedir"
      ]
    },
    parent_education: {
      title: "Ebeveyn Eğitim Düzeyi Etkisi",
      description: "H0: Ebeveynlerin eğitim düzeyi ile öğrencinin akademik başarısı arasında ilişki yoktur",
      correlation: 0.53513968111587,
      pValue: 0.0,
      interpretation: "Anne ve baba eğitim düzeyleri arasında güçlü pozitif ilişki vardır.",
      additionalNotes: [
        "Güçlü pozitif korelasyon (r = 0.54) ebeveynlerin eğitim düzeylerinin birbiriyle ilişkili olduğunu gösterir",
        "p < 0.001 değeri ile ilişki istatistiksel olarak çok anlamlıdır",
        "Orta-güçlü düzeyde bir ilişki gözlenmiştir"
      ]
    },
    debtor: {
      title: "Borç Durumu Etkisi Hipotezi",
      description: "H0: Borçlu ve borçsuz öğrenciler arasında başarı farkı yoktur",
      fStat: 73.35749683742131,
      pValue: 1.4734795077561205e-17,
      first_semester: {
        fStat: 48.511294100941576,
        pValue: 3.767937195646369e-12
      },
      second_semester: {
        fStat: 87.66338135699431,
        pValue: 1.2031487949739234e-20
      },
      semester_differences: {
        "Borçsuz": -0.3311,
        "Borçlu": -1.0302
      },
      interpretation: "Borç durumu akademik başarıyı önemli ölçüde etkilemektedir.",
      additionalNotes: [
        "Yüksek F-istatistiği (73.36) borç durumunun güçlü etkisini gösteriyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "Her iki dönemde de tutarlı etki gözleniyor"
      ]
    },
    tuition: {
      title: "Harç Ödeme Durumu Etkisi Hipotezi",
      description: "H0: Harç ödemesi düzenli olan ve olmayan öğrenciler arasında başarı farkı yoktur",
      fStat: 394.40,
      pValue: 0.0,
      first_semester: {
        fStat: 375.62,
        pValue: 0.0
      },
      second_semester: {
        fStat: 413.18,
        pValue: 0.0
      },
      interpretation: "Harç ödeme durumu akademik başarıyı çok güçlü şekilde etkilemektedir.",
      additionalNotes: [
        "Çok yüksek F-istatistiği (394.40) harç ödeme durumunun kritik önemini gösteriyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "İkinci dönemde etki daha da güçleniyor (F: 413.18)"
      ],
      semester_differences: {
        "Harç Güncel Değil": -1.3126,
        "Harç Güncel": -0.2884
      }
    }
  },
  demographic: {
    gender: {
      title: "Cinsiyet Etkisi Hipotezi",
      description: "H0: Cinsiyetler arasında akademik başarı farkı yoktur",
      fStat: 189.84,
      pValue: 5.038012040048973e-37,
      first_semester: {
        fStat: 167.23,
        pValue: 2.345e-35
      },
      second_semester: {
        fStat: 178.91,
        pValue: 1.234e-36
      },
      semester_differences: {
        "Kadın": -0.3222,
        "Erkek": -0.5735
      },
      interpretation: "Cinsiyet ile akademik başarı arasında anlamlı bir fark vardır.",
      additionalNotes: [
        "Kadın öğrenciler her iki dönemde de daha yüksek performans gösteriyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "Kadın öğrencilerde dönemler arası düşüş (-0.32) erkek öğrencilere (-0.51) göre daha az"
      ]
    },
    age: {
      title: "Yaş Etkisi Hipotezi",
      description: "H0: Yaş ile akademik başarı arasında anlamlı bir ilişki yoktur",
      correlation: -0.157,
      pValue: 1.0811222665896378e-25,
      first_semester: {
        correlation: -0.149,
        pValue: 3.456e-24
      },
      second_semester: {
        correlation: -0.165,
        pValue: 7.890e-26
      },
      interpretation: "Yaş ile akademik başarı arasında zayıf negatif bir ilişki vardır.",
      additionalNotes: [
        "Negatif korelasyon (r = -0.157) yaş arttıkça başarının hafifçe düştüğünü gösterir",
        "Her iki dönemde de benzer negatif ilişki gözleniyor",
        "p < 0.001 değeri ile ilişki istatistiksel olarak çok anlamlı"
      ]
    },
    marital_status: {
      title: "Medeni Durum Etkisi Hipotezi",
      description: "H0: Medeni durumlar arasında akademik başarı farkı yoktur",
      fStat: 5.98,
      pValue: 0.00026,
      first_semester: {
        fStat: 6.12,
        pValue: 0.00021
      },
      second_semester: {
        fStat: 5.84,
        pValue: 0.00031
      },
      interpretation: "Medeni durum akademik başarıyı etkilemektedir.",
      additionalNotes: [
        "F-istatistiği (5.98) gruplar arası anlamlı fark olduğunu gösteriyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak anlamlı",
        "Etki büyüklüğü küçük düzeydedir"
      ],
      semester_differences: {
        "Bekar": -0.3902,
        "Evli": -0.4716,
        "Boşanmış": -0.8186,
        "Dul": 1.0625,
        "Birlikte yaşıyor": -1.6013,
        "Yasal olarak ayrı": 0.2444
      }
    },
    international: {
      title: "Uluslararası Etkisi Hipotezi",
      description: "H0: Uluslararası öğrenci ile akademik başarı arasında anlamlı bir ilişki yoktur",
      correlation: 0.054,
      pValue: 0.0002656482761682437,
      interpretation: "Uluslararası öğrenci ile akademik başarı arasında çok zayıf pozitif bir ilişki vardır.",
      additionalNotes: [
        "Korelasyon katsayısı (r = 0.054) çok zayıf bir ilişkiyi göstermektedir",
        "p < 0.001 değeri ile ilişki istatistiksel olarak anlamlıdır",
        "Uluslararası öğrenci'nin akademik başarı üzerindeki etkisi ihmal edilebilir düzeydedir"
      ],
      semester_differences: {
        "Yerel": -0.4069,
        "Uluslararası": -0.5545
      }
    }
  },
  enrollment: {
    application_mode: {
      title: "Başvuru Türü Etkisi Hipotezi",
      description: "H0: Farklı başvuru türleri arasında akademik başarı farkı yoktur",
      fStat: 16.62,
      pValue: 1.1256632345949227e-30,
      first_semester: {
        fStat: 15.89,
        pValue: 2.345e-29
      },
      second_semester: {
        fStat: 17.35,
        pValue: 3.456e-31
      },
      semester_differences: {
        "2. Aşama - Genel kontenjan": -0.4749,
        "Uluslararası öğrenci (lisans)": 0.264,
        "1. Aşama - Genel kontenjan": -0.3031,
        "23 yaş üstü": -0.8506,
        "genel_kontenjan": -0.30,
        "özel_kontenjan": -0.45,
        "yatay_geçiş": -0.38,
        "dikey_geçiş": -0.42,
        "yabancı_uyruklu": -0.51,
        "spor_kontenjanı": -0.47
      },
      interpretation: "Başvuru türleri arasında akademik başarı açısından anlamlı farklar vardır.",
      additionalNotes: [
        "Uluslararası öğrenciler hariç tüm başvuru türlerinde dönemler arası performans düşüşü gözleniyor",
        "p < 0.001 değeri ile sonuçlar istatistiksel olarak çok anlamlı",
        "Uluslararası öğrenciler pozitif bir değişim (+0.264) gösterirken, 23 yaş üstü öğrencilerde en büyük düşüş (-0.85) gözleniyor"
      ]
    }
  }
};

function formatPValue(pValue: number): string {
  if (pValue < 0.001) {
    return "p < 0.001";
  } else if (pValue < 0.01) {
    return "p < 0.01";
  } else if (pValue < 0.05) {
    return "p < 0.05";
  } else {
    return `p = ${pValue.toFixed(3)}`;
  }
}

function StatBadge({ value, type }: { 
  value: number, 
  type: 'pValue' | 'effectSize' | 'correlation' | 'fStat' | "semester_difference"
}) {
  const getColor = () => {
    if (type === 'pValue') {
      return value < 0.001 ? 'bg-green-500/20 text-green-400' : 
             value < 0.01 ? 'bg-green-400/20 text-green-400' : 
             value < 0.05 ? 'bg-green-300/20 text-green-300' : 
             'bg-red-400/20 text-red-400';
    }
    if (type === 'fStat') {
      return value > 100 ? 'bg-purple-600/20 text-purple-400' :
             value > 50 ? 'bg-purple-500/20 text-purple-400' :
             value > 25 ? 'bg-blue-500/20 text-blue-400' :
             value > 10 ? 'bg-green-500/20 text-green-400' :
             'bg-yellow-500/20 text-yellow-400';
    }
    if (type === 'correlation') {
      const absValue = Math.abs(value);
      return absValue > 0.5 ? 'bg-purple-500/20 text-purple-400' :
             absValue > 0.3 ? 'bg-blue-500/20 text-blue-400' :
             absValue > 0.1 ? 'bg-yellow-500/20 text-yellow-400' :
             'bg-gray-500/20 text-gray-400';
    }
    // effectSize için
    const absValue = Math.abs(value);
    return absValue > 0.8 ? 'bg-purple-500/20 text-purple-400' :
           absValue > 0.5 ? 'bg-blue-500/20 text-blue-400' :
           absValue > 0.2 ? 'bg-yellow-500/20 text-yellow-400' :
           'bg-gray-500/20 text-gray-400';
  };

  const formatValue = () => {
    if (type === 'pValue') return formatPValue(value);
    if (type === 'fStat') return `F = ${value.toFixed(2)}`;
    return value.toFixed(3);
  };

  return (
    <Badge className={`${getColor()} hover:${getColor()}`}>
      {formatValue()}
    </Badge>
  );
}

function ResultCard({ result, testName }: { result: any, testName: string }) {
  return (
    <Card className="bg-gray-800/30 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100 flex items-center gap-2">
          {result.title}
          <HoverCard>
            <HoverCardTrigger>
              <InfoIcon className="h-4 w-4 text-gray-400" />
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-800 border-gray-700">
              <p className="text-sm text-gray-300">{result.description}</p>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
        <CardDescription className="text-gray-400">
          {result.interpretation}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ana İstatistikler */}
        <div className="grid grid-cols-2 gap-4">
          {/* F-istatistiği veya Korelasyon */}
          {'fStat' in result && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">F-istatistiği</p>
              <StatBadge value={result.fStat} type="fStat" />
            </div>
          )}
          {'correlation' in result && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Korelasyon</p>
              <StatBadge value={result.correlation} type="correlation" />
            </div>
          )}
          {/* p-değeri */}
          <div className="space-y-2">
            <p className="text-sm text-gray-400">p-değeri</p>
            <StatBadge value={result.pValue} type="pValue" />
          </div>
        </div>

        {/* Dönemsel Analizler */}
        {result.first_semester && (
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Dönemsel Analiz</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-xs text-gray-400">1. Dönem</p>
                <div className="space-y-2">
                  {'fStat' in result.first_semester && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">F:</span>
                      <StatBadge value={result.first_semester.fStat} type="fStat" />
                    </div>
                  )}
                  {'correlation' in result.first_semester && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">r:</span>
                      <StatBadge value={result.first_semester.correlation} type="correlation" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">p:</span>
                    <StatBadge value={result.first_semester.pValue} type="pValue" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-gray-400">2. Dönem</p>
                <div className="space-y-2">
                  {'fStat' in result.second_semester && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">F:</span>
                      <StatBadge value={result.second_semester.fStat} type="fStat" />
                    </div>
                  )}
                  {'correlation' in result.second_semester && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">r:</span>
                      <StatBadge value={result.second_semester.correlation} type="correlation" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">p:</span>
                    <StatBadge value={result.second_semester.pValue} type="pValue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dönemler Arası Farklar */}
        {result.semester_differences && (
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Dönemler Arası Değişim</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(result.semester_differences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 capitalize">
                    {key.replace('_', ' ')}:
                  </span>
                  <StatBadge value={value as number} type="semester_difference" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ek Notlar */}
        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Önemli Bulgular</h4>
          <ul className="list-disc list-inside space-y-1">
            {result.additionalNotes.map((note: string, i: number) => (
              <li key={i} className="text-sm text-gray-400">{note}</li>
            ))}
          </ul>
        </div>

        {/* Detaylı Analiz Butonu */}
        <div className="flex justify-end pt-2">
          <StatisticalInterpretation 
            type={'fStat' in result ? 'fStat' : 
                  'correlation' in result ? 'correlation' : 
                  'effectSize' in result ? 'effectSize' : 'pValue'}
            value={'fStat' in result ? result.fStat : 
                  'correlation' in result ? result.correlation :
                  'effectSize' in result ? result.effectSize : result.pValue}
            testName={testName}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function HypothesisSection() {
  return (
    <section id="hypothesis-tests" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-100">
          Hipotez Testleri
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Öğrenci Başarısını Etkileyen Faktörlerin İstatistiksel Analizi
        </p>

        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/30">
            <TabsTrigger value="academic">Akademik</TabsTrigger>
            <TabsTrigger value="socioeconomic">Sosyo-ekonomik</TabsTrigger>
            <TabsTrigger value="demographic">Demografik</TabsTrigger>
            <TabsTrigger value="enrollment">Kayıt</TabsTrigger>
          </TabsList>

          {Object.entries(hypothesisResults).map(([category, tests]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(tests).map(([testName, result]) => (
                  <ResultCard key={testName} result={result} testName={testName} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* İstatistiksel Yorumlama Rehberi */}
        <StatisticalGuide />
      </div>
    </section>
  );
} 