
'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    const { user } = useUser();

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <PageHeader
                title="Profile"
                description="View and manage your account details."
            />
            <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>This is your public information. It can be seen by other users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Avatar</Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={user.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={user.email} disabled />
                        </div>
                    </div>
                     <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
