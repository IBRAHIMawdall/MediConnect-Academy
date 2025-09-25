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
import { PageHeader } from '@/components/layout/page-header';
import { generatePromoVideo, type GeneratePromoVideoOutput } from '@/ai/flows/generate-promo-video-flow';
import { Loader2, Video, Clapperboard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  script: z.string().min(20, { message: 'Please enter a script of at least 20 characters.' }),
});

export default function PromoVideoPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratePromoVideoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      script: 'A cinematic shot of a futuristic medical lab, with glowing DNA helices and doctors collaborating around a holographic display.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generatePromoVideo(values);
      setResult(response);
    } catch (e: any) {
      setError(`Failed to generate video. ${e.message || ''}`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="AI Promo Video Generator"
        description="Create a compelling promotional video for your course using AI."
      />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Video Script</CardTitle>
            <CardDescription>
              Describe the scene you want to generate. Be as descriptive as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="script"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Scene Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'A majestic eagle soaring over a snow-capped mountain range at sunrise.'"
                          className="resize-y min-h-[100px]"
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
                    <Clapperboard className="mr-2 h-4 w-4" />
                  )}
                  Generate Video
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && (
          <div className="mt-8 text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <Loader2 className="mx-auto animate-spin h-12 w-12 text-primary" />
            <p className="mt-4 text-lg font-semibold">AI is creating your video...</p>
            <p className="text-sm">This can take a minute or two. Please be patient.</p>
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
                    Your Generated Promo Video
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.videoDataUri ? (
                    <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
                        <video
                            src={result.videoDataUri}
                            controls
                            className="w-full h-full object-contain"
                        />
                    </div>
                  ) : (
                    <p className="text-muted-foreground">The AI could not generate a video for this script.</p>
                  )}
                </CardContent>
              </Card>
          </div>
        )}
      </div>
    </div>
  );
}
