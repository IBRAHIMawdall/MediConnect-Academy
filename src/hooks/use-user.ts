'use client';

import { useState, Dispatch, SetStateAction } from 'react';

type User = {
  name: string;
  email: string;
  avatar: string;
};

// This is a mock user hook. In a real app, you'd fetch this from your auth provider.
export function useUser(): { user: User; setUser: Dispatch<SetStateAction<User>> } {
  const [user, setUser] = useState<User>({
    name: 'Dr. User',
    email: 'user@mediconnect.com',
    avatar: 'https://picsum.photos/seed/user/40/40',
  });

  return { user, setUser };
}
