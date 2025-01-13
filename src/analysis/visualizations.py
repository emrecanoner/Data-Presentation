import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import json
def create_analysis_visualizations(hypothesis_results):
    # 1. Burs Etkisi Analizi
    plt.figure(figsize=(10, 6))
    scholarship_data = hypothesis_results['academic']['scholarship']['semester_differences']
    plt.bar(['Burs almıyor', 'Burs alıyor'], 
            [scholarship_data['Burs almıyor']['semester_difference'], 
             scholarship_data['Burs alıyor']['semester_difference']],
            color=['lightcoral', 'lightgreen'])
    plt.title('Burs Durumuna Göre Dönemler Arası Not Değişimi')
    plt.ylabel('Ortalama Not Değişimi')
    plt.axhline(y=0, color='black', linestyle='--', alpha=0.3)
    plt.savefig('visualizations/scholarship_effect.png')
    plt.close()

    # 2. Cinsiyet Etkisi Analizi
    plt.figure(figsize=(10, 6))
    gender_data = hypothesis_results['demographic']['gender']['semester_differences']
    plt.bar(['Kadın', 'Erkek'], 
            [gender_data['Kadın']['semester_difference'], 
             gender_data['Erkek']['semester_difference']],
            color=['pink', 'lightblue'])
    plt.title('Cinsiyete Göre Dönemler Arası Not Değişimi')
    plt.ylabel('Ortalama Not Değişimi')
    plt.axhline(y=0, color='black', linestyle='--', alpha=0.3)
    plt.savefig('visualizations/gender_effect.png')
    plt.close()

    # 3. Medeni Durum Analizi
    plt.figure(figsize=(12, 6))
    marital_data = hypothesis_results['demographic']['marital_status']['semester_differences']
    plt.bar(marital_data.keys(), 
            [d['semester_difference'] for d in marital_data.values()],
            color=plt.cm.Set3(np.linspace(0, 1, len(marital_data))))
    plt.title('Medeni Duruma Göre Dönemler Arası Not Değişimi')
    plt.xticks(rotation=45, ha='right')
    plt.ylabel('Ortalama Not Değişimi')
    plt.axhline(y=0, color='black', linestyle='--', alpha=0.3)
    plt.tight_layout()
    plt.savefig('visualizations/marital_status_effect.png')
    plt.close()

    # 4. Harç Durumu Analizi
    plt.figure(figsize=(10, 6))
    tuition_data = hypothesis_results['socioeconomic']['tuition']['semester_differences']
    plt.bar(['Harç Güncel Değil', 'Harç Güncel'], 
            [tuition_data['Harç Güncel Değil']['semester_difference'], 
             tuition_data['Harç Güncel']['semester_difference']],
            color=['salmon', 'skyblue'])
    plt.title('Harç Ödeme Durumuna Göre Dönemler Arası Not Değişimi')
    plt.ylabel('Ortalama Not Değişimi')
    plt.axhline(y=0, color='black', linestyle='--', alpha=0.3)
    plt.savefig('visualizations/tuition_effect.png')
    plt.close()

    # 5. Sosyoekonomik Faktörler Analizi
    plt.figure(figsize=(12, 6))
    socio_factors = {
        'GDP': hypothesis_results['socioeconomic']['gdp']['overall']['correlation'],
        'Anne Eğitimi': hypothesis_results['socioeconomic']['parent_education']['mother']['first_semester']['correlation'],
        'Baba Eğitimi': hypothesis_results['socioeconomic']['parent_education']['father']['first_semester']['correlation'],
        'Borç Durumu': hypothesis_results['socioeconomic']['debtor']['overall']['fStat'] / 100  # Normalize edilmiş
    }
    plt.bar(socio_factors.keys(), socio_factors.values(), color=plt.cm.Pastel1(np.linspace(0, 1, len(socio_factors))))
    plt.title('Sosyoekonomik Faktörlerin Akademik Başarıya Etkisi')
    plt.ylabel('Etki Büyüklüğü (Korelasyon/Normalize F-istatistiği)')
    plt.axhline(y=0, color='black', linestyle='--', alpha=0.3)
    plt.tight_layout()
    plt.savefig('visualizations/socioeconomic_factors.png')
    plt.close()

    # 6. İstatistiksel Anlamlılık Analizi
    plt.figure(figsize=(12, 6))
    p_values = {
        'Cinsiyet': hypothesis_results['demographic']['gender']['overall']['pValue'],
        'Burs': hypothesis_results['academic']['scholarship']['overall']['pValue'],
        'Harç': hypothesis_results['socioeconomic']['tuition']['overall']['pValue'],
        'Medeni Durum': hypothesis_results['demographic']['marital_status']['overall']['pValue']
    }
    plt.bar(p_values.keys(), [-np.log10(v) for v in p_values.values()], 
            color=plt.cm.Pastel2(np.linspace(0, 1, len(p_values))))
    plt.axhline(y=-np.log10(0.05), color='red', linestyle='--', label='p=0.05 eşiği')
    plt.title('Faktörlerin İstatistiksel Anlamlılık Düzeyleri')
    plt.ylabel('-log10(p-değeri)')
    plt.legend()
    plt.tight_layout()
    plt.savefig('visualizations/statistical_significance.png')
    plt.close()

    # 7. Başvuru Türü Analizi
    plt.figure(figsize=(15, 8))
    app_data = hypothesis_results['enrollment']['application_mode']['semester_differences']
    # İlk 8 başvuru türünü al (okunabilirlik için)
    app_types = list(app_data.keys())[:8]
    app_diffs = [app_data[t]['semester_difference'] for t in app_types]
    plt.barh(app_types, app_diffs, color=plt.cm.Set3(np.linspace(0, 1, len(app_types))))
    plt.title('Başvuru Türüne Göre Dönemler Arası Not Değişimi')
    plt.xlabel('Ortalama Not Değişimi')
    plt.axvline(x=0, color='black', linestyle='--', alpha=0.3)
    plt.tight_layout()
    plt.savefig('visualizations/application_mode_effect.png')
    plt.close()

def main():
    # JSON dosyasından verileri oku
    with open('hypothesis_results.json', 'r', encoding='utf-8') as f:
        hypothesis_results = json.load(f)
    
    create_analysis_visualizations(hypothesis_results)

if __name__ == "__main__":
    main()