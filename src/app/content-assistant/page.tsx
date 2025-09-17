'use client';

import { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { researchAssistant, type ResearchAssistantOutput } from '@/ai/flows/research-assistant-flow';
import { Loader2, Sparkles, FileText, Link as LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ApiKeyInput } from '../research/api-key-input';

const formSchema = z.object({
  query: z.string().min(10, { message: 'Please enter a clear topic to find content for.' }),
});

export default function ContentAssistantPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchAssistantOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useLocalStorage('ncbi-api-key', '');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await researchAssistant({ ...values, apiKey });
      setResult(response);
    } catch (e) {
      setError('Failed to get content results. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const renderContent = () => {
    if (!hasMounted) {
        return (
            <div className="mt-8 text-center text-muted-foreground">
                <Loader2 className="mx-auto animate-spin h-8 w-8" />
            </div>
        );
    }

    if (!apiKey && !process.env.NEXT_PUBLIC_NCBI_API_KEY) {
        return <ApiKeyInput onKeySubmit={setApiKey} />;
    }

    return (
        <Card>
          <CardHeader>
            <CardTitle>Content Topic</CardTitle>
            <CardDescription>
              What subject do you need content for? Enter a topic, and the AI will find relevant materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course or Lesson Topic</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Pathophysiology of Acute Myocardial Infarction' or 'Advanced Suturing Techniques'"
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
                  Find Content
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="AI Content Assistant"
        description="Find articles, videos, and summaries to build your course content."
      />
      {renderContent()}

      {loading && (
        <div className="mt-8 text-center text-muted-foreground">
          <Loader2 className="mx-auto animate-spin h-8 w-8" />
          <p>AI is searching for content...</p>
        </div>
      )}

      {error && <p className="mt-8 text-destructive">{error}</p>}

      {result && (
        <div className="mt-8 space-y-8">
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 text-primary" />
                AI-Generated Summary
              </CardTitle>
              <CardDescription>
                A starting point for your lesson content, based on the sources found.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {result.answer ? (
                    <p className="text-muted-foreground whitespace-pre-line">{result.answer}</p>
                 ) : (
                    <p className="text-muted-foreground">The AI could not generate a summary for this topic.</p>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LinkIcon className="mr-2 text-primary" />
                Relevant Sources
              </CardTitle>
              <CardDescription>
                Use these articles from PubMed to build out your course content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.sources.length > 0 ? (
                result.sources.map((source, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50">
                    <Link href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                      {source.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{source.snippet}</p>
                  </div>
                ))
              ) : (
                 <p className="text-muted-foreground">No sources found for this topic.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
