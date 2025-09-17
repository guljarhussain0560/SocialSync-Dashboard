'use client';
// components/AuthProvider.tsx
import { SessionProvider } from 'next-auth/react';
import React from 'react';


type Props = {
  children?: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}