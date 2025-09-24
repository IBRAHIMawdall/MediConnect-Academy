
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Course } from '@/lib/data';
import { getCourses } from '@/lib/get-courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/layout/page-header';
import { CourseModules } from '@/components/courses/course-modules';
import { Badge } from '@/components/ui/badge';
import { CourseReviews } from '@/components/courses/course-reviews';
import { Loader2 } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      const allCourses = await getCourses();
      const foundCourse = allCourses.find((c) => c.id === params.id) || null;
      setCourse(foundCourse);
      setLoading(false);
    }
    fetchCourse();
  }, [params.id]);

  if (loading) {
    return (
        <div className="flex-1 flex items-center justify-center p-8">
             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
             <p className="ml-4 text-muted-foreground">Loading course details...</p>
        </div>
    );
  }
  
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
        <div className="md:col-span-2 space-y-8">
            <CourseModules course={course} />
            <CourseReviews courseId={course.id} />
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
