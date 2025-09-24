'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Course } from '@/lib/data';
import { useEffect, useState } from 'react';

interface CourseProgressCardProps {
  course: Course;
  progress: number;
}

export function CourseProgressCard({ course, progress }: CourseProgressCardProps) {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        // Animate the progress bar
        const timer = setTimeout(() => setDisplayProgress(progress), 500);
        return () => clearTimeout(timer);
    }, [progress]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
          <Progress value={displayProgress} className="w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className='w-full'>
          <Link href={`/courses/${course.id}`}>Continue Learning</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
