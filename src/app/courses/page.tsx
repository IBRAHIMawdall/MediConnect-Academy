'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { courses, Course, CourseCategory } from '@/lib/data';
import { CourseCard } from '@/components/courses/course-card';
import { PageHeader } from '@/components/layout/page-header';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const allCategories: CourseCategory[] = Array.from(new Set(courses.flatMap(c => c.categories)));

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'All'>('All');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.categories.includes(selectedCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Course Catalog"
        description="Browse our comprehensive list of healthcare courses."
      />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-10"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge
            variant={selectedCategory === 'All' ? 'default' : 'secondary'}
            onClick={() => setSelectedCategory('All')}
            className="cursor-pointer"
        >
            All
        </Badge>
        {allCategories.map(category => (
            <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer"
            >
                {category}
            </Badge>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {filteredCourses.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            No courses found. Try adjusting your search or category filters.
          </p>
        )}
      </div>
    </div>
  );
}
