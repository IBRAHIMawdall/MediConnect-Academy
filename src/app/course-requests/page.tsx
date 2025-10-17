'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PageHeader } from '@/components/layout/page-header';
import { Clock, CheckCircle, XCircle, RefreshCw, Plus, Send, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProtectedRoute } from '@/components/auth/protected-route';

const courseRequestSchema = z.object({
  topic: z.string().min(3, { message: 'Please enter a course topic (minimum 3 characters).' }),
  description: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
});

interface CourseRequest {
  id: string;
  topic: string;
  suggestion?: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}

function CourseRequestsPageContent() {
  const [requests, setRequests] = useState<CourseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof courseRequestSchema>>({
    resolver: zodResolver(courseRequestSchema),
    defaultValues: {
      topic: '',
      description: '',
      level: 'intermediate',
      urgency: 'medium',
    },
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/request-course');
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onSubmit = async (values: z.infer<typeof courseRequestSchema>) => {
    setSubmitting(true);
    setError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/request-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit course request');
      }

      setSubmitSuccess(true);
      form.reset();
      // Refresh the requests list
      await fetchRequests();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader
          title="Course Requests"
          description="View and manage course requests from users."
        />
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader
          title="Course Requests"
          description="View and manage course requests from users."
        />
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchRequests} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <PageHeader
        title="Course Requests"
        description="Request new courses on any medical topic or view existing requests."
      />

      {/* Course Request Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 text-primary" />
            Request a New Course
          </CardTitle>
          <CardDescription>
            Tell us what medical topic you'd like to learn about and we'll create a course for you.
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
                    <FormLabel>Course Topic *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Advanced Cardiology, Pediatric Emergency Medicine, Medical Ethics..."
                        {...field}
                        className="text-lg p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide more details about what you'd like to learn, specific areas of focus, or any special requirements..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full p-3 border rounded-md bg-background text-foreground">
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full p-3 border rounded-md bg-background text-foreground">
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-green-800 font-medium">✅ Course request submitted successfully!</p>
                  <p className="text-green-600 text-sm mt-1">We'll review your request and create the course soon.</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={submitting} className="w-full text-lg py-6">
                {submitting ? (
                  <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                Submit Course Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator />

      {/* Existing Requests Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Requests</h2>
          <p className="text-muted-foreground">{requests.length} total requests submitted</p>
        </div>
        <Button onClick={fetchRequests} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No course requests yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Users can request new courses from the main dashboard.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{request.topic}</CardTitle>
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {request.suggestion && (
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      AI Suggested Title:
                    </h4>
                    <p className="text-sm bg-muted/50 p-3 rounded-md">
                      {request.suggestion}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Request ID: {request.id}</span>
                  <span>
                    Submitted: {new Date(request.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CourseRequestsPage() {
  return (
    <ProtectedRoute>
      <CourseRequestsPageContent />
    </ProtectedRoute>
  )
}