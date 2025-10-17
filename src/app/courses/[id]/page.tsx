
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Course, Instructor } from '@/lib/data';
import { getCourses } from '@/lib/get-courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHero } from '@/components/layout/page-hero';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseReviews } from '@/components/courses/course-reviews';
import { UserCircle, Calendar, CheckSquare, Play, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInstructors } from '@/lib/get-instructors';

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allCourses = await getCourses();
  const course: Course | undefined = allCourses.find((c) => c.id === id);
  if (!course) {
    notFound();
  }

  const allInstructors = await getInstructors();
  const instructor: Instructor | undefined = allInstructors.find((i) => i.id === course.instructorId);

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
              {/* Start Course Section */}
              <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Play className="h-8 w-8 text-blue-600" />
                    Ready to Start Learning?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-muted-foreground">
                    Begin your journey with {course.title}. Access all course modules, track your progress, and earn your certificate.
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.modules.length} Modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} Lessons</span>
                    </div>
                  </div>
                  
                  <Link href={`/courses/${course.id}/learn`}>
                    <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                      <Play className="h-5 w-5 mr-2" />
                      Start Course
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Course Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.modules.map((module, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <ul className="mt-2 space-y-1">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="text-muted-foreground flex items-center gap-2">
                              <CheckSquare className="h-4 w-4 text-green-500" />
                              {lesson.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
