
import { CourseProgressCard } from '@/components/courses/course-progress-card';
import { RequestCourseForm } from '@/components/ai/request-course-form';
import { courses } from '@/lib/data';
import { PageHeader } from '@/components/layout/page-header';
import { UserNav } from '@/components/layout/user-nav';
import { FeaturedCourses } from '@/components/courses/featured-courses';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { IntroVideo } from '@/components/dashboard/intro-video';

export default function DashboardPage() {
  const enrolledCourses = courses.slice(0, 2);

  return (
    <div className="flex-1">
      <IntroVideo />
      
      <div className="p-4 md:p-8 space-y-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">My Courses</h2>
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
