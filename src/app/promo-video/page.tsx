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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHero } from '@/components/layout/page-hero';
import {
  generatePromoVideo,
  type GeneratePromoVideoOutput,
} from '@/ai/flows/generate-promo-video-flow';
import { Loader2, Sparkles, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  prompt: z.string().min(15, { message: 'Please provide a detailed prompt for the video.' }),
});

export default function PromoVideoPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratePromoVideoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: 'A short video showing diverse healthcare professionals collaborating and learning in a modern setting, with advanced medical technology visuals.',
    },
  });
  
  const pageHeroImage = PlaceHolderImages.find(p => p.id === 'page-promo-video');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generatePromoVideo(values);
      setResult(response);
    } catch (e) {
      setError('Failed to generate video. The AI model may be under heavy load. Please try again in a few moments.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1">
      <PageHero
        title="AI Promo Video Generator"
        description="Create stunning promotional videos for your courses with a simple text prompt."
        image={pageHeroImage}
      />
      
      <div className="p-4 md:p-8 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Video Prompt</CardTitle>
            <CardDescription>
              Describe the video you want to create. Be descriptive for the best results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'A cinematic shot of a an old car driving down a deserted road at sunset.'"
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Video
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && (
          <div className="mt-8 text-center text-muted-foreground">
            <Loader2 className="mx-auto animate-spin h-12 w-12" />
            <p className="mt-4 text-lg">AI is generating your video. This can take up to a minute...</p>
          </div>
        )}

        {error && <p className="mt-8 text-destructive text-center">{error}</p>}

        {result && (
          <div className="mt-8 space-y-8">
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 text-primary" />
                  Your Generated Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden border">
                    <video
                        src={result.videoUrl}
                        poster={result.posterUrl}
                        controls
                        className="w-full h-full"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
