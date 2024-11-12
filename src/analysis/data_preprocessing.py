import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

class DataPreprocessor:
    def __init__(self, file_path):
        self.data = pd.read_csv(file_path, sep=';')
        self.label_encoders = {}
        
    def clean_data(self):
        # Sütun isimlerini düzenleme
        self.data.columns = [col.strip() for col in self.data.columns]
        
        # Eksik değerleri doldurma
        numeric_columns = self.data.select_dtypes(include=[np.number]).columns
        self.data[numeric_columns] = self.data[numeric_columns].fillna(self.data[numeric_columns].mean())
        
        # Kategorik değişkenleri encode etme
        categorical_columns = self.data.select_dtypes(include=['object']).columns
        for col in categorical_columns:
            self.label_encoders[col] = LabelEncoder()
            self.data[col] = self.label_encoders[col].fit_transform(self.data[col].astype(str))
            
        return self.data
    
    def create_temporal_features(self):
        """
        1. ve 2. dönem verilerini karşılaştırarak zamansal özellikler oluşturur
        """
        # Performans değişimi
        self.data['grade_change'] = (
            self.data['Curricular units 2nd sem (grade)'] - 
            self.data['Curricular units 1st sem (grade)']
        )
        
        # Onaylanan ders sayısı değişimi
        self.data['approved_units_change'] = (
            self.data['Curricular units 2nd sem (approved)'] - 
            self.data['Curricular units 1st sem (approved)']
        )
        
        # Değerlendirme sayısı değişimi
        self.data['evaluations_change'] = (
            self.data['Curricular units 2nd sem (evaluations)'] - 
            self.data['Curricular units 1st sem (evaluations)']
        )
        
        # Başarı oranı değişimi
        self.data['success_rate_change'] = (
            self.data['Curricular units 2nd sem (approved)'] / 
            self.data['Curricular units 2nd sem (enrolled)']
        ) - (
            self.data['Curricular units 1st sem (approved)'] / 
            self.data['Curricular units 1st sem (enrolled)']
        )
        
        return self.data
    
    def split_semester_data(self):
        """
        Veriyi 1. ve 2. dönem olarak ayırır
        """
        first_sem_cols = [col for col in self.data.columns if '1st sem' in col]
        second_sem_cols = [col for col in self.data.columns if '2nd sem' in col]
        
        common_cols = [col for col in self.data.columns 
                      if '1st sem' not in col and '2nd sem' not in col]
        
        first_sem_data = self.data[common_cols + first_sem_cols]
        second_sem_data = self.data[common_cols + second_sem_cols]
        
        return first_sem_data, second_sem_data
    
    def prepare_data(self):
        """
        Tüm ön işleme adımlarını sırayla uygular
        """
        self.clean_data()
        self.create_temporal_features()
        return self.split_semester_data() 