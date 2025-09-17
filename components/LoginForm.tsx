'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// This is a NAMED export, so it must be imported with { LoginForm }
export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Attempt to sign in using the 'credentials' provider
      const result = await signIn('credentials', {
        redirect: false, // We handle redirection manually
        email,
        password,
      });

      // Handle the result of the sign-in attempt
      if (result?.error) {
        toast.error(result.error); // Show error toast if login fails
      } else {
        toast.success('Logged in successfully!');
        router.push('/'); // Redirect to the main dashboard on success
        router.refresh(); // Refresh server components to update session
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Stop loading state regardless of outcome
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Email Input Field --- */}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="text-black rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* --- Password Input Field --- */}
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="text-black rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isLoading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  );
};