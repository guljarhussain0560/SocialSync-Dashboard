// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 border rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left Section: Title and Subtitle */}
        <div>
          <h1 className="text-xl font-bold text-black">SocialSync Dashboard</h1>
          <p className="text-sm text-gray-700 mt-1">
            Create, publish, and track posts across all your social media channels from one place.
          </p>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
          {/* Primary Button: Create Post */}
          <Link 
            href="/create-post" 
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
          >
            {/* Plus Icon */}
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Post
          </Link>
          
          {/* Secondary Button: Manage Connections */}
          <Link 
            href="/connections" 
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-semibold text-black bg-gray-200 border border-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors"
          >
            {/* Connection/Link Icon */}
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            Manage Connections
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;