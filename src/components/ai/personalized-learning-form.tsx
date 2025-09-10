'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  personalizedCourseRecommendations,
  type PersonalizedCourseRecommendationsOutput,
} from '@/ai/flows/personalized-course-recommendations';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  userRole: z.string().min(1, { message: 'Please select your role.' }),
  learningHistory: z
    .string()
    .min(10, { message: 'Please provide some details about your learning history.' })
    .max(500, { message: 'Please keep your history under 500 characters.' }),
});

export function PersonalizedLearningForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedCourseRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userRole: '',
      learningHistory: '',
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
    <Card>
      <CardHeader>
        <CardTitle>Find Your Next Course</CardTitle>
        <CardDescription>
          Let our AI analyze your profile to recommend the most relevant courses for your career growth.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your professional role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nurse">Nurse</SelectItem>
                        <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Administrator">Administrator</SelectItem>
                        <SelectItem value="Medical Student">Medical Student</SelectItem>
                        <SelectItem value="Technician">Technician</SelectItem>
                      </SelectContent>
                    </Select>
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
                        placeholder="e.g., 'Completed courses on basic patient care and pharmacology. Interested in specializing in pediatric care.'"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe your past courses and what you want to learn next.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get Recommendations
            </Button>
          </form>
        </Form>
        {loading && (
          <div className="mt-8 text-center text-muted-foreground">
            <Loader2 className="mx-auto animate-spin h-8 w-8" />
            <p>Analyzing your profile...</p>
          </div>
        )}
        {error && <p className="mt-8 text-destructive">{error}</p>}
        {result && (
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Lightbulb className="mr-2 text-primary" /> Recommended For You
            </h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.recommendedCourses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reasoning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{result.reasoning}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
