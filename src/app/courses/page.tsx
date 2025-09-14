
'use client';

import { useState } from 'react';
import { CourseCard } from '@/components/courses/course-card';
import { courses } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';

const CourseDashboard: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <PageHeader
            title={language === 'ar' ? 'منصة التعلم الذاتي' : 'Self-Learning Platform'}
            description={language === 'ar' ? 'تصفح دوراتنا الشاملة' : 'Browse our comprehensive courses'}
        />
        <Button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
          {language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
        </Button>
      </div>

      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} language={language} />
        ))}
      </div>
    </div>
  );
};

export default CourseDashboard;
