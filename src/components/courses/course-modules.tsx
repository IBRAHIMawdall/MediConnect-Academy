
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
import { Award, Youtube, Loader2, Play } from 'lucide-react';
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
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  
  const totalLessons = useMemo(
    () => course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
    [course.modules]
  );
  
  const [hasMounted, setHasMounted] = useState(false);
  const { completedLessons, toggleLesson } = useProgress(course.id);

  const toggleLessonExpansion = (lessonKey: string) => {
    setExpandedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonKey)) {
        newSet.delete(lessonKey);
      } else {
        newSet.add(lessonKey);
      }
      return newSet;
    });
  };

  const handleStartLesson = (lesson: any, moduleIndex: number, lessonIndex: number) => {
    const lessonKey = `${moduleIndex}-${lessonIndex}`;
    
    // Expand the lesson if not already expanded
    if (!expandedLessons.has(lessonKey)) {
      toggleLessonExpansion(lessonKey);
    }
    
    // Mark lesson as started/completed
    if (!completedLessons.has(lesson.title)) {
      toggleLesson(lesson.title);
    }
    
    // Show toast notification
    toast({
      title: "Lesson Started",
      description: `You've started "${lesson.title}"`,
    });
  };
  
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
        <div className="space-y-4">
          <p className="text-lg font-semibold">Course Modules ({course.modules.length})</p>
          {course.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="text-lg font-bold mb-3">{module.title}</h3>
              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="border-l-4 border-blue-200 pl-4 py-2">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{lesson.content.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Accordion type="single" collapsible className="w-full" style={{display: 'none'}}>
          {course.modules.map((module, moduleIndex) => (
            <AccordionItem value={`item-${moduleIndex}`} key={moduleIndex}>
              <AccordionTrigger className="font-bold text-md">{module.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-4">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const lessonKey = `${moduleIndex}-${lessonIndex}`;
                    const isExpanded = expandedLessons.has(lessonKey);
                    return (
                      <div key={lessonIndex} className="border rounded-md">
                        <div 
                          className="px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleLessonExpansion(lessonKey)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <Checkbox
                              id={`lesson-${lesson.title}`}
                              checked={completedLessons.has(lesson.title)}
                              onCheckedChange={(checked) => {
                                toggleLesson(lesson.title);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-shrink-0"
                            />
                            <div className="flex items-center gap-2 text-left flex-1">
                              <span className="text-sm font-medium">{lesson.title}</span>
                              {lesson.videoUrl && <Youtube className="h-4 w-4 text-red-500" />}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartLesson(lesson, moduleIndex, lessonIndex);
                                }}
                                title="Start Lesson"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <div className="text-xs text-muted-foreground">
                                {isExpanded ? '▼' : '▶'}
                              </div>
                            </div>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-3 pb-3 border-t bg-gray-50/50">
                            <div className="space-y-3 pt-3">
                              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                {lesson.content}
                              </div>
                              {lesson.videoUrl && (
                                <div className="aspect-video rounded-md overflow-hidden">
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
                          </div>
                        )}
                      </div>
                    );
                  })}
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
