
'use client';

import { PageHeader } from '@/components/layout/page-header';

export function IntroVideo() {
    const videoSrc = 'https://www.youtube.com/embed/S9_S81D1i0s?autoplay=1&loop=1&mute=1&playlist=S9_S81D1i0s&controls=0&showinfo=0&autohide=1&modestbranding=1';

    return (
        <div className="relative w-full h-80 overflow-hidden">
            <iframe 
                src={videoSrc}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Intro Video"
            ></iframe>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white p-4">
                 <PageHeader
                    title="Welcome to Med TechAI Academy"
                    description="Your dashboard for a smarter, AI-powered medical education journey."
                />
            </div>
        </div>
    );
}
