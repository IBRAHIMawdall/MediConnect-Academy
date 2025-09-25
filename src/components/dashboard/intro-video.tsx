
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Youtube, Video } from 'lucide-react';

export function IntroVideo() {
    // In a real application, you would replace this with a URL to your hosted video file.
    // This is a placeholder stock video that fits the theme.
    const videoSrc = 'https://videos.pexels.com/video-files/3209828/3209828-hd.mp4'; 

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Youtube className="mr-2 text-red-500" />
                    Welcome to MediConnect Academy
                </CardTitle>
                <CardDescription>
                    A dynamic introduction to our platform, powered by generative AI.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                    {videoSrc ? (
                        <video
                            src={videoSrc}
                            controls
                            autoPlay
                            loop
                            muted // Muted to allow autoplay in most browsers
                            className="w-full h-full"
                        />
                    ) : (
                        <div className="text-center text-muted-foreground p-4">
                             <Video className="mx-auto h-10 w-10 mb-2" />
                            <h3 className="font-semibold">Intro Video Coming Soon</h3>
                            <p className="text-sm">An AI-generated promotional video will be available here.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
