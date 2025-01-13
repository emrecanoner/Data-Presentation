import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircle } from 'lucide-react'

interface InterpretationProps {
  type: 'pValue' | 'fStat' | 'correlation' | 'effectSize';
  value: number;
  testName: string;
}

export function StatisticalInterpretation({ type, value, testName }: InterpretationProps) {
  const getInterpretation = () => {
    const interpretations: Record<string, any> = {
      scholarship: {
        title: "Burs Etkisi Değerlendirmesi",
        interpretation: `Burs alan öğrenciler belirgin şekilde daha yüksek akademik performans gösteriyor (F=152.51, p<0.001 ***). İlk dönem (F=128.94) ve ikinci dönemde (F=150.17) tutarlı ve çok güçlü bir etki görülüyor. Burslu öğrencilerin dönemler arası performans düşüşü (-0.19) burssuz öğrencilere (-0.48) göre önemli ölçüde daha az. Cohen's d değeri büyük etki büyüklüğünü gösteriyor.`,
        color: "text-purple-400"
      },
      attendance: {
        title: "Gündüz/Gece Eğitimi Analizi",
        interpretation: `Gündüz/gece eğitimi arasında anlamlı fark var (F=15.69, p<0.001). İlk dönem (F=18.17) ve ikinci dönemde (F=11.30) tutarlı bir etki görülüyor. Gündüz öğrencilerinde dönemler arası düşüş (-0.43) gece öğrencilerine (-0.28) göre daha fazla.`,
        color: "text-green-400"
      },
      previous_education: {
        title: "Önceki Eğitim Etkisi Analizi",
        interpretation: `Önceki eğitim seviyesi başarıyı önemli ölçüde etkiliyor (F=11.99, p<0.001). En büyük performans düşüşü temel eğitim mezunlarında (-1.33) görülürken, mesleki eğitim mezunlarında daha az düşüş (-0.14) gözleniyor.`,
        color: "text-blue-400"
      },
      gdp: {
        title: "GDP Etkisi Analizi",
        interpretation: "GDP ile akademik başarı arasında zayıf bir ilişki (r = 0.054, p<0.001 ***) var. Korelasyon katsayısı (0.0-0.3 arası) zayıf ilişkiyi gösteriyor. Bu durum, GDP'nin tek başına akademik başarı üzerinde belirleyici olmadığını kanıtlıyor.",
        color: "text-gray-400"
      },
      parent_education: {
        title: "Ebeveyn Eğitimi Etkisi",
        interpretation: "Ebeveyn eğitim düzeyleri arasında orta-güçlü düzeyde pozitif ilişki (r = 0.54, p<0.001 ***) gözlenmiştir. Korelasyon katsayısı (0.3-0.7 arası) orta düzey ilişkiyi göstermektedir. Bu sonuç, sosyoekonomik faktörlerin birbiriyle güçlü ilişkisini kanıtlamaktadır.",
        color: "text-green-400"
      },
      debtor: {
        title: "Borç Durumu Analizi",
        interpretation: "Borçlu öğrenciler ile borçsuz öğrenciler arasında anlamlı performans farkı var. Finansal zorlukların akademik başarıyı etkilediği görülüyor.",
        color: "text-red-400"
      },
      tuition: {
        title: "Harç Ödeme Durumu Analizi",
        interpretation: `Harç ödemelerini düzenli yapan öğrenciler belirgin şekilde daha yüksek performans gösteriyor (F=394.40, p<0.001 ***). Güncel harç durumu olan öğrencilerde düşüş (-0.29) güncel olmayanlara (-1.31) göre çok daha az. F-istatistiği çok yüksek ve etki büyüklüğü Cohen's d kriterlerine göre büyük etki düzeyinde.`,
        color: "text-green-400"
      },
      gender: {
        title: "Cinsiyet Faktörü Analizi",
        interpretation: "Cinsiyet grupları arasında anlamlı fark var. Bu farkın nedenleri araştırılmalı ve eğitim süreçleri buna göre düzenlenmeli.",
        color: "text-pink-400"
      },
      age: {
        title: "Yaş Etkisi Analizi",
        interpretation: "Yaş ile akademik başarı arasında zayıf negatif ilişki var (r=-0.157, p<0.001 ***). Korelasyon katsayısı (0.0-0.3 arası) zayıf ilişkiyi gösteriyor. Her iki dönemde de tutarlı negatif ilişki (1. dönem: r=-0.149, 2. dönem: r=-0.165) gözleniyor.",
        color: "text-amber-400"
      },
      marital_status: {
        title: "Medeni Durum Etkisi Analizi",
        interpretation: `Medeni durum grupları arasında anlamlı performans farkı var (F=5.98, p<0.001 ***). Dul öğrencilerde pozitif değişim (+1.06), birlikte yaşayan öğrencilerde en büyük düşüş (-1.60) görülüyor. Etki büyüklüğü Cohen's d kriterlerine göre küçük-orta düzeyde.`,
        color: "text-blue-400"
      },
      international: {
        title: "Uluslararası Öğrenci Analizi",
        interpretation: "Uluslararası öğrenciler ile yerel öğrenciler arasında performans farklılıkları gözleniyor. Kültürel ve dilsel faktörlerin etkisi değerlendirilmeli.",
        color: "text-orange-400"
      },
      application_mode: {
        title: "Başvuru Türü Etkisi",
        interpretation: `Başvuru türleri arasında çok güçlü istatistiksel farklılıklar var (F=16.62, p<0.001 ***). Uluslararası öğrenciler pozitif bir değişim (+0.264) gösterirken, 23 yaş üstü başvuranlarda en büyük düşüş (-0.85) gözleniyor. F-istatistiği her iki dönemde de tutarlı ve güçlü (1. dönem: F=15.89, 2. dönem: F=17.35).`,
        color: "text-blue-400"
      }
    };

    return interpretations[testName];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-white hover:text-black transition-colors group"
        >
          <MessageCircle className="h-4 w-4 text-white group-hover:text-black transition-colors" />
          <span className="text-sm">Detaylı Analiz</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle className={getInterpretation()?.color || "text-white"}>
            {getInterpretation()?.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            {getInterpretation()?.interpretation}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
} 