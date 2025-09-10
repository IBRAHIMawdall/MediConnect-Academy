'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { courses, Course } from '@/lib/data';
import { CourseCard } from '@/components/courses/course-card';
import { PageHeader } from '@/components/layout/page-header';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Course Catalog"
        description="Browse our comprehensive list of healthcare courses."
      />
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="w-full md:w-1/3 pl-10"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
