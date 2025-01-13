import pandas as pd
import scipy.stats as stats
import numpy as np
import json
from scipy.stats import chi2_contingency
from statsmodels.multivariate.manova import MANOVA
import matplotlib.pyplot as plt
import seaborn as sns

# Veriyi okuma
df = pd.read_csv('data/data.csv', delimiter=';')

# İki dönemin ortalamasını alan yeni bir metrik oluşturalım
df['academic_performance'] = df[['Curricular units 1st sem (grade)', 
                               'Curricular units 2nd sem (grade)']].mean(axis=1)

# Kategorik değişkenler için etiket sözlükleri
CATEGORY_LABELS = {
    'Marital Status': {
        1: 'Bekar',
        2: 'Evli',
        3: 'Dul',
        4: 'Boşanmış',
        5: 'Birlikte yaşıyor',
        6: 'Yasal olarak ayrı'
    },
    'Application mode': {
        1: '1. Aşama - Genel kontenjan',
        2: '612/93 sayılı kararname',
        5: '1. Aşama - Özel kontenjan (Azor Adaları)',
        7: 'Diğer yüksek öğrenim sahipleri',
        10: '854-B/99 sayılı kararname',
        15: 'Uluslararası öğrenci (lisans)',
        16: '1. Aşama - Özel kontenjan (Madeira Adası)',
        17: '2. Aşama - Genel kontenjan',
        18: '3. Aşama - Genel kontenjan',
        26: '533-A/99 sayılı kararname, madde b2 (Farklı Plan)',
        27: '533-A/99 sayılı kararname, madde b3 (Diğer Kurum)',
        39: '23 yaş üstü',
        42: 'Transfer',
        43: 'Bölüm değişikliği',
        44: 'Teknolojik uzmanlık diploma sahipleri',
        51: 'Kurum/bölüm değişikliği',
        53: 'Kısa dönem diploma sahipleri',
        57: 'Kurum/bölüm değişikliği (Uluslararası)'
    },
    'Course': {
        33: 'Biyoyakıt Üretim Teknolojileri',
        171: 'Animasyon ve Multimedya Tasarımı',
        8014: 'Sosyal Hizmet (akşam)',
        9003: 'Ziraat',
        9070: 'İletişim Tasarımı',
        9085: 'Veteriner Hemşireliği',
        9119: 'Bilgisayar Mühendisliği',
        9130: 'At Yetiştiriciliği',
        9147: 'İşletme',
        9238: 'Sosyal Hizmet',
        9254: 'Turizm',
        9500: 'Hemşirelik',
        9556: 'Ağız Hijyeni',
        9670: 'Reklam ve Pazarlama Yönetimi',
        9773: 'Gazetecilik ve İletişim',
        9853: 'Temel Eğitim',
        9991: 'İşletme (akşam)'
    },
    'Previous qualification': {
        1: 'Ortaöğretim',
        2: 'Yükseköğretim - lisans',
        3: 'Yükseköğretim - önlisans',
        4: 'Yükseköğretim - yüksek lisans',
        5: 'Yükseköğretim - doktora',
        6: 'Yükseköğretim öğrencisi',
        9: '12. sınıf - tamamlanmamış',
        10: '11. sınıf - tamamlanmamış',
        12: 'Diğer - 11. sınıf',
        14: '10. sınıf',
        15: '10. sınıf - tamamlanmamış',
        19: 'Temel eğitim 3. kademe (9/10/11. sınıf) veya dengi',
        38: 'Temel eğitim 2. kademe (6/7/8. sınıf) veya dengi',
        39: 'Teknolojik uzmanlık kursu',
        40: 'Yükseköğretim - lisans (1. kademe)',
        42: 'Mesleki yüksek teknik kurs',
        43: 'Yükseköğretim - yüksek lisans (2. kademe)'
    },
    'Nacionality': {
        1: 'Portekiz',
        2: 'Alman',
        6: 'İspanyol',
        11: 'İtalyan',
        13: 'Hollandalı',
        14: 'İngiliz',
        17: 'Litvanyalı',
        21: 'Angolalı',
        22: 'Cape Verdeli',
        24: 'Gineli',
        25: 'Mozambikli',
        26: 'São Toméli',
        32: 'Türk',
        41: 'Brezilyalı',
        62: 'Romen',
        100: 'Moldova',
        101: 'Meksikalı',
        103: 'Ukraynalı',
        105: 'Rus',
        108: 'Kübalı',
        109: 'Kolombiyalı'
    },
    'Mother/Father occupation': {
        0: 'Öğrenci',
        1: 'Yasama ve Yürütme Organları Temsilcileri, Yöneticiler',
        2: 'Entelektüel ve Bilimsel Faaliyet Uzmanları',
        3: 'Orta Düzey Teknisyenler ve Meslekler',
        4: 'İdari personel',
        5: 'Kişisel Hizmetler, Güvenlik ve Satış Elemanları',
        6: 'Çiftçiler ve Tarım, Balıkçılık ve Ormancılık Alanında Vasıflı İşçiler',
        7: 'Sanayi, İnşaat ve El Sanatları Alanında Vasıflı İşçiler',
        8: 'Tesis ve Makine Operatörleri ve Montaj İşçileri',
        9: 'Vasıfsız İşçiler',
        10: 'Silahlı Kuvvetler Meslekleri',
        90: 'Diğer Durum',
        99: '(boş)',
        101: 'Silahlı Kuvvetler Subayları',
        102: 'Silahlı Kuvvetler Astsubayları',
        103: 'Diğer Silahlı Kuvvetler Personeli',
        112: 'İdari ve Ticari Hizmetler Müdürleri',
        114: 'Otel, Restoran, Ticaret ve Diğer Hizmetler Müdürleri',
        121: 'Fizik, Matematik, Mühendislik ve İlgili Teknik Uzmanlar',
        122: 'Sağlık Profesyonelleri',
        123: 'Öğretmenler',
        124: 'Finans, Muhasebe, İdari Organizasyon, Kamu ve Ticari İlişkiler Uzmanları',
        125: 'Bilgi ve İletişim Teknolojileri (BİT) Uzmanları',
        131: 'Orta Düzey Bilim ve Mühendislik Teknisyenleri ve Meslekleri',
        132: 'Orta Düzey Sağlık Teknisyenleri ve Profesyonelleri',
        134: 'Hukuk, Sosyal, Spor, Kültürel ve Benzeri Hizmetlerde Orta Düzey Teknisyenler',
        135: 'Bilgi ve İletişim Teknolojileri Teknisyenleri',
        141: 'Büro Çalışanları, Sekreterler ve Veri İşleme Operatörleri',
        143: 'Veri, Muhasebe, İstatistik, Finansal Hizmetler ve Kayıt Operatörleri',
        144: 'Diğer İdari Destek Personeli',
        151: 'Kişisel Hizmet Çalışanları',
        152: 'Satış Elemanları',
        153: 'Kişisel Bakım Çalışanları ve Benzerleri',
        154: 'Koruma ve Güvenlik Hizmetleri Personeli',
        161: 'Pazar Odaklı Çiftçiler ve Vasıflı Tarım ve Hayvancılık Çalışanları',
        163: 'Geçimlik Çiftçiler, Hayvancılar, Balıkçılar, Avcılar ve Toplayıcılar',
        171: 'İnşaat ve Benzeri İşlerde Vasıflı İşçiler (Elektrikçiler Hariç)',
        172: 'Metal İşleme ve Benzeri İşlerde Vasıflı İşçiler',
        173: 'Baskı, Hassas Alet İmalatı, Kuyumculuk, El Sanatları ve Benzeri İşlerde Vasıflı İşçiler',
        174: 'Elektrik ve Elektronik Alanında Vasıflı İşçiler',
        175: 'Gıda İşleme, Ağaç İşleri, Giyim ve Diğer Sanayi ve El Sanatlarında İşçiler',
        181: 'Sabit Tesis ve Makine Operatörleri',
        182: 'Montaj İşçileri',
        183: 'Araç Sürücüleri ve Mobil Ekipman Operatörleri',
        191: 'Temizlik İşçileri',
        192: 'Tarım, Hayvancılık, Balıkçılık ve Ormancılıkta Vasıfsız İşçiler',
        193: 'Madencilik, İnşaat, İmalat ve Ulaştırma Sektörlerinde Vasıfsız İşçiler',
        194: 'Yemek Hazırlama Yardımcıları',
        195: 'Seyyar Satıcılar (Gıda Hariç) ve Sokak Hizmetleri Çalışanları'
    },
    'Gender': {
        1: 'Erkek',
        0: 'Kadın'
    },
    'Scholarship holder': {
        1: 'Evet',
        0: 'Hayır'
    },
    'Daytime/evening attendance': {
        1: 'Gündüz',
        0: 'Akşam'
    },
    'Displaced': {
        1: 'Evet',
        0: 'Hayır'
    },
    'Educational special needs': {
        1: 'Evet',
        0: 'Hayır'
    },
    'Debtor': {
        1: 'Evet',
        0: 'Hayır'
    },
    'Tuition fees up to date': {
        1: 'Evet',
        0: 'Hayır'
    },
    'International': {
        1: 'Evet',
        0: 'Hayır'
    }
}

def get_category_label(category, value):
    """Kategorik değişkenler için etiket döndürür"""
    try:
        return CATEGORY_LABELS.get(category, {}).get(value, f'Bilinmeyen ({value})')
    except:
        return f'Bilinmeyen ({value})'

def run_manova_test(df, factor, dependent_vars=['first_sem_grade', 'second_sem_grade']):
    """MANOVA testi uygular"""
    try:
        # DataFrame'de sütunların varlığını kontrol et
        if not all(var in df.columns for var in dependent_vars + [factor]):
            raise ValueError(f"Gerekli sütunlar eksik: {dependent_vars + [factor]}")
        
        # NaN değerleri temizle
        df_clean = df.dropna(subset=dependent_vars + [factor])
        
        # En az iki grup olduğunu kontrol et
        if len(df_clean[factor].unique()) < 2:
            return None, None, "Tek grup MANOVA için yetersiz"
        
        # MANOVA formülünü oluştur
        formula = f"{' + '.join(dependent_vars)} ~ {factor}"
        
        # MANOVA testini gerçekleştir
        manova = MANOVA.from_formula(formula, data=df_clean)
        result = manova.mv_test()
        
        return (
            result.results['Intercept']['stat'].iloc[0],
            result.results['Intercept']['P-value'].iloc[0],
            None
        )
    except Exception as e:
        return None, None, f"MANOVA testi sırasında hata: {str(e)}"

def format_results(results):
    """Sonuçları insan tarafından okunabilir formata dönüştürür"""
    formatted = {}
    
    for category, tests in results.items():
        formatted[category] = {}
        for test_name, test_results in tests.items():
            formatted_test = test_results.copy()
            
            if 'semester_differences' in test_results:
                formatted_differences = {}
                for group_id, diff_results in test_results['semester_differences'].items():
                    # Kategorik değişkenleri etiketlere dönüştür
                    if test_name == 'scholarship':
                        group_label = 'Burs alıyor' if int(group_id) == 1 else 'Burs almıyor'
                    elif test_name == 'attendance':
                        group_label = 'Gündüz' if int(group_id) == 1 else 'Akşam'
                    elif test_name == 'gender':
                        group_label = 'Erkek' if int(group_id) == 1 else 'Kadın'
                    elif test_name == 'previous_education':
                        group_label = CATEGORY_LABELS['Previous qualification'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'marital_status':
                        group_label = CATEGORY_LABELS['Marital Status'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'application_mode':
                        group_label = CATEGORY_LABELS['Application mode'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'international':
                        group_label = 'Uluslararası' if int(group_id) == 1 else 'Yerel'
                    elif test_name == 'debtor':
                        group_label = 'Borçlu' if int(group_id) == 1 else 'Borçsuz'
                    elif test_name == 'tuition':
                        group_label = 'Harç Güncel' if int(group_id) == 1 else 'Harç Güncel Değil'
                    else:
                        group_label = str(group_id)
                    
                    formatted_differences[group_label] = {
                        'semester_difference': round(diff_results['semester_difference'], 4) if diff_results['semester_difference'] is not None else None,
                        'tStat': round(diff_results['tStat'], 4) if diff_results['tStat'] is not None else None,
                        'pValue': diff_results['pValue'],
                        'interpretation': interpret_p_value(diff_results['pValue'])
                    }
                formatted_test['semester_differences'] = formatted_differences
            
            formatted[category][test_name] = formatted_test
    
    return formatted

def interpret_p_value(p_value):
    """p-değerini yorumlar"""
    if p_value is None:
        return "Analiz yapılamadı"
    try:
        p_value = float(p_value)
        if np.isnan(p_value):
            return "Analiz yapılamadı"
        elif p_value < 0.001:
            return "Çok güçlü istatistiksel anlamlılık (p < 0.001)"
        elif p_value < 0.01:
            return "Güçlü istatistiksel anlamlılık (p < 0.01)"
        elif p_value < 0.05:
            return "İstatistiksel olarak anlamlı (p < 0.05)"
        else:
            return "İstatistiksel olarak anlamlı değil (p > 0.05)"
    except (TypeError, ValueError):
        return "Analiz yapılamadı"

def analyze_academic_performance(df, group_var, group_values):
    """Akademik performans analizini gerçekleştirir"""
    results = {}
    
    try:
        # Grupları filtrele ve NaN değerleri temizle
        groups = []
        filtered_values = []
        for val in group_values:
            group_data = df[df[group_var] == val]['academic_performance'].dropna()
            if len(group_data) >= 2:  # En az 2 veri noktası gerekli
                groups.append(group_data)
                filtered_values.append(val)
        
        if len(groups) >= 2:  # En az 2 grup gerekli
            # ANOVA testi
            f_stat, p_val = stats.f_oneway(*groups)
            results['overall'] = {
                'fStat': float(f_stat) if not np.isnan(f_stat) else None,
                'pValue': float(p_val) if not np.isnan(p_val) else None
            }
        else:
            results['overall'] = {
                'fStat': None,
                'pValue': None,
                'error': 'Yetersiz grup sayısı'
            }
        
        # Dönemsel analizler
        first_sem_groups = []
        second_sem_groups = []
        for val in filtered_values:
            group_data = df[df[group_var] == val]
            first_sem = group_data['Curricular units 1st sem (grade)'].dropna()
            second_sem = group_data['Curricular units 2nd sem (grade)'].dropna()
            
            if len(first_sem) >= 2:
                first_sem_groups.append(first_sem)
            if len(second_sem) >= 2:
                second_sem_groups.append(second_sem)
        
        # İlk dönem ANOVA
        if len(first_sem_groups) >= 2:
            f_stat_1, p_val_1 = stats.f_oneway(*first_sem_groups)
            results['first_semester'] = {
                'fStat': float(f_stat_1) if not np.isnan(f_stat_1) else None,
                'pValue': float(p_val_1) if not np.isnan(p_val_1) else None
            }
        else:
            results['first_semester'] = {
                'fStat': None,
                'pValue': None,
                'error': 'Yetersiz grup sayısı'
            }
        
        # İkinci dönem ANOVA
        if len(second_sem_groups) >= 2:
            f_stat_2, p_val_2 = stats.f_oneway(*second_sem_groups)
            results['second_semester'] = {
                'fStat': float(f_stat_2) if not np.isnan(f_stat_2) else None,
                'pValue': float(p_val_2) if not np.isnan(p_val_2) else None
            }
        else:
            results['second_semester'] = {
                'fStat': None,
                'pValue': None,
                'error': 'Yetersiz grup sayısı'
            }
        
    except Exception as e:
        results = {
            'error': f'Analiz sırasında hata: {str(e)}'
        }
    
    return results

def analyze_semester_differences(group_var, group_values):
    """Dönemler arası farkları analiz eder"""
    results = {}
    
    for value in group_values:
        group_data = df[df[group_var] == value]
        
        # Grup boyutu kontrolü
        if len(group_data) < 2:
            results[str(value)] = {
                'semester_difference': float(np.mean(
                    group_data['Curricular units 2nd sem (grade)'] - 
                    group_data['Curricular units 1st sem (grade)']
                )) if len(group_data) > 0 else None,
                'tStat': None,
                'pValue': None
            }
            continue
            
        # NaN değerleri kontrol et
        first_sem = group_data['Curricular units 1st sem (grade)'].dropna()
        second_sem = group_data['Curricular units 2nd sem (grade)'].dropna()
        
        # Veri yeterliliği kontrolü
        if len(first_sem) < 2 or len(second_sem) < 2:
            results[str(value)] = {
                'semester_difference': float(np.mean(second_sem - first_sem)) if len(first_sem) > 0 and len(second_sem) > 0 else None,
                'tStat': None,
                'pValue': None
            }
            continue
        
        try:
            # Dönemler arası fark testi
            t_stat, p_val = stats.ttest_rel(first_sem, second_sem)
            
            results[str(value)] = {
                'semester_difference': float(np.mean(second_sem - first_sem)),
                'tStat': float(t_stat) if not np.isnan(t_stat) else None,
                'pValue': float(p_val) if not np.isnan(p_val) else None
            }
        except Exception as e:
            results[str(value)] = {
                'semester_difference': float(np.mean(second_sem - first_sem)) if len(first_sem) > 0 and len(second_sem) > 0 else None,
                'tStat': None,
                'pValue': None,
                'error': str(e)
            }
    
    return results

def run_hypothesis_tests():
    results = {
        'academic': {},
        'socioeconomic': {},
        'demographic': {},
        'enrollment': {}
    }
    
    # 1. Burs Etkisi Hipotezi
    results['academic']['scholarship'] = analyze_academic_performance(
        df, 'Scholarship holder', [0, 1]
    )
    results['academic']['scholarship'].update({
        'title': 'Burs Etkisi Hipotezi',
        'description': 'H0: Burs alan ve almayan öğrenciler arasında akademik başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Scholarship holder', [0, 1])
    })

    # 2. Gündüz/Gece Eğitimi Hipotezi
    results['academic']['attendance'] = analyze_academic_performance(
        df, 'Daytime/evening attendance\t', [0, 1]
    )
    results['academic']['attendance'].update({
        'title': 'Gündüz/Gece Eğitimi Hipotezi',
        'description': 'H0: Gündüz ve gece eğitimi alan öğrenciler arasında başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Daytime/evening attendance\t', [0, 1])
    })

    # 3. GDP Etkisi Hipotezi
    gdp_corr_1, p_val_1 = stats.pearsonr(df['GDP'], df['Curricular units 1st sem (grade)'])
    gdp_corr_2, p_val_2 = stats.pearsonr(df['GDP'], df['Curricular units 2nd sem (grade)'])
    gdp_corr_overall, p_val_overall = stats.pearsonr(df['GDP'], df['academic_performance'])
    
    results['socioeconomic']['gdp'] = {
        'title': 'GDP Etkisi Hipotezi',
        'description': 'H0: GDP ile akademik başarı arasında ilişki yoktur',
        'first_semester': {'correlation': float(gdp_corr_1), 'pValue': float(p_val_1)},
        'second_semester': {'correlation': float(gdp_corr_2), 'pValue': float(p_val_2)},
        'overall': {'correlation': float(gdp_corr_overall), 'pValue': float(p_val_overall)}
    }

    # 4. Cinsiyet Etkisi Hipotezi
    results['demographic']['gender'] = analyze_academic_performance(
        df, 'Gender', [0, 1]
    )
    results['demographic']['gender'].update({
        'title': 'Cinsiyet Etkisi Hipotezi',
        'description': 'H0: Kadın ve erkek öğrenciler arasında akademik başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Gender', [0, 1])
    })

    # 5. Yaş Etkisi Hipotezi
    age_corr_1, p_val_1 = stats.pearsonr(df['Age at enrollment'], df['Curricular units 1st sem (grade)'])
    age_corr_2, p_val_2 = stats.pearsonr(df['Age at enrollment'], df['Curricular units 2nd sem (grade)'])
    age_corr_overall, p_val_overall = stats.pearsonr(df['Age at enrollment'], df['academic_performance'])
    
    results['demographic']['age'] = {
        'title': 'Yaş Etkisi Hipotezi',
        'description': 'H0: Yaş ile akademik başarı arasında ilişki yoktur',
        'first_semester': {'correlation': float(age_corr_1), 'pValue': float(p_val_1)},
        'second_semester': {'correlation': float(age_corr_2), 'pValue': float(p_val_2)},
        'overall': {'correlation': float(age_corr_overall), 'pValue': float(p_val_overall)}
    }

    # 6. Önceki Eğitim Etkisi Hipotezi
    results['academic']['previous_education'] = analyze_academic_performance(
        df, 'Previous qualification', df['Previous qualification'].unique()
    )
    results['academic']['previous_education'].update({
        'title': 'Önceki Eğitim Etkisi Hipotezi',
        'description': 'H0: Farklı önceki eğitim seviyelerine sahip öğrenciler arasında akademik başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Previous qualification', df['Previous qualification'].unique())
    })

    # 7. Ebeveyn Eğitim Düzeyi İlişkisi
    mother_corr_1, m_p_val_1 = stats.pearsonr(df['Mother\'s qualification'], df['Curricular units 1st sem (grade)'])
    mother_corr_2, m_p_val_2 = stats.pearsonr(df['Mother\'s qualification'], df['Curricular units 2nd sem (grade)'])
    father_corr_1, f_p_val_1 = stats.pearsonr(df['Father\'s qualification'], df['Curricular units 1st sem (grade)'])
    father_corr_2, f_p_val_2 = stats.pearsonr(df['Father\'s qualification'], df['Curricular units 2nd sem (grade)'])
    
    results['socioeconomic']['parent_education'] = {
        'title': 'Ebeveyn Eğitim Düzeyi Etkisi',
        'description': 'H0: Ebeveynlerin eğitim düzeyi ile öğrencinin akademik başarısı arasında ilişki yoktur',
        'mother': {
            'first_semester': {'correlation': float(mother_corr_1), 'pValue': float(m_p_val_1)},
            'second_semester': {'correlation': float(mother_corr_2), 'pValue': float(m_p_val_2)}
        },
        'father': {
            'first_semester': {'correlation': float(father_corr_1), 'pValue': float(f_p_val_1)},
            'second_semester': {'correlation': float(father_corr_2), 'pValue': float(f_p_val_2)}
        }
    }

    # 8. Medeni Durum Etkisi Hipotezi
    results['demographic']['marital_status'] = analyze_academic_performance(
        df, 'Marital status', df['Marital status'].unique()
    )
    results['demographic']['marital_status'].update({
        'title': 'Medeni Durum Etkisi Hipotezi',
        'description': 'H0: Medeni durum grupları arasında akademik başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Marital status', df['Marital status'].unique())
    })

    # 9. Uluslararası Öğrenci Etkisi Hipotezi
    results['demographic']['international'] = analyze_academic_performance(
        df, 'International', [0, 1]
    )
    results['demographic']['international'].update({
        'title': 'Uluslararası Öğrenci Etkisi Hipotezi',
        'description': 'H0: Uluslararası ve yerel öğrenciler arasında başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('International', [0, 1])
    })

    # 10. Borç Durumu Etkisi Hipotezi
    results['socioeconomic']['debtor'] = analyze_academic_performance(
        df, 'Debtor', [0, 1]
    )
    results['socioeconomic']['debtor'].update({
        'title': 'Borç Durumu Etkisi Hipotezi',
        'description': 'H0: Borçlu ve borçsuz öğrenciler arasında başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Debtor', [0, 1])
    })

    # 11. Harç Ödeme Durumu Etkisi Hipotezi
    results['socioeconomic']['tuition'] = analyze_academic_performance(
        df, 'Tuition fees up to date', [0, 1]
    )
    results['socioeconomic']['tuition'].update({
        'title': 'Harç Ödeme Durumu Etkisi Hipotezi',
        'description': 'H0: Harç ödemesi düzenli olan ve olmayan öğrenciler arasında başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Tuition fees up to date', [0, 1])
    })

    # 12. Başvuru Şekli Etkisi Hipotezi
    results['enrollment']['application_mode'] = analyze_academic_performance(
        df, 'Application mode', df['Application mode'].unique()
    )
    results['enrollment']['application_mode'].update({
        'title': 'Başvuru Şekli Etkisi Hipotezi',
        'description': 'H0: Farklı başvuru şekilleri arasında akademik başarı farkı yoktur',
        'semester_differences': analyze_semester_differences('Application mode', df['Application mode'].unique())
    })

    return results

# Sonuçları yazdırma fonksiyonu
def print_results(results):
    """Sonuçları insan tarafından okunabilir formata dönüştürür"""
    formatted_results = {}
    
    for category, tests in results.items():
        formatted_results[category] = {}
        for test_name, test_results in tests.items():
            formatted_test = test_results.copy()
            
            if 'semester_differences' in test_results:
                formatted_differences = {}
                for group_id, diff_results in test_results['semester_differences'].items():
                    # Kategorik değişkenleri etiketlere dönüştür
                    if test_name == 'application_mode':
                        group_label = CATEGORY_LABELS['Application mode'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'marital_status':
                        group_label = CATEGORY_LABELS['Marital Status'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'course':
                        group_label = CATEGORY_LABELS['Course'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'mother_occupation' or test_name == 'father_occupation':
                        group_label = CATEGORY_LABELS['Mother/Father occupation'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'previous_qualification':
                        group_label = CATEGORY_LABELS['Previous qualification'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    elif test_name == 'nationality':
                        group_label = CATEGORY_LABELS['Nacionality'].get(int(group_id), f'Bilinmeyen ({group_id})')
                    else:
                        # Diğer ikili değişkenler için (0/1)
                        group_label = 'Evet' if int(group_id) == 1 else 'Hayır'
                    
                    formatted_differences[group_label] = {
                        'semester_difference': round(diff_results['semester_difference'], 4) if diff_results['semester_difference'] is not None else None,
                        'tStat': round(diff_results['tStat'], 4) if diff_results['tStat'] is not None else None,
                        'pValue': diff_results['pValue'],
                        'interpretation': interpret_p_value(diff_results['pValue'])
                    }
                formatted_test['semester_differences'] = formatted_differences
            
            formatted_results[category][test_name] = formatted_test
    
    return formatted_results

# Ana kod sonunda
test_results = run_hypothesis_tests()

# Sonuçları JSON formatında kaydet
with open('hypothesis_results.json', 'w', encoding='utf-8') as f:
    json.dump(format_results(test_results), f, indent=4, ensure_ascii=False)

# Sonuçları yazdır
print_results(test_results)