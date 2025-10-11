
import { CourseProgressCard } from '@/components/courses/course-progress-card';
import { RequestCourseForm } from '@/components/ai/request-course-form';
import { getCourses } from '@/lib/get-courses';
import { UserNav } from '@/components/layout/user-nav';
import { FeaturedCourses } from '@/components/courses/featured-courses';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AnimatedHero } from '@/components/dashboard/animated-hero';
import { PageHeader } from '@/components/layout/page-header';

export default async function DashboardPage() {
  const courses = await getCourses();
  const enrolledCourses = courses.slice(0, 2);

  return (
    <div className="flex-1">
      <AnimatedHero />
      
      <div className="p-4 md:p-8 space-y-8">
        <div className="flex items-center justify-between space-y-2">
            <PageHeader title="My Courses" description="Continue your learning journey." />
            <div className="flex items-center space-x-2">
                <SidebarTrigger />
                <UserNav />
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course, index) => (
            <CourseProgressCard key={course.id} course={course} progress={index === 0 ? 65 : 30} />
          ))}
        </div>

        <FeaturedCourses />

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Request a New Course
          </h2>
          <RequestCourseForm />
        </div>
      </div>
    </div>
  );
}
