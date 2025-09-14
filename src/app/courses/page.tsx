'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { courses, Course, CourseCategory } from '@/lib/data';
import { CourseCard } from '@/components/courses/course-card';
import { PageHeader } from '@/components/layout/page-header';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const allCategories: CourseCategory[] = Array.from(new Set(courses.flatMap(c => c.categories)));

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'All'>('All');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.categories.includes(selectedCategory);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const coursesByCategory = useMemo(() => {
    if (selectedCategory !== 'All') {
        const singleCategoryCourses = filteredCourses.filter(course => course.categories.includes(selectedCategory));
        return { [selectedCategory]: singleCategoryCourses };
    }

    const grouped: { [key in CourseCategory]?: Course[] } = {};
    filteredCourses.forEach(course => {
        // Add course to each category it belongs to
        course.categories.forEach(category => {
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category]!.push(course);
        });
    });
    return grouped;
  }, [filteredCourses, selectedCategory]);
  
  const sortedCategories = useMemo(() => {
    return Object.keys(coursesByCategory).sort() as CourseCategory[];
  }, [coursesByCategory]);

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
            placeholder="Search all courses..."
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
            All Categories
        </Badge>
        {allCategories.sort().map(category => (
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
      
      {sortedCategories.length > 0 ? (
          <div className="space-y-8">
            {sortedCategories.map(category => (
              <div key={category}>
                <h2 className="text-2xl font-bold tracking-tight mb-4">{category}</h2>
                <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {coursesByCategory[category]?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                <Separator className="mt-8" />
              </div>
            ))}
          </div>
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-16">
            No courses found. Try adjusting your search or category filters.
          </p>
        )}
    </div>
  );
}
