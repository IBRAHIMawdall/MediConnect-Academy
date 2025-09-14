import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Course } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === course.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(135,81,255,0.2)] hover:-translate-y-1 bg-card border">
      <Link href={`/courses/${course.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative w-full h-40">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                className="object-cover"
                data-ai-hint={placeholder.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                    {course.subCategory}
                </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg font-bold mb-2 leading-tight">{course.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex items-center justify-between w-full text-primary font-semibold">
              <span>View Course</span>
              <ArrowRight className="w-5 h-5" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
