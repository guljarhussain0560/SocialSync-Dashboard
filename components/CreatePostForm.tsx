// components/CreatePostForm.tsx
'use client';

import React, { useState } from 'react';
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

const CreatePostForm = ({ open, onOpenChange }: CreatePostFormProps) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tayog']);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[97vh] w-[97%] sm:w-[500px] 
                    translate-x-[-50%] translate-y-[-50%] rounded-xl overflow-auto
                    bg-white text-gray-800 shadow-2xl focus:outline-none">
                    
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                        <Dialog.Title className="text-lg sm:text-xl font-semibold">Create New Post</Dialog.Title>
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
                    <form className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
                                className="w-full px-3 py-2 rounded-md bg-gray-50
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
                                className="w-full px-3 py-2 bg-gray-50 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Upload - adjusted for mobile */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Media</label>
                            <div className="mt-1 flex justify-center p-4 sm:px-6 sm:pt-5 sm:pb-6 border-2 border-gray-300 
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
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer pl-1 font-medium text-blue-600"
                                        >
                                            Drag files here or click to browse
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                title="Upload your file"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        alert(`Selected file: ${e.target.files[0].name}`);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">Supports images, videos, and PDFs</p>
                                </div>
                            </div>
                        </div>

                        {/* Platforms - modern design */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select Platforms</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {platforms.map((platform) => (
                                    <div 
                                        key={platform.id} 
                                        className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                                    >
                                        <input
                                            id={platform.id}
                                            type="checkbox"
                                            checked={selectedPlatforms.includes(platform.id)}
                                            onChange={() => handlePlatformChange(platform.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-offset-2"
                                        />
                                        <label
                                            htmlFor={platform.id}
                                            className="ml-3 flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer flex-grow"
                                        >
                                            <span className={`w-4 h-4 rounded ${platform.color}`}></span>
                                            {platform.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schedule - adjusted for mobile */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Schedule Post (Optional)
                            </label>
                            <div className="relative">
                                <div
                                    className="flex items-center gap-2 w-full rounded-lg bg-white border border-gray-200 px-3 py-2 cursor-pointer"
                                    onClick={() => setIsDatePickerOpen((prev) => !prev)}
                                >
                                    <Calendar className="h-5 w-5 text-gray-500" />
                                    <span className="text-gray-500">
                                        Pick a date
                                    </span>
                                </div>
                                {isDatePickerOpen && (
                                    <div className="absolute top-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        <input
                                            type="date"
                                            title="Select a date"
                                            className="w-full px-4 py-2 border-none focus:outline-none"
                                            value={selectedDate}
                                            onChange={(e) => {
                                                setSelectedDate(e.target.value);
                                                setIsDatePickerOpen(false);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Footer - optimized for both mobile and desktop */}
                    <div className="sticky bottom-0 z-10 ">
                        <div className="max-w-md mx-auto px-4 py-4 sm:px-6 sm:py-6">
                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                                <button
                                    type="button"
                                    className="w-full sm:w-[160px] py-2.5 text-sm font-semibold text-gray-700 
                                        bg-white border border-gray-300 rounded-lg hover:bg-gray-50 
                                        transition-colors duration-200"
                                >
                                    Save as Draft
                                </button>
                                <button
                                    type="submit"
                                    disabled={!postTitle || !postContent || selectedPlatforms.length === 0}
                                    className={`w-full sm:w-[160px] py-2.5 px-8 text-sm font-semibold text-white rounded-lg 
                                        transition-colors duration-200
                                        ${!postTitle || !postContent || selectedPlatforms.length === 0
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
                                >
                                    Publish Now
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreatePostForm;
