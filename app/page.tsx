// app/page.tsx
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import ConnectedAccountsSection from "@/components/ConnectedAccountsSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    // 1. This is the main container for the entire page.
    // It sets the background color and overall padding.
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">

      {/* 2. The Navbar component sits at the very top. */}
      <Navbar />

      {/* 3. This div acts as a container for the page content below the navbar.
          - We add margin-top (mt-12) to create space between the navbar and this section.
          - This ensures the layout is a clean vertical stack. */}
      <div className="mt-12">
        <ConnectedAccountsSection />
      </div>

      <div className="mt-8">
        <AnalyticsDashboard />
      </div>

    </main>
  );
}