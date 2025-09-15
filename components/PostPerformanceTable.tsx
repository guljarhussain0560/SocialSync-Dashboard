import { ThumbsUp, MessageCircle,Upload, Eye } from 'lucide-react';
// Mock data with the correct solid-color styles
const posts = [
  { title: 'AI Research Webinar', platform: 'LinkedIn', date: 'Sep 15, 2025', reach: '1.2k', likes: 56, comments: 14, shares: 12, platformStyle: 'bg-blue-600 text-white' },
  { title: 'Lab Collaboration Opportunity', platform: 'Twitter/X', date: 'Sep 14, 2025', reach: '850', likes: 22, comments: 5, shares: 8, platformStyle: 'bg-black text-white' },
  { title: 'New Research Paper Published', platform: 'Tayog', date: 'Sep 13, 2025', reach: '950', likes: 34, comments: 18, shares: 15, platformStyle: 'bg-green-500 text-white' },
  { title: 'Conference Presentation', platform: 'Instagram', date: 'Sep 12, 2025', reach: '680', likes: 45, comments: 8, shares: 6, platformStyle: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white' },
  { title: 'Research Grant Announcement', platform: 'Facebook', date: 'Sep 11, 2025', reach: '520', likes: 28, comments: 12, shares: 9, platformStyle: 'bg-blue-700 text-white' },
];

export function PostPerformanceTable() {
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
            {posts.map((post) => (
              <tr key={post.title} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{post.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.platformStyle}`}>
                    {post.platform}
                  </span>
                </td>
                <td className="px-4 py-3 ">{post.date}</td>
                <td className="px-4 py-3 text-center">{post.reach}</td>
                <td className="px-4 py-3 text-center">{post.likes}</td>
                <td className="px-4 py-3 text-center">{post.comments}</td>
                <td className="px-4 py-3 text-center">{post.shares}</td>
                <td className="px-4 py-3 text-left">
                  <button type="button" className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}