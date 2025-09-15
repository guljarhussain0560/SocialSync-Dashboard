// components/CreatePostForm.tsx
'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';


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

const CreatePostForm = ({ open, onOpenChange }: CreatePostFormProps) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tayog']);

    const handlePlatformChange = (platformId: string) => {
        setSelectedPlatforms((prev) =>
            prev.includes(platformId)
                ? prev.filter((id) => id !== platformId)
                : [...prev, platformId]
        );
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay
                    
                    className="fixed inset-0 bg-black/50 radix-state-open:animate-fadeIn radix-state-closed:animate-fadeOut"
                />


                {/* Content */}
                <Dialog.Content
                    className="fixed top-[50%] left-[50%] max-h-[90vh] w-full max-w-2xl 
                     translate-x-[-50%] translate-y-[-50%] rounded-xl 
                     bg-white text-gray-800 shadow-2xl focus:outline-none 
                     data-[state=open]:animate-slideIn"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <Dialog.Title className="text-xl font-semibold">Create New Post</Dialog.Title>
                        <Dialog.Close asChild>
                            <button
                                type="button"
                                title="Close"
                                className="text-gray-400 hover:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Form */}
                    <form className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                Post Title
                            </label>
                            <input
                                type="text"
                                id="postTitle"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                placeholder="Enter post title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 mb-1">
                                Post Content
                            </label>
                            <textarea
                                id="postContent"
                                rows={5}
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                placeholder="Write your update or opportunity..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Media</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
                              border-dashed rounded-md cursor-pointer hover:border-blue-500">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 
                         4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 
                         4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 
                         4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <p className="pl-1">
                                            Drag files here or{' '}
                                            <span className="font-medium text-blue-600">click to browse</span>
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500">Supports images, videos, and PDFs</p>
                                </div>
                            </div>
                        </div>

                        {/* Platforms */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {platforms.map((platform) => (
                                    <div key={platform.id} className="flex items-center">
                                        <input
                                            id={platform.id}
                                            type="checkbox"
                                            checked={selectedPlatforms.includes(platform.id)}
                                            onChange={() => handlePlatformChange(platform.id)}
                                            className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label
                                            htmlFor={platform.id}
                                            className="ml-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer"
                                        >
                                            <span className={`w-4 h-4 rounded-sm mr-2 ${platform.color}`}></span>
                                            {platform.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div>
                            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                                Schedule Post (Optional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 
                         18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 
                         2.25 0 0121 7.5v11.25m-18 
                         0A2.25 2.25 0 005.25 21h13.5A2.25 
                         2.25 0 0021 18.75m-18 0h18"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="schedule"
                                    placeholder="Pick a date"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="flex items-center justify-end p-6 border-t border-gray-200 space-x-3">
                        <button
                            type="button"
                            className="px-6 py-2.5 text-sm font-semibold text-gray-700 
                         bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-semibold text-white 
                         bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Publish Now
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreatePostForm;
