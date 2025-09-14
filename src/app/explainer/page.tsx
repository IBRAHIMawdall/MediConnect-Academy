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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { explainTopic, type ExplainTopicOutput } from '@/ai/flows/explain-topic-flow';
import { Loader2, Zap, BrainCircuit, BookText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';


const formSchema = z.object({
  topic: z.string().min(3, { message: 'Please enter a topic.' }),
});

export default function ExplainerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExplainTopicOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await explainTopic(values);
      setResult(response);
    } catch (e) {
      setError('Failed to get explanation. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  
  const MindMap = ({ markdown }: { markdown: string }) => {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-full">
        <ReactMarkdown
          components={{
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-2" {...props} />,
            li: ({ node, ...props }) => <li className="text-muted-foreground" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    );
  };


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="AI Topic Explainer"
        description="Enter a medical topic to get a simplified explanation and a visual mind map."
      />
      <Card>
        <CardHeader>
          <CardTitle>Topic Input</CardTitle>
          <CardDescription>
            What complex medical concept would you like to understand better?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'The Renin-Angiotensin-Aldosterone System'"
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
                  <Zap className="mr-2 h-4 w-4" />
                )}
                Explain Topic
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="mt-8 text-center text-muted-foreground">
          <Loader2 className="mx-auto animate-spin h-8 w-8" />
          <p>AI is thinking...</p>
        </div>
      )}
      
      {error && <p className="mt-8 text-destructive">{error}</p>}
      
      {result && (
        <div className="mt-8 space-y-8">
            <Separator />
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BookText className="mr-2 text-primary" />
                            Explanation
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line">{result.explanation}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BrainCircuit className="mr-2 text-primary" />
                            Mind Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <MindMap markdown={result.mindMap} />
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}
