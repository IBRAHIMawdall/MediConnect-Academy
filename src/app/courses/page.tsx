'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { courses, categories, Course, CourseCategory, SubCategory } from '@/lib/data';
import { CourseCard } from '@/components/courses/course-card';
import { PageHeader } from '@/components/layout/page-header';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Filter = { type: 'main'; id: CourseCategory } | { type: 'sub'; id: SubCategory } | { type: 'all' };

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

  const getFilterDisplayName = () => {
    if (activeFilter.type === 'all') return 'All Courses';
    if (activeFilter.type === 'main') return activeFilter.id;
    if (activeFilter.type === 'sub') return activeFilter.id;
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Course Catalog"
        description="Browse our comprehensive list of healthcare courses."
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={cn(
                  'cursor-pointer p-2 rounded-md font-semibold',
                  activeFilter.type === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
                onClick={() => setActiveFilter({ type: 'all' })}
              >
                All Categories
              </div>
              {Object.keys(categories).sort().map((mainCat) => (
                <div key={mainCat}>
                  <div
                    className={cn(
                      'cursor-pointer p-2 rounded-md font-semibold',
                      activeFilter.type === 'main' && activeFilter.id === mainCat ? 'bg-primary/80 text-primary-foreground' : 'hover:bg-muted'
                    )}
                    onClick={() => setActiveFilter({ type: 'main', id: mainCat as CourseCategory })}
                  >
                    {mainCat}
                  </div>
                  <div className="pl-4 mt-2 space-y-2 border-l-2 ml-2">
                    {categories[mainCat as CourseCategory].map((subCat) => (
                      <div
                        key={subCat}
                        className={cn(
                          'cursor-pointer p-2 rounded-md text-sm text-muted-foreground',
                          activeFilter.type === 'sub' && activeFilter.id === subCat ? 'bg-accent text-accent-foreground font-semibold' : 'hover:bg-muted'
                        )}
                        onClick={() => setActiveFilter({ type: 'sub', id: subCat })}
                      >
                        {subCat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="lg:col-span-3 space-y-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search in ${getFilterDisplayName()}...`}
                className="w-full pl-10 h-12 text-base"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          
          {filteredCourses.length > 0 ? (
              <div className="grid gap-6 md:gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}
