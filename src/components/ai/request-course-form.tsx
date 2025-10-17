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
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { suggestCourseTopic, type SuggestCourseTopicOutput } from '@/ai/flows/suggest-course-topic-flow';
import { Lightbulb, Loader2, Mail, Sparkles, Send } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  topic: z.string().min(5, { message: 'Please enter a topic with at least 5 characters.' }),
  suggestion: z.string().optional(),
});

export function RequestCourseForm() {
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestCourseTopicOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  const topicValue = form.watch('topic');

  async function handleSuggest() {
    setLoadingSuggestion(true);
    setError(null);
    setSuggestion(null);
    try {
      const response = await suggestCourseTopic({ topic: topicValue });
      setSuggestion(response);
      form.setValue('suggestion', response.suggestion);
    } catch (e) {
      setError('Failed to get suggestion. Please try again.');
      console.error(e);
    } finally {
      setLoadingSuggestion(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingSubmit(true);
    setError(null);
    
    try {
      const response = await fetch('/api/request-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: values.topic,
          suggestion: values.suggestion || suggestion?.suggestion
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      const result = await response.json();
      console.log('Course Request Submitted Successfully:', result);
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit request. Please try again.');
      console.error('Error submitting course request:', e);
    } finally {
      setLoadingSubmit(false);
    }
  }
  
  if (submitted) {
    return (
        <Card className="text-center">
            <CardHeader>
                <Mail className="mx-auto h-12 w-12 text-primary" />
                <CardTitle>Thank You!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Your course request has been submitted. We'll review it and you may see it in our catalog soon.</p>
                <Button onClick={() => setSubmitted(false)} className="mt-4">Request Another Course</Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What do you want to learn?</CardTitle>
        <CardDescription>
          Can't find a course you're looking for? Request it here, and our team will consider it for future content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Topic</FormLabel>
                  <FormControl>
                    <div className="flex flex-col md:flex-row gap-2">
                        <Input
                            placeholder="e.g., 'the role of gut bacteria in mental health'"
                            {...field}
                        />
                        <Button type="button" onClick={handleSuggest} disabled={!topicValue || loadingSuggestion} variant="outline">
                            {loadingSuggestion ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Get AI Suggestion
                        </Button>
                    </div>
                  </FormControl>
                   <FormDescription>
                      Enter a topic and let AI suggest a more formal course title.
                    </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {error && <p className="text-destructive">{error}</p>}

            {suggestion && (
                <FormField
                control={form.control}
                name="suggestion"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center"><Lightbulb className="mr-2 h-4 w-4 text-yellow-400" /> AI Suggested Title</FormLabel>
                        <FormControl>
                             <Textarea
                                className="bg-muted/50"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Feel free to edit the suggested title before submitting.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
            )}
            
            <Button type="submit" disabled={loadingSubmit || (!form.getValues('topic') && !form.getValues('suggestion'))}>
                {loadingSubmit ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <Send className="mr-2 h-4 w-4" />
                )}
                Submit Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
