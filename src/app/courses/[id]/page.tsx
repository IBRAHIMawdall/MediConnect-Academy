import { notFound } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/layout/page-header';
import { CourseModules } from '@/components/courses/course-modules';
import { Badge } from '@/components/ui/badge';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((p) => p.id === course.imageId);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title={course.title}
        description="Dive into your learning module by module."
      />
      <div className="flex flex-wrap gap-2">
          <Badge variant="default">{course.category}</Badge>
          <Badge variant="secondary">{course.subCategory}</Badge>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <CourseModules course={course} />
        </div>
        <div className="md:col-span-1 space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
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
          <div>
            <h3 className="text-xl font-bold mb-2">About this course</h3>
            <p className="text-muted-foreground">{course.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
