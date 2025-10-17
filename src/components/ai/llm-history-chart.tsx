
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Stethoscope } from 'lucide-react';

type Model = {
  name: string;
  type: 'base' | 'medical';
};

type YearData = {
  year: number;
  models: Model[];
};

const llmData: YearData[] = [
  {
    year: 2023,
    models: [
      { name: 'MedPrompt', type: 'medical' },
      { name: 'MEDITRON', type: 'medical' },
      { name: 'LLaMA2', type: 'base' },
      { name: 'MedPaLM2', type: 'medical' },
      { name: 'PMC-LLaMA', type: 'medical' },
      { name: 'ChatDoctor', type: 'medical' },
      { name: 'DoctorGLM', type: 'medical' },
      { name: 'ChatGLM', type: 'base' },
    ],
  },
  {
    year: 2022,
    models: [
      { name: 'Gatortron', type: 'medical' },
      { name: 'BioGPT', type: 'medical' },
      { name: 'MedPaLM', type: 'medical' },
      { name: 'PaLM', type: 'base' },
      { name: 'ChatGPT', type: 'base' },
      { name: 'LLaMA', type: 'base' },
      { name: 'Bloom', type: 'base' },
    ],
  },
  {
    year: 2021,
    models: [
        { name: 'PubmedBERT', type: 'medical' },
    ],
  },
  {
    year: 2020,
    models: [
        { name: 'GPT3', type: 'base' },
        { name: 'BlueBERT', type: 'medical' }
    ],
  },
    {
    year: 2019,
    models: [
        { name: 'BioBERT', type: 'medical' },
        { name: 'SciBERT', type: 'medical' },
        { name: 'ClinicalBERT', type: 'medical' },
        { name: 'GPT2', type: 'base' },
        { name: 'BERT', type: 'base' },
    ],
  },
];

export function LLMHistoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline of Medical Language Models</CardTitle>
        <CardDescription>An overview of key open-domain and medical-specific LLMs by year of introduction.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-blue-500" /><span>Open-domain Base Model</span></div>
            <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-green-500" /><span>Medical Application</span></div>
        </div>
        <div className="relative pl-6">
          <div className="absolute left-[30px] h-full w-0.5 bg-border -translate-x-1/2"></div>
          {llmData.map(({ year, models }) => (
            <div key={year} className="mb-8 pl-8 relative">
              <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12">
                  <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-background"></div>
                  <span className="absolute left-14 text-lg font-bold text-primary">{year}</span>
              </div>
              <div className="pt-2.5 flex flex-wrap gap-2">
                {models.map((model) => (
                  <Badge key={model.name} variant={model.type === 'base' ? 'default' : 'secondary'} className="text-sm">
                    {model.type === 'base' ? 
                        <Cpu className="h-3 w-3 mr-1.5" /> : 
                        <Stethoscope className="h-3 w-3 mr-1.5" />
                    }
                    {model.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
