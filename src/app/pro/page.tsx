
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const proFeatures = [
    'Unlimited AI Research Assistant',
    'Unlimited AI Topic Explainer',
    'Personalized Learning Path Generation',
    'AI Content Creation Assistant',
    'Priority Support',
    'Early Access to New Features'
];

export default function ProPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Upgrade to MediConnect Pro"
        description="Unlock the full power of AI to accelerate your medical learning."
      />
      <div className="flex justify-center py-8">
        <Card className="max-w-md w-full shadow-2xl transition-all hover:shadow-[0_0_40px_8px_rgba(59,130,246,0.3)]">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">MediConnect Pro</CardTitle>
            <CardDescription className="text-lg">
              The essential AI toolkit for healthcare professionals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
                <p className="text-5xl font-bold">$29<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                <p className="text-sm text-muted-foreground">Billed annually, or $35 month-to-month.</p>
            </div>
            <ul className="space-y-3">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-lg" size="lg">Upgrade Now</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
