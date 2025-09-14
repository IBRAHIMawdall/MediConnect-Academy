
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { researchAssistant, type ResearchAssistantOutput } from '@/ai/flows/research-assistant-flow';
import { Loader2, Sparkles, FileText, Link as LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';


const formSchema = z.object({
  query: z.string().min(10, { message: 'Please enter a clear question or topic for research.' }),
});

export default function ResearchPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchAssistantOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const response = await researchAssistant(values);
      setResult(response);
    } catch (e) {
      setError('Failed to get research results. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="AI Research Assistant"
        description="Ask a question and let the AI find and summarize relevant information for you."
      />
      <Card>
        <CardHeader>
          <CardTitle>Research Query</CardTitle>
          <CardDescription>
            What medical topic would you like to research?
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
                    <FormLabel>Your Question or Topic</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'What are the latest advancements in interventional cardiology?'"
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
                Start Research
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="mt-8 text-center text-muted-foreground">
          <Loader2 className="mx-auto animate-spin h-8 w-8" />
          <p>AI is researching...</p>
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
                        Research Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">{result.answer}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <LinkIcon className="mr-2 text-primary" />
                        Sources
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {result.sources.map((source, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-muted/50">
                            <Link href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                                {source.title}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">{source.snippet}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
