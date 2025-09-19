
'use client';

import { useState, useMemo, useEffect } from 'react';
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
import { Award, Youtube, Loader2 } from 'lucide-react';
import type { Course } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { generateCertificate } from '@/ai/flows/generate-certificate';
import { useUser } from '@/hooks/use-user';
import { useProgress } from '@/hooks/use-progress';


interface CourseModulesProps {
  course: Course;
}

export function CourseModules({ course }: CourseModulesProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const totalLessons = useMemo(
    () => course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
    [course.modules]
  );
  
  const [hasMounted, setHasMounted] = useState(false);
  const { completedLessons, toggleLesson } = useProgress(course.id);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);


  const progress = totalLessons > 0 && hasMounted ? (completedLessons.size / totalLessons) * 100 : 0;
  
  const handleDownloadCertificate = async () => {
    if (progress < 100) return;
    setIsGenerating(true);
    toast({
      title: "Generating Certificate",
      description: "Your certificate for completing the course is being prepared...",
    });

    try {
      const { pdfDataUri } = await generateCertificate({
        userName: user.name,
        courseName: course.title,
      });
      
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `${course.title.replace(/ /g, '_')}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: "Your certificate is downloading.",
      });

    } catch (error) {
      console.error("Certificate generation failed", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "We couldn't generate your certificate at this time. Please try again later.",
      });
    } finally {
        setIsGenerating(false);
    }
  };
  
  if (!hasMounted) {
    return (
      <Card>
        <CardHeader>
            <CardTitle>Course Content & Progress</CardTitle>
            <CardDescription>Loading your progress...</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center p-8">
                <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
            </div>
        </CardContent>
      </Card>
    )
  }

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
                    <div key={lessonIndex}>
                        <div
                        className="flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-muted/50"
                        >
                        <Checkbox
                            id={`lesson-${lesson.title}`}
                            checked={completedLessons.has(lesson.title)}
                            onCheckedChange={() => toggleLesson(lesson.title)}
                            className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-snug">
                            <label
                            htmlFor={`lesson-${lesson.title}`}
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                            >
                            {lesson.title}
                            {lesson.videoUrl && <Youtube className="h-4 w-4 text-red-500" />}
                            </label>
                            <p className="text-sm text-muted-foreground">{lesson.content}</p>
                        </div>
                        </div>
                        {lesson.videoUrl && (
                            <div className="aspect-video rounded-md overflow-hidden ml-10 mt-2">
                                <iframe
                                    className="w-full h-full"
                                    src={lesson.videoUrl}
                                    title={lesson.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
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
                disabled={progress < 100 || isGenerating}
                onClick={handleDownloadCertificate}
            >
                {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Award className="mr-2 h-4 w-4" />
                )}
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
