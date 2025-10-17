
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import type { Course } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface CourseListItemProps {
  course: Course;
}

export function CourseListItem({ course }: CourseListItemProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === course.imageId);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(59,130,246,0.2)] hover:-translate-y-1 bg-card border">
      <Link href={`/courses/${course.id}`} className="block">
        <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-6">
                 <div className="relative w-full sm:w-48 h-40 sm:h-28 shrink-0 rounded-md overflow-hidden">
                    {placeholder && (
                    <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        fill
                        className="object-cover"
                        data-ai-hint={placeholder.imageHint}
                    />
                    )}
                </div>
                <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="default" className="text-xs">{course.category}</Badge>
                        <Badge variant="secondary" className="text-xs">{course.subCategory}</Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-1 leading-tight">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </div>
                <div className="flex items-center justify-start sm:justify-center shrink-0 ml-auto sm:ml-0">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <span>View Course</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </CardContent>
      </Link>
    </Card>
  );
}
