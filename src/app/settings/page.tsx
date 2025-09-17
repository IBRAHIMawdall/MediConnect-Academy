
'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { KeyRound, Bell, Palette } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
    const [apiKey, setApiKey] = useLocalStorage('ncbi-api-key', '');
    const { toast } = useToast();

    const handleSaveKey = () => {
        toast({
            title: "API Key Saved",
            description: "Your NCBI API key has been updated in your browser's local storage.",
        })
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <PageHeader
                title="Settings"
                description="Manage your application preferences and API keys."
            />
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><KeyRound className="mr-2"/>API Keys</CardTitle>
                        <CardDescription>Manage API keys for external services. This is stored securely in your browser.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="ncbi-key">NCBI API Key</Label>
                            <div className="flex gap-2">
                                <Input id="ncbi-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter your NCBI API key" />
                                <Button onClick={handleSaveKey}>Save</Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Your NCBI API key is used for the AI Research and Content Assistant features to avoid rate limiting.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Bell className="mr-2"/>Notifications</CardTitle>
                        <CardDescription>Choose how you want to be notified.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                           <div>
                             <p className="font-medium">Email Notifications</p>
                             <p className="text-sm text-muted-foreground">Receive updates about new courses and platform news.</p>
                           </div>
                           <Switch />
                        </div>
                         <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Get notified in-app about your learning progress.</p>
                            </div>
                           <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Palette className="mr-2"/>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the application.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                           <div>
                             <p className="font-medium">Theme</p>
                             <p className="text-sm text-muted-foreground">Currently in dark mode. Light mode coming soon.</p>
                           </div>
                           <Button variant="outline" disabled>Toggle Theme</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
