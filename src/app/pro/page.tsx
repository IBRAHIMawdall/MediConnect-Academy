
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Gift } from 'lucide-react';

const allFeatures = [
    'Unlimited AI Research Assistant',
    'Unlimited AI Topic Explainer',
    'Personalized Learning Path Generation',
    'AI Content Creation Assistant',
    'Promo Video Generation',
    'And much more!'
];

export default function ProPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="All Features Unlocked"
        description="Good news! All MediConnect Academy features are available to you for free."
      />
      <div className="flex justify-center py-8">
        <Card className="max-w-md w-full shadow-2xl transition-all hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.3)]">
          <CardHeader className="text-center">
            <Gift className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-4xl font-bold mt-4">Everything is Included</CardTitle>
            <CardDescription className="text-lg">
              You have full access to our complete AI toolkit for healthcare professionals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {allFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
