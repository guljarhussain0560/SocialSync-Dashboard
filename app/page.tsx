// app/page.tsx
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import ConnectedAccountsSection from "@/components/ConnectedAccountsSection";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check session on the server
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signup");
  }

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
