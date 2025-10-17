
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Course } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

type Props = {
  course: Course;
  language: 'en' | 'ar';
};

export function CourseCard({ course, language }: Props) {
  const placeholder = PlaceHolderImages.find((p) => p.id === course.imageId);
  const title = language === 'ar' ? `📘 ${course.title}` : course.title;
  const description = language === 'ar' ? `📝 ${course.description}` : course.description;

  return (
    <Card dir={language === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card border">
      <CardHeader className="p-0">
        <div className="relative w-full h-40">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-bold mb-2 leading-tight">{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full">
            <Link href={`/courses/${course.id}`}>
                 {language === 'ar' ? 'عرض الدورة' : 'View Course'}
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
