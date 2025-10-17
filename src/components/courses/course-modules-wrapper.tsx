'use client';

import { CourseModules } from './course-modules';
import type { Course } from '@/lib/data';

interface CourseModulesWrapperProps {
  course: Course;
}

export function CourseModulesWrapper({ course }: CourseModulesWrapperProps) {
  return <CourseModules course={course} />;
}