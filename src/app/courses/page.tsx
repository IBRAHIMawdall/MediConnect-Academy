
'use client';

import { useState, useMemo } from 'react';
import { courses, CourseCategory, SubCategory } from '@/lib/data';
import { CourseCard } from '@/components/courses/course-card';
import { PageHeader } from '@/components/layout/page-header';
import { CourseFilters } from '@/components/courses/course-filters';

export type Filter = { type: 'main'; id: CourseCategory } | { type: 'sub'; id: SubCategory } | { type: 'all' };

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>({ type: 'all' });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = false;
      if (activeFilter.type === 'all') {
        matchesCategory = true;
      } else if (activeFilter.type === 'main') {
        matchesCategory = course.category === activeFilter.id;
      } else { // 'sub'
        matchesCategory = course.subCategory === activeFilter.id;
      }
      
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Course Catalog"
        description="Browse our comprehensive list of healthcare courses."
      />
      <div className="space-y-6">
        <CourseFilters 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />
        
        {filteredCourses.length > 0 ? (
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-16 bg-card rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">No Courses Found</h2>
              <p>Try adjusting your search or category filters.</p>
            </div>
          )}
      </div>
    </div>
  );
}
