
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
import { useTheme } from '@/hooks/use-theme';

export default function SettingsPage() {
    const [apiKey, setApiKey] = useLocalStorage('ncbi-api-key', '');
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();

    const handleSaveKey = () => {
        toast({
            title: "API Key Saved",
            description: "Your NCBI API key has been updated in your browser's local storage.",
        })
    }

    const handleNotificationToggle = (type: string, checked: boolean) => {
        toast({
            title: `${type} Notifications ${checked ? 'Enabled' : 'Disabled'}`,
            description: `You will ${checked ? 'now' : 'no longer'} receive ${type.toLowerCase()} notifications.`,
        });
    }

    const handleThemeToggle = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

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
                           <Switch onCheckedChange={(checked) => handleNotificationToggle('Email', checked)} />
                        </div>
                         <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Get notified in-app about your learning progress.</p>
                            </div>
                           <Switch defaultChecked onCheckedChange={(checked) => handleNotificationToggle('Push', checked)} />
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
                             <p className="font-medium">Dark Mode</p>
                             <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                           </div>
                           <Switch
                                checked={theme === 'dark'}
                                onCheckedChange={handleThemeToggle}
                           />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
