'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import CreatePostForm from './CreatePostForm';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  return (
    <nav className="bg-white w-full px-4 sm:px-4 py-4 sm:py-4 border-2 border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-8 lg:px-48 sm:py-0.5 md:px-8 sm:px-2">
        {/* Left Section: Title and Subtitle */}
        <div className="w-full sm:w-auto">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">SocialSync Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Create, publish, and track posts across all your social media channels from one place.
          </p>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">

          <LogoutButton />
          {/* Primary Button: Create Post */}
          <button 
            onClick={() => setCreatePostOpen(true)}
            className="flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Post
          </button>

          {/* Secondary Button: Manage Connections */}
          <Link 
            href="/connections" 
            className="flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            </svg>
            Manage Connections
          </Link>
        </div>
      </div>
      {createPostOpen && <CreatePostForm open={createPostOpen} onOpenChange={setCreatePostOpen} />}
    </nav>
  );
};

export default Navbar;