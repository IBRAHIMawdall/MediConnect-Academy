import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Course, Instructor } from '@/lib/data';
import { getCourses } from '@/lib/get-courses';
import { getInstructors } from '@/lib/get-instructors';
import { CourseModulesWrapper } from '@/components/courses/course-modules-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, BookOpen, User } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/protected-route';

async function CourseLearnPageContent({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Validate course ID
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      console.error('Invalid course ID provided:', id);
      notFound();
    }

    const allCourses = await getCourses();
    
    // Additional validation for courses array
    if (!Array.isArray(allCourses) || allCourses.length === 0) {
      console.error('No courses available or invalid courses data');
      notFound();
    }

    const course: Course | undefined = allCourses.find((c) => c?.id === id);
    
    if (!course) {
      console.error(`Course not found with ID: ${id}`);
      notFound();
    }

    // Validate course structure
    if (!course.title || !course.modules || !Array.isArray(course.modules)) {
      console.error('Invalid course structure:', course);
      notFound();
    }

    const allInstructors = await getInstructors();
    const instructor: Instructor | undefined = allInstructors?.find((i) => i?.id === course.instructorId);

    return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href={`/courses/${course.id}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Course
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <h1 className="font-semibold text-lg">{course.title}</h1>
                  <p className="text-sm text-muted-foreground">Learning Mode</p>
                </div>
              </div>
            </div>
            
            {instructor && (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={instructor.avatarUrl} alt={instructor.name} />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{instructor.name}</p>
                  <p className="text-xs text-muted-foreground">{instructor.credentials}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {/* Course Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.longDescription}</p>
            </CardContent>
          </Card>

          {/* Course Modules - This is the main learning content */}
          <CourseModulesWrapper course={course} />
        </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error('Error loading course learn page:', error);
    notFound();
  }
}

export default function CourseLearnPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <ProtectedRoute>
      <CourseLearnPageContent params={params} />
    </ProtectedRoute>
  )
}