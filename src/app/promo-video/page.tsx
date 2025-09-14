'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Video } from 'lucide-react';
import { generatePromoVideo, type GeneratePromoVideoOutput } from '@/ai/flows/generate-promo-video-flow';
import { useToast } from '@/hooks/use-toast';

export default function PromoVideoPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratePromoVideoOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateVideo = async () => {
    setLoading(true);
    setResult(null);
    toast({
      title: '🎬 Video Generation Started',
      description: 'Your promo video is being created. This may take a minute or two. Please stay on the page.',
    });
    try {
      const response = await generatePromoVideo();
      setResult(response);
      toast({
        title: '✅ Video Ready!',
        description: 'Your promotional video has been successfully generated.',
      });
    } catch (e: any) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: `Could not generate video: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="AI Promo Video Generator"
        description="Create a promotional video for MediConnect Academy using AI."
      />
      <Card>
        <CardHeader>
          <CardTitle>Generate Video</CardTitle>
          <CardDescription>
            Click the button below to start the AI video generation process.
            This may take up to two minutes. Veo models have low rate limits, so the likelihood of getting an error is high, please retry if it fails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateVideo} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Generate Promo Video
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && result.videoDataUri && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Generated Video</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full">
                    <video
                        src={result.videoDataUri}
                        controls
                        className="w-full h-full rounded-lg"
                    />
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
