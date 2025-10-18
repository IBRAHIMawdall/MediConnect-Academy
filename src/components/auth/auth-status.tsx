'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogIn, LogOut, User } from 'lucide-react'

export function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
  }

  if (!session) {
    return (
      <Button onClick={() => signIn()} variant="outline" size="sm">
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={session.user?.image || ''} />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{session.user?.name}</span>
      <Button onClick={() => signOut()} variant="ghost" size="sm">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}