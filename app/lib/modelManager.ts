import * as tf from '@tensorflow/tfjs';

export class ModelManager {
  private static instance: ModelManager;
  private model: tf.LayersModel | null = null;
  private modelPromise: Promise<tf.LayersModel> | null = null;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): ModelManager {
    if (!ModelManager.instance) {
      ModelManager.instance = new ModelManager();
    }
    return ModelManager.instance;
  }

  public async getModel(): Promise<tf.LayersModel> {
    if (this.model && this.isInitialized) {
      return this.model;
    }

    if (this.modelPromise) {
      return this.modelPromise;
    }

    this.modelPromise = this.initializeModel();
    const model = await this.modelPromise;
    this.isInitialized = true;
    return model;
  }

  private async initializeModel(): Promise<tf.LayersModel> {
    try {
      await tf.ready();
      
      if (this.model) {
        this.model.dispose();
      }

      const model = tf.sequential();
      
      // Input layer
      model.add(tf.layers.dense({
        units: 64,
        activation: 'relu',
        inputShape: [8],
        name: 'input_layer'
      }));

      // Hidden layers
      model.add(tf.layers.dropout({ rate: 0.2 }));
      model.add(tf.layers.dense({
        units: 32,
        activation: 'relu',
        name: 'hidden_layer_1'
      }));

      model.add(tf.layers.dropout({ rate: 0.2 }));
      model.add(tf.layers.dense({
        units: 16,
        activation: 'relu',
        name: 'hidden_layer_2'
      }));

      // Output layer
      model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
        name: 'output_layer'
      }));

      model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      });

      this.model = model;
      return model;

    } catch (error) {
      console.error('Model initialization error:', error);
      throw error;
    }
  }

  public async dispose(): Promise<void> {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      this.isInitialized = false;
      this.modelPromise = null;
    }
  }
} 