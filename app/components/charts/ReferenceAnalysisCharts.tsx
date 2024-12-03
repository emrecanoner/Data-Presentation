'use client'
import { BarChart, Card, Title, Text } from "@tremor/react"

export function DetailedModelPerformanceChart() {
  const modelData = [
    {
      technique: "SMOTE",
      model: "Random Forest",
      "CV Mean Accuracy": 76.55,
      "Test Accuracy": 76.38,
      "Macro F1": 71.00,
      "Weighted F1": 76.00
    },
    {
      technique: "ADASYN",
      model: "Random Forest",
      "CV Mean Accuracy": 76.66,
      "Test Accuracy": 76.27,
      "Macro F1": 70.00,
      "Weighted F1": 76.00
    },
    {
      technique: "SMOTE Tomek",
      model: "Random Forest",
      "CV Mean Accuracy": 76.99,
      "Test Accuracy": 75.37,
      "Macro F1": 69.00,
      "Weighted F1": 75.00
    },
    {
      technique: "SVM SMOTE",
      model: "Random Forest",
      "CV Mean Accuracy": 77.22,
      "Test Accuracy": 76.38,
      "Macro F1": 69.00,
      "Weighted F1": 76.00
    }
  ]

  return (
    <div className="space-y-6">
      <BarChart
        className="h-80"
        data={modelData}
        index="technique"
        categories={["CV Mean Accuracy", "Test Accuracy", "Macro F1", "Weighted F1"]}
        colors={["blue", "purple", "green", "rose"]}
        valueFormatter={(number) => `${number.toFixed(2)}%`}
        yAxisWidth={56}
      />
    </div>
  )
}

export function ConfusionMatrixVisualization() {
  const matrices = [
    {
      title: "Random Forest with SVM SMOTE",
      data: [
        { actual: "Dropout (0)", predicted0: 246, predicted1: 26, predicted2: 44 },
        { actual: "Enrolled (1)", predicted0: 35, predicted1: 60, predicted2: 56 },
        { actual: "Graduate (2)", predicted0: 17, predicted1: 31, predicted2: 370 }
      ]
    },
    {
      title: "Random Forest with SMOTE",
      data: [
        { actual: "Dropout (0)", predicted0: 236, predicted1: 37, predicted2: 43 },
        { actual: "Enrolled (1)", predicted0: 28, predicted1: 73, predicted2: 50 },
        { actual: "Graduate (2)", predicted0: 14, predicted1: 37, predicted2: 367 }
      ]
    }
  ]

  return (
    <div className="space-y-12">
      {matrices.map((matrix, idx) => (
        <div key={idx} className="p-4">
          <Title className="text-center mb-6 text-gray-100">{matrix.title}</Title>
          <div className="grid grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
            <div className="font-medium text-gray-300 flex items-center justify-center">Actual ↓ Predicted →</div>
            <div className="font-medium text-gray-300 flex items-center justify-center">Class 0</div>
            <div className="font-medium text-gray-300 flex items-center justify-center">Class 1</div>
            <div className="font-medium text-gray-300 flex items-center justify-center">Class 2</div>
            
            {matrix.data.map((row, rowIdx) => (
              <>
                <div className="font-medium text-gray-300 flex items-center justify-center">{row.actual}</div>
                <div className={`p-3 rounded flex items-center justify-center ${row.predicted0 > 200 ? 'bg-green-500/20' : 'bg-gray-700/20'} text-gray-200`}>
                  {row.predicted0}
                </div>
                <div className={`p-3 rounded flex items-center justify-center ${row.predicted1 > 60 ? 'bg-green-500/20' : 'bg-gray-700/20'} text-gray-200`}>
                  {row.predicted1}
                </div>
                <div className={`p-3 rounded flex items-center justify-center ${row.predicted2 > 200 ? 'bg-green-500/20' : 'bg-gray-700/20'} text-gray-200`}>
                  {row.predicted2}
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ClassificationMetricsChart() {
  const metricsData = [
    {
      model: "RF + SVM SMOTE",
      class: "Dropout (0)",
      precision: 0.83,
      recall: 0.78,
      f1Score: 0.80
    },
    {
      model: "RF + SVM SMOTE",
      class: "Enrolled (1)",
      precision: 0.51,
      recall: 0.40,
      f1Score: 0.45
    },
    {
      model: "RF + SVM SMOTE",
      class: "Graduate (2)",
      precision: 0.79,
      recall: 0.89,
      f1Score: 0.83
    },
    {
      model: "RF + SMOTE",
      class: "Dropout (0)",
      precision: 0.85,
      recall: 0.75,
      f1Score: 0.79
    },
    {
      model: "RF + SMOTE",
      class: "Enrolled (1)",
      precision: 0.50,
      recall: 0.48,
      f1Score: 0.49
    },
    {
      model: "RF + SMOTE",
      class: "Graduate (2)",
      precision: 0.80,
      recall: 0.88,
      f1Score: 0.84
    }
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {["RF + SVM SMOTE", "RF + SMOTE"].map((model) => (
          <div key={model}>
            <Title className="text-center mb-4 text-gray-100">{model}</Title>
            <BarChart
              className="h-64"
              data={metricsData.filter(d => d.model === model)}
              index="class"
              categories={["precision", "recall", "f1Score"]}
              colors={["emerald", "indigo", "amber"]}
              valueFormatter={(number) => `${(number * 100).toFixed(1)}%`}
              yAxisWidth={56}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 