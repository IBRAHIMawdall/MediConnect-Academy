'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Youtube, Loader2, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { generateIntroVideo } from '@/ai/flows/generate-intro-video-flow';
import { useToast } from '@/hooks/use-toast';

export function IntroVideo() {
    const [loading, setLoading] = useState(false);
    const [videoDataUri, setVideoDataUri] = useState<string | null>(null);
    const { toast } = useToast();

    const handleGenerateVideo = async () => {
        setLoading(true);
        setVideoDataUri(null);
        toast({
            title: 'Generating Intro Video...',
            description: 'The AI is creating a unique video for the academy. This may take a minute or two.',
        });

        try {
            const result = await generateIntroVideo({
                prompt: 'A cinematic, inspiring short video for a medical education platform named MediConnect Academy. Show abstract scenes of medical research, doctors collaborating, and glowing neural networks, all with a professional blue and white color palette.',
            });
            if (result.videoDataUri) {
                setVideoDataUri(result.videoDataUri);
                toast({
                    title: 'Video Generation Complete!',
                    description: 'Your new intro video is ready.',
                });
            } else {
                 throw new Error('Video generation did not return a video.');
            }
        } catch (error) {
            console.error('Video generation failed:', error);
            toast({
                variant: 'destructive',
                title: 'Video Generation Failed',
                description: 'Could not generate the video at this time. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
            <Youtube className="mr-2 text-red-500" />
            Welcome to MediConnect Academy
        </CardTitle>
        <CardDescription>
            Get a dynamic introduction to our platform. Our AI can generate a unique welcome video for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
            {loading && (
                 <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin h-8 w-8" />
                    <p>Generating video... this can take a minute.</p>
                </div>
            )}
            {!loading && videoDataUri && (
                <video
                    src={videoDataUri}
                    controls
                    className="w-full h-full"
                />
            )}
             {!loading && !videoDataUri && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-muted-foreground">Click the button to generate an AI-powered welcome video.</p>
                     <Button onClick={handleGenerateVideo} disabled={loading}>
                        <Video className="mr-2" />
                        Generate Intro Video
                    </Button>
                </div>
            )}
        </div>
         <Button onClick={handleGenerateVideo} disabled={loading} variant="outline" className="w-full">
            {loading ? <Loader2 className="mr-2 animate-spin" /> : <Video className="mr-2" />}
            {loading ? 'Generation in Progress...' : 'Regenerate Video'}
        </Button>
      </CardContent>
    </Card>
  );
}
