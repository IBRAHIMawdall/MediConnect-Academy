'use client';

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
import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  apiKey: z.string().min(1, { message: 'Please enter a valid API key.' }),
});

interface ApiKeyInputProps {
  onKeySubmit: (key: string) => void;
}

export function ApiKeyInput({ onKeySubmit }: ApiKeyInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onKeySubmit(values.apiKey);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <KeyRound className="mr-2 text-primary" />
          NCBI API Key Required
        </CardTitle>
        <CardDescription>
          To prevent rate-limiting from the PubMed API, please provide your NCBI API key. This key will be stored securely in your browser for this session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertTitle>Where to get an API key?</AlertTitle>
          <AlertDescription>
            You can obtain a free API key from the NCBI website. 
            <Link href="https://www.ncbi.nlm.nih.gov/account/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline ml-1">
                Create an account and find your key in the settings.
            </Link>
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your NCBI API Key</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your API key here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Save and Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
