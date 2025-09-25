
'use client';

import { useState, useMemo, useEffect } from 'react';
import { CourseCard } from '@/components/courses/course-card';
import { CourseListItem } from '@/components/courses/course-list-item';
import { CourseFilters } from '@/components/courses/course-filters';
import { Course, CourseCategory } from '@/lib/data';
import { PageHero } from '@/components/layout/page-hero';
import { getCourses } from '@/lib/get-courses';
import { Loader2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Filter = 
  | { type: 'all' }
  | { type: 'main'; id: CourseCategory }
  | { type: 'sub'; id: string };

export type ViewMode = 'grid' | 'list';

const CourseDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Filter>({ type: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesFilter = (() => {
        if (activeFilter.type === 'all') return true;
        if (activeFilter.type === 'main') return course.category === activeFilter.id;
        if (activeFilter.type === 'sub') return course.subCategory === activeFilter.id;
        return false;
      })();
      
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm, courses]);

  const pageHeroImage = PlaceHolderImages.find(p => p.id === 'page-courses');


  return (
    <div className="flex-1">
      <PageHero
        title="Course Catalog"
        description="Browse, filter, and search our comprehensive list of medical courses."
        image={pageHeroImage}
      />
      <div className="p-4 md:p-8 space-y-4">
        <CourseFilters 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        {loading ? (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Loading courses...</p>
            </div>
        ) : (
            <>
                <div className={viewMode === 'grid' 
                    ? "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "space-y-4"
                }>
                    {filteredCourses.map(course => (
                    viewMode === 'grid' 
                        ? <CourseCard key={course.id} course={course} language={'en'} />
                        : <CourseListItem key={course.id} course={course} />
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                    <h3 className="text-lg font-semibold">No courses found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default CourseDashboard;
