'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Analytics {
  id: string;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  platforms: string[];
  analytics?: Analytics | null;
}

export default function PostDetailsPage() {
  const params = useParams();
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    async function fetchPostData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch post');
        }

        const postData: Post = await res.json();
        setPost(postData);

        // Set analytics from post data, defaulting to zeros if missing
        setAnalytics(
          postData.analytics ?? { id: '', reach: 0, likes: 0, comments: 0, shares: 0 }
        );
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setPost(null);
        setAnalytics({ id: '', reach: 0, likes: 0, comments: 0, shares: 0 });
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [postId]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading post details...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (!post)
    return <div className="text-center mt-10 text-gray-500">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10">
      <div className="bg-white p-8 sm:p-10 rounded-xl border border-gray-200 shadow-sm">
        {/* Post Info */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{post.title}</h1>
        <br />
        <p className="text-base text-left sm:text-lg text-gray-700 mb-4 break-words">{post.content}</p>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <br />
          <span className="inline-block text-xs font-semibold text-white bg-blue-500 rounded-full px-3 py-1">{post.status}</span>
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Platforms:  </span> {post.platforms.join(' , ')}
          </span>
        </div>

        {/* Analytics Info */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <p className="text-gray-500 text-xs uppercase flex items-center justify-center gap-2">
                <span>Reach</span>
                <span className="text-blue-500">
                  <i className="fas fa-chart-line"></i>
                </span>
              </p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.reach ?? 0}</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <p className="text-gray-500 text-xs uppercase flex items-center justify-center gap-2">
                <span>Likes</span>
                <span className="text-red-500">
                  <i className="fas fa-heart"></i>
                </span>
              </p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.likes ?? 0}</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <p className="text-gray-500 text-xs uppercase flex items-center justify-center gap-2">
                <span>Comments</span>
                <span className="text-green-500">
                  <i className="fas fa-comments"></i>
                </span>
              </p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.comments ?? 0}</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-100">
              <p className="text-gray-500 text-xs uppercase flex items-center justify-center gap-2">
                <span>Shares</span>
                <span className="text-purple-500">
                  <i className="fas fa-share"></i>
                </span>
              </p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.shares ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
