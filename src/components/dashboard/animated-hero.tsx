'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/layout/page-header';
import { Atom, BrainCircuit, HeartPulse, Stethoscope, Dna } from 'lucide-react';
import { cn } from '@/lib/utils';


const FloatingIcon = ({ icon: Icon, className, delay }: { icon: React.ElementType, className: string, delay: string }) => {
    return (
        <div
            className={cn("absolute rounded-full bg-background/50 border backdrop-blur-sm p-3 flex items-center justify-center", className)}
            style={{ animationDelay: delay }}
        >
            <Icon className="h-6 w-6 text-primary" />
        </div>
    );
};


export function AnimatedHero() {
    const pageHeroImage = PlaceHolderImages.find(p => p.id === 'page-hero-animated');

    const icons = [
        { icon: HeartPulse, className: "top-[10%] left-[5%] animate-float-up", delay: '0s' },
        { icon: BrainCircuit, className: "top-[20%] right-[10%] animate-float-down", delay: '1s' },
        { icon: Dna, className: "bottom-[15%] left-[20%] animate-float-up", delay: '2s' },
        { icon: Stethoscope, className: "bottom-[10%] right-[25%] animate-float-down", delay: '0.5s' },
        { icon: Atom, className: "top-[50%] left-[15%] animate-float-up", delay: '1.5s' },
    ];
    
    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            {pageHeroImage && (
                <Image
                    src={pageHeroImage.imageUrl}
                    alt={pageHeroImage.description}
                    fill
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    data-ai-hint={pageHeroImage.imageHint}
                    priority
                />
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

            {icons.map((item, index) => (
                <FloatingIcon key={index} icon={item.icon} className={item.className} delay={item.delay} />
            ))}
            
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white p-4">
                 <PageHeader
                    title="Welcome to Med TechAI Academy"
                    description="Your dashboard for a smarter, AI-powered medical education journey."
                />
            </div>
        </div>
    );
}
