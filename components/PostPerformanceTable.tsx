'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, Upload, Eye } from 'lucide-react';

// Backend post type
interface BackendPost {
  id: string;
  title: string;
  platforms: string[];
  createdAt: string;
  analytics?: {
    reach: number;
    likes: number;
    comments: number;
    shares: number;
  } | null;
}

const platformStyles: Record<string, string> = {
  linkedin: 'bg-blue-600 text-white',
  'twitter/x': 'bg-black text-white',
  tayog: 'bg-green-500 text-white',
  instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white',
  facebook: 'bg-blue-700 text-white',
};

export function PostPerformanceTable() {
  const [posts, setPosts] = useState<BackendPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/posts/analytics');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 w-full">
      <h2 className="text-2xl font-semibold text-black">Post Performance</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[1024px] text-sm">
          <thead className="text-black font-bold">
            <tr className="border-b border-gray-200 ">
              <th className="px-4 py-3 text-left font-medium">Post Title</th>
              <th className="px-4 py-3 text-left font-medium">Platform</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1.5">
                  <Eye size={15} /> Reach
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp size={15} /> Likes
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={15} /> Comments
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1.5">
                  <Upload size={15} /> Shares
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-8">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8">No posts found.</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{post.title}</td>
                  <td className="px-4 py-3">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium mr-1 ${platformStyles[platform.toLowerCase()] || 'bg-gray-200 text-gray-700'}`}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 ">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">{post.analytics?.reach ?? 0}</td>
                  <td className="px-4 py-3 text-center">{post.analytics?.likes ?? 0}</td>
                  <td className="px-4 py-3 text-center">{post.analytics?.comments ?? 0}</td>
                  <td className="px-4 py-3 text-center">{post.analytics?.shares ?? 0}</td>
                  <td className="px-4 py-3 text-left">
                    <button type="button" className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}