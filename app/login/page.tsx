// app/login/page.tsx
"use client";

import React from "react"
import {LoginForm} from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Log In to SocialSync
                </h1>
                <LoginForm />
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}