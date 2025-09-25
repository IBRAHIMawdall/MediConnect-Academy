
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Course, Instructor } from '@/lib/data';
import { getCourses } from '@/lib/get-courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHero } from '@/components/layout/page-hero';
import { CourseModules } from '@/components/courses/course-modules';
import { Badge } from '@/components/ui/badge';
import { CourseReviews } from '@/components/courses/course-reviews';
import { Loader2, UserCircle, Calendar, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInstructors } from '@/lib/get-instructors';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseData() {
      const allCourses = await getCourses();
      const foundCourse = allCourses.find((c) => c.id === params.id) || null;
      setCourse(foundCourse);

      if (foundCourse) {
        const allInstructors = await getInstructors();
        const foundInstructor = allInstructors.find(i => i.id === foundCourse.instructorId) || null;
        setInstructor(foundInstructor);
      }

      setLoading(false);
    }
    fetchCourseData();
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
    <div className="flex-1">
      <PageHero
        title={course.title}
        description={course.description}
        image={placeholder}
      >
        <div className="flex flex-wrap gap-2 pt-4">
            <Badge variant="default">{course.category}</Badge>
            <Badge variant="secondary">{course.subCategory}</Badge>
        </div>
      </PageHero>

      <div className="p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
              <CourseModules course={course} />
              <CourseReviews courseId={course.id} />
          </div>
          <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>About this course</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{course.longDescription}</p>
                </CardContent>
            </Card>
            
            {instructor && (
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2"><UserCircle /> Instructor</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                          <AvatarImage src={instructor.avatarUrl} alt={instructor.name} />
                          <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-bold text-lg">{instructor.name}</p>
                          <p className="text-muted-foreground">{instructor.credentials}</p>
                      </div>
                  </CardContent>
              </Card>
            )}

            <Card>
                  <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2"><Calendar /> Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="font-semibold text-lg">{course.schedule}</p>
                  </CardContent>
              </Card>

              {course.prerequisites && course.prerequisites.length > 0 && (
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2"><CheckSquare /> Prerequisites</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              {course.prerequisites.map((prereq, index) => (
                                  <li key={index}>{prereq}</li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
