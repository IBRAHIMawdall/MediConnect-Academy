
'use client';

import { CourseProgressCard } from '@/components/courses/course-progress-card';
import { PersonalizedLearningForm } from '@/components/ai/personalized-learning-form';
import { courses } from '@/lib/data';
import { PageHeader } from '@/components/layout/page-header';
import { UserNav } from '@/components/layout/user-nav';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const enrolledCourses = courses.slice(0, 2); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's your learning overview."
        />
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">My Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isClient && enrolledCourses.map((course) => (
              <CourseProgressCard key={course.id} course={course} progress={Math.floor(Math.random() * (75 - 25 + 1)) + 25} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Personalized Learning Path
          </h2>
          <PersonalizedLearningForm />
        </div>
      </div>
    </div>
  );
}
