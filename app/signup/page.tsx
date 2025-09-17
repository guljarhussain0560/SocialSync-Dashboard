"use client";
import {SignupForm} from "@/components/SignupForm"; 

import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create Your Account
        </h1>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}