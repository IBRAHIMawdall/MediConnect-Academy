
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface PageHeroProps {
  title: string;
  description: string;
  image?: ImagePlaceholder;
  children?: React.ReactNode;
}

export function PageHero({ title, description, image, children }: PageHeroProps) {
  return (
    <div className="relative w-full h-64 overflow-hidden">
        {image && (
             <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                data-ai-hint={image.imageHint}
                priority
            />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
        <div className="relative z-20 flex flex-col justify-end h-full text-white p-4 md:p-8">
            <div className="max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shadow-lg">{title}</h1>
                <p className="text-lg md:text-xl text-shadow-md mt-2 text-white/90">{description}</p>
                {children}
            </div>
        </div>
    </div>
  );
}
