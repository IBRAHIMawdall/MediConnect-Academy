'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHero } from '@/components/layout/page-hero';
import { VideoPreview } from '@/components/ui/video-preview';
import { explainTopic, type ExplainTopicOutput } from '@/ai/flows/explain-topic-flow';
import { Loader2, Zap, BrainCircuit, BookText, Video, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const explainerFormSchema = z.object({
  topic: z.string().min(3, { message: 'Please enter a topic to explain.' }),
  generateVideo: z.boolean().default(true),
  duration: z.enum(['short', 'medium', 'long']).default('medium'),
  style: z.enum(['educational', 'presentation', 'tutorial', 'overview']).default('educational'),
  targetAudience: z.enum(['students', 'professionals', 'general']).default('professionals'),
});

type VideoScene = {
  sceneNumber: number;
  duration: string;
  narration: string;
  visualDescription: string;
  keyPoints: string[];
  transitionNote?: string;
};

type VideoGenerationResult = {
  title: string;
  description: string;
  totalDuration: string;
  scenes: VideoScene[];
  voiceOverScript: string;
  visualElements: string[];
  keyTakeaways: string[];
  callToAction?: string;
};

const MindMap = ({ markdown }: { markdown: string }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-full">
      <ReactMarkdown
        components={{
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="text-muted-foreground" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default function ExplainerPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'explanation' | 'video'>('input');
  const [explanation, setExplanation] = useState<ExplainTopicOutput | null>(null);
  const [videoResult, setVideoResult] = useState<VideoGenerationResult | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const pageHeroImage = PlaceHolderImages.find(p => p.id === 'page-explainer');

  const form = useForm<z.infer<typeof explainerFormSchema>>({
    resolver: zodResolver(explainerFormSchema),
    defaultValues: {
      topic: '',
      generateVideo: true,
      duration: 'medium',
      style: 'educational',
      targetAudience: 'professionals',
    },
  });

  async function onSubmit(values: z.infer<typeof explainerFormSchema>) {
    setLoading(true);
    setError(null);
    setStep('explanation');

    try {
      // Step 1: Get text explanation
      const explanationResponse = await explainTopic({ topic: values.topic });
      setExplanation(explanationResponse);

      // Step 2: Generate video if requested
      if (values.generateVideo) {
        setIsGeneratingVideo(true);
        setStep('video');

        // Generate video script
        const videoResponse = await fetch('/api/video-generator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            textContent: explanationResponse.explanation,
            topic: values.topic,
            duration: values.duration,
            style: values.style,
            targetAudience: values.targetAudience,
          }),
        });

        const videoData = await videoResponse.json();

        if (!videoResponse.ok) {
          throw new Error(videoData.error || 'Failed to generate video');
        }

        setVideoResult(videoData.videoScript);
        
        // Simulate actual video file generation (replace with real video generation)
        setTimeout(() => {
          setGeneratedVideoUrl('/af40c147-5145-428e-a761-1c030c950feb.mp4'); // Use existing video for demo
          setIsGeneratingVideo(false);
        }, 3000);
      }
    } catch (e) {
      setError('Failed to generate content. Please try again.');
      console.error(e);
      setStep('input');
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setStep('input');
    setExplanation(null);
    setVideoResult(null);
    setGeneratedVideoUrl(null);
    setIsGeneratingVideo(false);
    setError(null);
    form.reset();
  };

  const downloadVideo = () => {
    if (generatedVideoUrl) {
      const link = document.createElement('a');
      link.href = generatedVideoUrl;
      link.download = `${form.getValues('topic')}-explanation-video.mp4`;
      link.click();
    }
  };

  return (
    <div className="flex-1">
      <PageHero
        title="AI-Powered Medical Explainer"
        description="Enter any medical topic to get a comprehensive explanation and an AI-generated educational video with animations and visual guidance."
        image={pageHeroImage}
      />
      
      <div className="p-4 md:p-8 space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className={`flex items-center space-x-2 ${step === 'input' ? 'text-primary' : (step === 'explanation' || step === 'video') ? 'text-green-600' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'input' ? 'bg-primary text-white' : (step === 'explanation' || step === 'video') ? 'bg-green-600 text-white' : 'bg-muted'}`}>
              1
            </div>
            <span className="font-medium">Enter Topic</span>
          </div>
          
          <ArrowRight className="text-muted-foreground" />
          
          <div className={`flex items-center space-x-2 ${step === 'explanation' ? 'text-primary' : step === 'video' ? 'text-green-600' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'explanation' ? 'bg-primary text-white' : step === 'video' ? 'bg-green-600 text-white' : 'bg-muted'}`}>
              2
            </div>
            <span className="font-medium">Get Explanation</span>
          </div>
          
          <ArrowRight className="text-muted-foreground" />
          
          <div className={`flex items-center space-x-2 ${step === 'video' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'video' ? 'bg-primary text-white' : 'bg-muted'}`}>
              3
            </div>
            <span className="font-medium">Generate Video</span>
          </div>
        </div>

        {/* Input Form */}
        {step === 'input' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 text-primary" />
                What would you like to learn about?
              </CardTitle>
              <CardDescription>
                Enter any medical topic and I'll create a comprehensive explanation with an educational video.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Topic</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., SSRI Mechanism of Action, Diabetes Pathophysiology, Heart Failure..."
                            {...field}
                            className="text-lg p-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="short">Short (1-2 min)</SelectItem>
                              <SelectItem value="medium">Medium (3-5 min)</SelectItem>
                              <SelectItem value="long">Long (6-10 min)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Style</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="educational">Educational</SelectItem>
                              <SelectItem value="presentation">Presentation</SelectItem>
                              <SelectItem value="tutorial">Tutorial</SelectItem>
                              <SelectItem value="overview">Overview</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="students">Students</SelectItem>
                              <SelectItem value="professionals">Professionals</SelectItem>
                              <SelectItem value="general">General Public</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full text-lg py-6">
                    {loading ? (
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    ) : (
                      <Zap className="mr-2 h-5 w-5" />
                    )}
                    Generate Explanation & Video
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="max-w-2xl mx-auto border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">{error}</p>
              <Button variant="outline" onClick={resetForm} className="w-full mt-4">
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && step === 'explanation' && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Loader2 className="animate-spin h-12 w-12 mx-auto text-primary" />
                <p className="text-lg font-medium">Generating explanation...</p>
                <p className="text-muted-foreground">AI is analyzing your topic and creating a comprehensive explanation</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Explanation Results */}
        {explanation && step !== 'input' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Explanation Results</h2>
              <Button variant="outline" onClick={resetForm}>
                <RotateCcw className="mr-2 h-4 w-4" />
                New Topic
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookText className="mr-2 text-primary" />
                    Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">{explanation.explanation}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BrainCircuit className="mr-2 text-primary" />
                    Mind Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MindMap markdown={explanation.mindMap} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Video Generation & Preview */}
        {step === 'video' && (
          <div className="space-y-6">
            <Separator />
            
            <h2 className="text-2xl font-bold text-center">Educational Video</h2>
            
            <VideoPreview
              videoUrl={generatedVideoUrl || undefined}
              title={videoResult?.title || 'Educational Video'}
              description={videoResult?.description}
              isGenerating={isGeneratingVideo}
              onDownload={generatedVideoUrl ? downloadVideo : undefined}
            />

            {videoResult && !isGeneratingVideo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 text-primary" />
                    Video Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Duration:</strong> {videoResult.totalDuration}
                    </div>
                    <div>
                      <strong>Scenes:</strong> {videoResult.scenes.length}
                    </div>
                  </div>
                  
                  <div>
                    <strong>Key Learning Objectives:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {videoResult.keyTakeaways.map((takeaway, index) => (
                        <li key={index} className="text-muted-foreground">{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
