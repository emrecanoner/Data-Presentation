'use client'

export function AIPredictionSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">AI Tahmin Doğruluğu</h3>
        <div className="flex items-center justify-between">
          <div className="text-gray-400">Model Doğruluk Oranı</div>
          <div className="text-emerald-400 font-semibold">%87.5</div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '87.5%' }}></div>
        </div>
      </div>

      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">Risk Faktörleri</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400">Düşük Katılım</div>
            <div className="text-red-400 font-semibold">%35</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-400">Akademik Performans</div>
            <div className="text-yellow-400 font-semibold">%25</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-400">Sosyal Faktörler</div>
            <div className="text-blue-400 font-semibold">%40</div>
          </div>
        </div>
      </div>
    </div>
  )
} 