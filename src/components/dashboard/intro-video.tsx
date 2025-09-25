
'use client';

import { PageHeader } from '@/components/layout/page-header';

export function IntroVideo() {
    const videoSrc = 'https://videos.pexels.com/video-files/3209828/3209828-hd.mp4'; 

    return (
        <div className="relative w-full h-80 overflow-hidden">
            <video
                src={videoSrc}
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white p-4">
                 <PageHeader
                    title="Welcome to MediConnect Academy"
                    description="Your dashboard for a smarter, AI-powered medical education journey."
                />
            </div>
        </div>
    );
}
