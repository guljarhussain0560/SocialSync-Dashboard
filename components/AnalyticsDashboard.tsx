import { TotalReachChart } from './charts/TotalReachChart';
import { EngagementDonutChart } from './charts/EngagementDonutChart';
import { TopPlatformsChart } from './charts/TopPlatformsChart';
import { PostPerformanceTable } from './PostPerformanceTable';

export function AnalyticsDashboard() {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm mx-auto max-w-400">
      {/* Top Section: Analytics Overview */}
      <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
          <p className="text-sm text-gray-600">Track your performance across all platforms</p>
      </div>

      {/* Grid for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TotalReachChart />
        </div>
        <div className="lg:col-span-1">
          <EngagementDonutChart />
        </div>
        <div className="lg:col-span-3">
          <TopPlatformsChart />
        </div>
      </div>
      
      {/* Bottom Section: Post Performance Table */}
      <div className="mt-6">
        <PostPerformanceTable />
      </div>
    </div>
  );
}