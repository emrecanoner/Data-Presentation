import * as tf from '@tensorflow/tfjs';
import { StudentData } from '../types/analytics';
import { ModelManager } from './modelManager';

export class AIPredictor {
  private modelManager: ModelManager;
  private previousPredictions: number[] = [];

  constructor() {
    this.modelManager = ModelManager.getInstance();
  }

  public async predictSuccess(data: StudentData[]): Promise<{
    currentPrediction: {
      graduationProbability: number;
      changeFromPrevious: number;
    };
    featureImportance: Array<{
      feature: string;
      value: number;
    }>;
  }> {
    try {
      const model = await this.modelManager.getModel();
      const features = this.prepareFeatures(data);
      const predictions = await this.makePredictions(model, features);
      const importance = await this.calculateFeatureImportance(model, features);

      // Son tahmini kaydet
      const currentProb = predictions[predictions.length - 1];
      this.previousPredictions.push(currentProb);

      // Değişim oranını hesapla
      const previousProb = this.previousPredictions.length > 1 
        ? this.previousPredictions[this.previousPredictions.length - 2]
        : currentProb;

      return {
        currentPrediction: {
          graduationProbability: Number((currentProb * 100).toFixed(1)),
          changeFromPrevious: Number(((currentProb - previousProb) * 100).toFixed(1))
        },
        featureImportance: importance
      };

    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }

  private prepareFeatures(data: StudentData[]): tf.Tensor2D {
    const features = data.map(student => [
      parseFloat(student['Curricular units 1st sem (grade)']) || 0,
      parseFloat(student['Curricular units 2nd sem (grade)']) || 0,
      parseInt(student['Curricular units 1st sem (evaluations)']) || 0,
      parseInt(student['Age at enrollment']) || 0,
      student['Scholarship holder'] === '1' ? 1 : 0,
      parseInt(student['Curricular units 1st sem (approved)']) || 0,
      parseInt(student['Curricular units 2nd sem (approved)']) || 0,
      parseFloat(student['Unemployment rate']) || 0
    ]);

    return tf.tensor2d(features);
  }

  private async makePredictions(
    model: tf.LayersModel, 
    features: tf.Tensor2D
  ): Promise<number[]> {
    const predictions = model.predict(features) as tf.Tensor;
    const predictionArray = await predictions.array() as number[][];
    
    // Temizlik
    predictions.dispose();
    features.dispose();

    return predictionArray.map(p => p[0]);
  }

  private async calculateFeatureImportance(
    model: tf.LayersModel, 
    features: tf.Tensor2D
  ): Promise<Array<{ feature: string; value: number }>> {
    const featureNames = [
      '1. Dönem Not Ortalaması',
      '2. Dönem Not Ortalaması',
      'Sınav Sayısı',
      'Yaş',
      'Burs Durumu',
      '1. Dönem Başarılı Ders',
      '2. Dönem Başarılı Ders',
      'İşsizlik Oranı'
    ];

    const baselinePred = await this.makePredictions(model, features);
    const importance: number[] = [];

    // Her özellik için önem derecesini hesapla
    for (let i = 0; i < features.shape[1]; i++) {
      const permutedFeatures = await this.permuteFeature(features, i);
      const permutedPred = await this.makePredictions(model, permutedFeatures);
      
      // Önem derecesi: baseline ve permüte edilmiş tahminler arasındaki fark
      const diff = baselinePred.map((b, j) => Math.abs(b - permutedPred[j]));
      importance.push(tf.mean(diff).dataSync()[0]);
      
      permutedFeatures.dispose();
    }

    // Normalize et
    const sum = importance.reduce((a, b) => a + b, 0);
    const normalizedImportance = importance.map(v => v / sum);

    return featureNames.map((name, i) => ({
      feature: name,
      value: Number(normalizedImportance[i].toFixed(3))
    })).sort((a, b) => b.value - a.value);
  }

  private async permuteFeature(
    features: tf.Tensor2D, 
    featureIndex: number
  ): Promise<tf.Tensor2D> {
    const values = await features.array();
    const column = values.map(row => row[featureIndex]);
    const shuffled = tf.util.shuffle(column);
    
    return tf.tensor2d(values.map((row, i) => {
      const newRow = [...row];
      newRow[featureIndex] = shuffled[i];
      return newRow;
    }));
  }

  public dispose(): void {
    this.previousPredictions = [];
  }
}

// Export singleton instance
export const aiPredictor = new AIPredictor(); 