'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Typography,
    Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Calendar, CloudUploadIcon } from 'lucide-react';

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
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => onOpenChange(false)} fullWidth maxWidth="sm">
            {/* Header */}
            <DialogTitle className="flex items-center justify-between">
                Create New Post
                <IconButton onClick={() => onOpenChange(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="postTitle"
                            value={postTitle}
                            onChange={e => setPostTitle(e.target.value)}
                            placeholder="Enter post title"
                            className="w-full px-3 py-2 rounded-md bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            onChange={e => setPostContent(e.target.value)}
                            placeholder="Write your update..."
                            className="w-full px-3 py-2 bg-gray-50 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Media Upload */}
                    {/* Upload Media */}
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Upload Media
                    </Typography>
                    <Paper
                    className='flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200'
                        variant="outlined"
                        sx={{
                            borderStyle: "dashed",
                            textAlign: "center",
                            p: 3,
                            mb: 2,
                            cursor: "pointer",
                        }}
                    >
                        <CloudUploadIcon style={{ fontSize: 40, color: "gray" }} />
                        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                            Drag files here or click to browse
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Supports images, videos, and PDFs
                        </Typography>
                    </Paper>

                    {/* Platforms */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Platforms</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {platforms.map(platform => (
                                <div
                                    key={platform.id}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <input
                                        id={platform.id}
                                        type="checkbox"
                                        checked={selectedPlatforms.includes(platform.id)}
                                        onChange={() => handlePlatformChange(platform.id)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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

                    {/* Schedule */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Post (Optional)</label>
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center gap-2 w-full rounded-lg bg-white border border-gray-200 px-3 py-2 cursor-pointer focus:outline-none"
                                onClick={() => setIsDatePickerOpen(prev => !prev)}
                            >
                                <Calendar className="h-5 w-5 text-gray-500" />
                                <span className="text-gray-500 text-sm">
                                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Pick a date'}
                                </span>
                            </button>
                            {isDatePickerOpen && (
                                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <input
                                        type="date"
                                        title="Select a date"
                                        className="w-full px-4 py-2 border-none focus:outline-none text-sm"
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
                    <DialogActions>
                        <Button
                            variant="outlined"
                            onClick={e => handleSubmit(e as unknown as React.FormEvent, 'draft')}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save as Draft'}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!postTitle || !postContent || selectedPlatforms.length === 0 || isLoading}
                        >
                            {isLoading ? 'Publishing...' : 'Publish Now'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostForm;
