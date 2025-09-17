'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Calendar } from 'lucide-react';

type CreatePostFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const platforms = [
  { id: 'tayog', name: 'Tayog', color: 'bg-blue-500' },
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
  { id: 'twitter', name: 'Twitter/X', color: 'bg-black' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
];

const platformIdToEnum: Record<string, string> = {
  tayog: 'TAYOG',
  linkedin: 'LINKEDIN',
  twitter: 'X',
  instagram: 'INSTAGRAM',
  facebook: 'FACEBOOK',
};

const CreatePostForm = ({ open, onOpenChange }: CreatePostFormProps) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- loading state

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch('/api/accounts');
        if (!res.ok) throw new Error('Failed to fetch accounts');
        const accounts: { provider: string; isConnected: boolean }[] = await res.json();
        setSelectedPlatforms(
          accounts
            .filter(acc => acc.isConnected)
            .map(acc => (acc.provider === 'X' ? 'twitter' : acc.provider.toLowerCase()))
        );
      } catch {
        setSelectedPlatforms([]);
      }
    };
    fetchAccounts();
  }, []);

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent, statusOverride: string = 'published') => {
    e.preventDefault();
    if (!postTitle || !postContent || selectedPlatforms.length === 0) return;

    try {
      setIsLoading(true); // start loading
      const backendPlatforms = selectedPlatforms.map(id => platformIdToEnum[id]);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          platforms: backendPlatforms,
          status: statusOverride,
          scheduledAt: selectedDate || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to publish post');

      const data = await response.json();
      console.log('Post published successfully:', data);

      setPostTitle('');
      setPostContent('');
      setSelectedPlatforms([]);
      setSelectedDate('');
      onOpenChange(false);
    } catch (err) {
      console.error('Error publishing post:', err);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[97vh] w-[97%] sm:w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl overflow-auto bg-white text-gray-800 shadow-2xl focus:outline-none">
          
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <Dialog.Title className="text-lg sm:text-xl font-semibold">Create New Post</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" title="Close" className="text-gray-400 hover:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form className="p-4 sm:p-6 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
              <input
                type="text"
                id="postTitle"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full px-3 py-2 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 mb-1">Post Content</label>
              <textarea
                id="postContent"
                rows={5}
                value={postContent}
                onChange={e => setPostContent(e.target.value)}
                placeholder="Write your update or opportunity..."
                className="w-full px-3 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Platforms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Platforms</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {platforms.map(platform => (
                  <div key={platform.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                    <input
                      id={platform.id}
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={() => handlePlatformChange(platform.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-offset-2"
                    />
                    <label htmlFor={platform.id} className="ml-3 flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer flex-grow">
                      <span className={`w-4 h-4 rounded ${platform.color}`}></span>
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Post (Optional)</label>
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 w-full rounded-lg bg-white border border-gray-200 px-3 py-2 cursor-pointer focus:outline-none sm:px-4 sm:py-3"
                  onClick={() => setIsDatePickerOpen(prev => !prev)}
                >
                  <Calendar className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6" />
                  <span className="text-gray-500 text-sm sm:text-base">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Pick a date'}
                  </span>
                </button>
                {isDatePickerOpen && (
                  <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <input
                      type="date"
                      title="Select a date"
                      className="w-full px-4 py-2 border-none focus:outline-none text-sm sm:text-base"
                      value={selectedDate}
                      onChange={e => {
                        setSelectedDate(e.target.value);
                        setIsDatePickerOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
              <button
                type="button"
                className="w-full sm:w-[160px] py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex justify-center items-center gap-2"
                onClick={e => handleSubmit(e as unknown as React.FormEvent, 'draft')}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                type="submit"
                disabled={!postTitle || !postContent || selectedPlatforms.length === 0 || isLoading}
                className={`w-full sm:w-[160px] py-2.5 px-8 text-sm font-semibold text-white rounded-lg transition-colors duration-200 flex justify-center items-center gap-2
                  ${!postTitle || !postContent || selectedPlatforms.length === 0 || isLoading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
              >
                {isLoading ? 'Publishing...' : 'Publish Now'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreatePostForm;
