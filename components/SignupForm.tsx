'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const SignupForm = React.memo(() => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for live email validation
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState<boolean | null>(null);

  // This `useEffect` hook runs the GET request to check the email
  useEffect(() => {
    // Don't check until the email is valid
    if (!email || !email.includes('@')) {
      setIsEmailTaken(null);
      return;
    }

    setIsEmailChecking(true);
    // This timer waits for the user to stop typing
    const debounceTimer = setTimeout(async () => {
      try {
        // Use the GET route to check for the email
        const response = await fetch(`/api/users?email=${email}`);
        const data = await response.json();
        
        // The GET route returns { userExists: true } if the email is found
        setIsEmailTaken(data.userExists);
      } catch (err) {
        setIsEmailTaken(null); // Handle potential network errors
      } finally {
        setIsEmailChecking(false);
      }
    }, 500); // 500ms delay

    // This cleanup function cancels the timer if the user types again
    return () => clearTimeout(debounceTimer);
  }, [email]); // Re-run this effect whenever the email changes

  // This function runs the POST request when the form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailTaken) {
      toast.error('This email is already taken. Please use another.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Use the POST route to create the user
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      console.log('Response :', response);

      if (response.ok) {
        toast.success('Account created successfully! Please log in.');
        router.push('/login');
      } else {
        const data = await response.json();
        console.log('Error data:', data);
        const errorMessage = data.message || 'Something went wrong.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required className="rounded-md border text-black border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="rounded-md border text-black border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
        
        {/* Live feedback for the email validation */}
        {isEmailChecking && <p className="mt-2 text-sm text-gray-500">Checking...</p>}
        {isEmailTaken === true && <p className="mt-2 text-sm text-red-600">This email is already taken.</p>}
        {isEmailTaken === false && email.includes('@') && <p className="mt-2 text-sm text-green-600">This email is available!</p>}
        
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex flex-col">
         <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password</label>
         <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="rounded-md border text-black border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      </div>

      <button type="submit" disabled={isLoading || isEmailTaken === true} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-blue-400">
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
});

SignupForm.displayName = 'SignupForm';