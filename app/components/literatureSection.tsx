'use client'
import { Card, Title, Text } from "@tremor/react"
import { relatedWorks } from "@/app/constants/index"

export function LiteratureSection() {
  return (
    <section id="literature" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Title className="text-gray-100 text-3xl font-bold mb-8 text-center">
          İlgili Akademik Çalışmalar
        </Title>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedWorks.map((work: any, index: number) => (
            <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30">
              <Title className="text-gray-100 text-lg">{work.title}</Title>
              <Text className="text-gray-400 text-xs italic mt-1">{work.englishTitle}</Text>
              <Text className="text-gray-400 text-sm mt-2">{work.authors}</Text>
              <Text className="text-gray-500 mt-4 text-sm">{work.description}</Text>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 