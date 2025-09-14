
'use client';

import { courses } from '@/lib/data';
import { CourseCard } from './course-card';
import { Star } from 'lucide-react';

export function FeaturedCourses() {
  const featured = courses.filter(course => course.tags?.includes('Featured'));

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center">
        <Star className="mr-2 text-yellow-400" />
        Featured This Week
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map(course => (
          <CourseCard key={course.id} course={course} language={'en'} />
        ))}
      </div>
    </div>
  );
};
