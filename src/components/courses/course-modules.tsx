'use client';

import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
import type { Course } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface CourseModulesProps {
  course: Course;
}

export function CourseModules({ course }: CourseModulesProps) {
  const { toast } = useToast();
  const totalLessons = useMemo(
    () => course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
    [course.modules]
  );

  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const handleLessonToggle = (lessonTitle: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonTitle)) {
        newSet.delete(lessonTitle);
      } else {
        newSet.add(lessonTitle);
      }
      return newSet;
    });
  };

  const progress = totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0;
  
  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloading",
      description: "Your certificate for completing the course is being prepared.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Content & Progress</CardTitle>
        <CardDescription>Complete all lessons to earn your certificate.</CardDescription>
        <div className="flex items-center gap-4 pt-2">
            <Progress value={progress} className="w-full" />
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{Math.round(progress)}% Complete</span>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {course.modules.map((module, moduleIndex) => (
            <AccordionItem value={`item-${moduleIndex}`} key={moduleIndex}>
              <AccordionTrigger className="font-bold text-md">{module.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`lesson-${moduleIndex}-${lessonIndex}`}
                        checked={completedLessons.has(lesson.title)}
                        onCheckedChange={() => handleLessonToggle(lesson.title)}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-snug">
                        <label
                          htmlFor={`lesson-${moduleIndex}-${lessonIndex}`}
                          className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {lesson.title}
                        </label>
                        <p className="text-sm text-muted-foreground">{lesson.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6">
            <Button 
                className="w-full" 
                disabled={progress < 100}
                onClick={handleDownloadCertificate}
            >
                <Award className="mr-2 h-4 w-4" />
                Download Certificate
            </Button>
            {progress < 100 && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                    Complete 100% of the course to unlock your certificate.
                </p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
