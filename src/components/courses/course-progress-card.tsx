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

interface CourseProgressCardProps {
  course: Course;
  progress: number;
}

export function CourseProgressCard({ course, progress }: CourseProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
          <Progress value={progress} className="w-full" />
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
