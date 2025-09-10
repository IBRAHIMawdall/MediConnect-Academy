
import Image from 'next/image';
import { PageHeader } from '@/components/layout/page-header';
import { LLMHistoryChart } from '@/components/ai/llm-history-chart';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AiInMedicinePage() {
  const llmHistoryImage = PlaceHolderImages.find(p => p.id === 'llm-history');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="The History of Medical LLMs"
        description="A visual timeline of Large Language Models in the medical field."
      />
      <div className="grid gap-8">
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg border">
            {llmHistoryImage && (
                <Image
                    src={llmHistoryImage.imageUrl}
                    alt={llmHistoryImage.description}
                    width={1200}
                    height={900}
                    className="object-contain w-full h-full"
                    data-ai-hint={llmHistoryImage.imageHint}
                />
            )}
        </div>
        <LLMHistoryChart />
      </div>
    </div>
  );
}
