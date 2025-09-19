
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

export function IntroVideo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
            <Youtube className="mr-2 text-red-500" />
            Welcome to MediConnect Academy
        </CardTitle>
        <CardDescription>
            Watch this short video to learn how to get the most out of our AI-powered features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg overflow-hidden border">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/P921Y6onN3g"
            title="Welcome to MediConnect Academy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}

