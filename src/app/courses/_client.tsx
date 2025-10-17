"use client";

import { useState, useMemo } from 'react';
import type { Course } from '@/lib/data';
import { CourseCard } from '@/components/courses/course-card';
import { CourseListItem } from '@/components/courses/course-list-item';
import { CourseFilters } from '@/components/courses/course-filters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock, Star } from 'lucide-react';

import type { Filter, ViewMode, SortOption } from './types';

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [courses] = useState<Course[]>(initialCourses);
  const [activeFilter, setActiveFilter] = useState<Filter>({ type: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  // Sort courses based on selected option
  const sortCourses = (coursesToSort: Course[]): Course[] => {
    const sorted = [...coursesToSort];
    
    switch (sortOption) {
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'category':
        return sorted.sort((a, b) => {
          const categoryCompare = a.category.localeCompare(b.category);
          if (categoryCompare === 0) {
            return a.title.localeCompare(b.title);
          }
          return categoryCompare;
        });
      case 'lessons-desc':
        return sorted.sort((a, b) => {
          const aLessons = a.modules.reduce((acc, module) => acc + module.lessons.length, 0);
          const bLessons = b.modules.reduce((acc, module) => acc + module.lessons.length, 0);
          return bLessons - aLessons;
        });
      case 'lessons-asc':
        return sorted.sort((a, b) => {
          const aLessons = a.modules.reduce((acc, module) => acc + module.lessons.length, 0);
          const bLessons = b.modules.reduce((acc, module) => acc + module.lessons.length, 0);
          return aLessons - bLessons;
        });
      case 'featured':
        return sorted.sort((a, b) => {
          const aFeatured = a.tags?.includes('Featured') ? 1 : 0;
          const bFeatured = b.tags?.includes('Featured') ? 1 : 0;
          if (bFeatured - aFeatured === 0) {
            return a.title.localeCompare(b.title);
          }
          return bFeatured - aFeatured;
        });
      default:
        return sorted;
    }
  };

  const filteredCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesFilter = (() => {
        if (activeFilter.type === 'all') return true;
        if (activeFilter.type === 'main') return course.category === activeFilter.id;
        if (activeFilter.type === 'sub') return course.subCategory === activeFilter.id;
        return false;
      })();
      
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    return sortCourses(filtered);
  }, [activeFilter, searchTerm, courses, sortOption]);

  // Get course statistics
  const courseStats = useMemo(() => {
    const totalCourses = courses.length;
    const categories = [...new Set(courses.map(c => c.category))].length;
    const totalLessons = courses.reduce((acc, course) => 
      acc + course.modules.reduce((moduleAcc, module) => moduleAcc + module.lessons.length, 0), 0
    );
    const featuredCourses = courses.filter(c => c.tags?.includes('Featured')).length;
    
    return { totalCourses, categories, totalLessons, featuredCourses };
  }, [courses]);

  // Group courses by category for better organization (only when showing all and no search)
  const coursesByCategory = useMemo(() => {
    if (activeFilter.type !== 'all' || searchTerm) {
      return {};
    }

    const grouped = filteredCourses.reduce((acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = [];
      }
      acc[course.category].push(course);
      return acc;
    }, {} as Record<string, Course[]>);
    
    // Sort each category's courses
    Object.keys(grouped).forEach(category => {
      grouped[category] = sortCourses(grouped[category]);
    });
    
    return grouped;
  }, [filteredCourses, activeFilter.type, searchTerm, sortOption]);

  return (
    <div className="space-y-8">
      {/* Course Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{courseStats.totalCourses}</div>
            <p className="text-sm text-muted-foreground">Total Courses</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{courseStats.categories}</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold">{courseStats.totalLessons}</div>
            <p className="text-sm text-muted-foreground">Total Lessons</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold">{courseStats.featuredCourses}</div>
            <p className="text-sm text-muted-foreground">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <CourseFilters 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
          </h2>
          {activeFilter.type !== 'all' && (
            <Badge variant="secondary" className="ml-2">
              {activeFilter.type === 'main' ? activeFilter.id : activeFilter.id}
            </Badge>
          )}
          <Badge variant="outline" className="ml-2">
            Sorted by: {(() => {
              switch (sortOption) {
                case 'name-asc': return 'Name A-Z';
                case 'name-desc': return 'Name Z-A';
                case 'category': return 'Category';
                case 'lessons-desc': return 'Most Lessons';
                case 'lessons-asc': return 'Least Lessons';
                case 'featured': return 'Featured First';
                default: return 'Default';
              }
            })()}
          </Badge>
        </div>
        {searchTerm && (
          <Badge variant="outline">
            Searching: "{searchTerm}"
          </Badge>
        )}
      </div>

      {/* Course Display */}
      {activeFilter.type === 'all' && !searchTerm ? (
        // Show organized by category when viewing all courses
        <div className="space-y-12">
          {Object.entries(coursesByCategory)
            .sort(([a], [b]) => a.localeCompare(b)) // Sort categories alphabetically
            .map(([category, categoryCourses]) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-primary">{category}</h3>
                <Badge variant="secondary">{categoryCourses.length} courses</Badge>
              </div>
              
              <div className={viewMode === 'grid' 
                ? "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
              }>
                {categoryCourses.map(course => (
                  viewMode === 'grid' 
                    ? <CourseCard key={course.id} course={course} language={'en'} />
                    : <CourseListItem key={course.id} course={course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show flat list when filtering or searching
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
      )}

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No courses match "${searchTerm}". Try adjusting your search terms.`
                : "Try adjusting your filter criteria."
              }
            </p>
            {(searchTerm || activeFilter.type !== 'all') && (
              <div className="flex gap-2 justify-center">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Clear search
                  </button>
                )}
                {activeFilter.type !== 'all' && (
                  <button 
                    onClick={() => setActiveFilter({ type: 'all' })}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Show all courses
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}