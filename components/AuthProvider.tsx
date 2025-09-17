'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// This log will appear in your server terminal
console.log('--- Reading components/AuthProvider.tsx file ---');

type Props = {
  children?: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}