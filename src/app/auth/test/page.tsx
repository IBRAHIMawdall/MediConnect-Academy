'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AuthStatus } from '@/components/auth/auth-status'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AuthTestPage() {
  const { data: session, status } = useSession()

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Authentication Test</h1>
        <p className="text-muted-foreground">Test your authentication setup</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {status === 'authenticated' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : status === 'loading' ? (
                <Clock className="h-5 w-5 text-yellow-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              Authentication Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={status === 'authenticated' ? 'default' : 'secondary'}>
              {status}
            </Badge>
            <div className="mt-4">
              <AuthStatus />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
          </CardHeader>
          <CardContent>
            {session ? (
              <div className="space-y-2">
                <p><strong>Name:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Role:</strong> {session.user?.role}</p>
                <p><strong>ID:</strong> {session.user?.id}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">No session data</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}