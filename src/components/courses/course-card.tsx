import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Course } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === course.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
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
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold mb-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.id}`}>Enroll Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
