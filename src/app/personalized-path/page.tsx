
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import {
  personalizedCourseRecommendations,
  type PersonalizedCourseRecommendationsOutput,
} from '@/ai/flows/personalized-course-recommendations';
import { Loader2, Sparkles, BookCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  userRole: z.string().min(2, { message: 'Please enter a valid role.' }),
  learningHistory: z.string().min(10, { message: 'Please describe your interests.' }),
});

export default function PersonalizedPathPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedCourseRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userRole: 'Nurse',
      learningHistory: 'Interested in cardiology and emergency care.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await personalizedCourseRecommendations(values);
      setResult(response);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Personalized Learning Path"
        description="Let our AI craft a course list tailored to your career goals and interests."
      />
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Tell us about your role and what you want to learn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Professional Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Cardiologist', 'Medical Student'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning History & Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Completed courses in basic surgery. Interested in advanced surgical techniques and robotics.'"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="mt-8 text-center text-muted-foreground">
          <Loader2 className="mx-auto animate-spin h-8 w-8" />
          <p>AI is generating your learning path...</p>
        </div>
      )}

      {error && <p className="mt-8 text-destructive">{error}</p>}

      {result && (
        <div className="mt-8 space-y-8">
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookCheck className="mr-2 text-primary" />
                Your Recommended Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground font-semibold">Reasoning:</p>
                <p className="text-muted-foreground italic">"{result.reasoning}"</p>
                <Separator />
                <ul className="list-disc pl-5 space-y-2">
                  {result.recommendedCourses.map((course, index) => (
                    <li key={index} className="font-semibold text-md">{course}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
