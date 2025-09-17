// app/page.tsx
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import ConnectedAccountsSection from "@/components/ConnectedAccountsSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mt-12">
        <ConnectedAccountsSection />
      </div>
      <div className="mt-8">
        <AnalyticsDashboard />
      </div>

    </main>
  );
}