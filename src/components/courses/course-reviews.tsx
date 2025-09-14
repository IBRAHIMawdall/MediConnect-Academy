
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageCircle } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { Separator } from '@/components/ui/separator';

type Review = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  text: string;
  date: string;
};

const initialReviews: Review[] = [
    {
        id: '1',
        user: { name: 'Dr. Evelyn Reed', avatar: 'https://picsum.photos/seed/user1/40/40' },
        rating: 5,
        text: 'This was an outstanding course. The content on interventional cardiology was incredibly detailed and up-to-date. Highly recommended for any practicing cardiologist.',
        date: '2 weeks ago',
    },
    {
        id: '2',
        user: { name: 'Dr. Ben Carter', avatar: 'https://picsum.photos/seed/user2/40/40' },
        rating: 4,
        text: 'A very solid overview of electrophysiology. The device implantation module was particularly useful. Some videos could be higher resolution, but the content is top-notch.',
        date: '1 month ago',
    }
];


export function CourseReviews({ courseId }: { courseId: string }) {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState([5]);

  const handleSubmitReview = () => {
    if (!newReviewText.trim()) return;

    const newReview: Review = {
      id: (reviews.length + 1).toString(),
      user: {
        name: user.name,
        avatar: user.avatar,
      },
      rating: newRating[0],
      text: newReviewText,
      date: 'Just now',
    };

    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewRating([5]);
  };
  
  const StarRating = ({ rating, className }: { rating: number, className?: string }) => (
    <div className={`flex items-center gap-1 ${className}`}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
        ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><MessageCircle className="mr-2 text-primary" /> Student Reviews</CardTitle>
        <CardDescription>See what other learners are saying about this course.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Submission Form */}
        <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-semibold text-md">Leave a Review</h4>
            <Textarea
                placeholder="Share your thoughts on the course..."
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="min-h-24"
            />
            <div className="flex items-center gap-4">
                <div className="flex-grow flex items-center gap-2">
                    <span className="font-medium text-sm">Rating:</span>
                     <StarRating rating={newRating[0]} />
                </div>
                <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={newRating}
                    onValueChange={setNewRating}
                    className="max-w-xs"
                />
            </div>
            <Button onClick={handleSubmitReview} disabled={!newReviewText.trim()}>
                Submit Review
            </Button>
        </div>
        
        <Separator />

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.user.name}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <StarRating rating={review.rating} className="my-1" />
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
