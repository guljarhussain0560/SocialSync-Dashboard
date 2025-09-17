'use client';
import React, { useEffect, useState } from 'react';
import AccountCard, { type SocialAccount } from './AccountCard';
import { LinkedInIcon, TwitterXIcon, InstagramIcon, FacebookIcon } from './icons';

const providerIcons: Record<string, React.ReactNode> = {
  LINKEDIN: <LinkedInIcon />,
  TAYOG: <TwitterXIcon />,
  INSTAGRAM: <InstagramIcon />,
  FACEBOOK: <FacebookIcon />,
  
};

const ConnectedAccountsSection = () => {
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch accounts from backend
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await fetch('/api/accounts');
        const data = await res.json();

        const mapped: SocialAccount[] = data.map((acc: any) => ({
          id: acc.id,
          provider: acc.provider,
          name: acc.provider, // You can map prettier names here
          icon: providerIcons[acc.provider.toUpperCase()] || <FacebookIcon />,
          isConnected: acc.isConnected,
        }));

        setSocialAccounts(mapped);
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  // Called by AccountCard after toggling
  const handleToggleConnection = (id: string, isConnected: boolean) => {
    setSocialAccounts(prev =>
      prev.map(acc => (acc.id === id ? { ...acc, isConnected } : acc))
    );
  };

  if (loading) return <p>Loading accounts...</p>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 max-w-[1500px] mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-1xl text-gray-900">Connected Accounts</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your connected social media platforms
        </p>
      </div>

      {/* Grid of Account Cards */}
      <div className="mt-6 mb-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {socialAccounts.map(account => (
          <AccountCard
            key={account.id}
            account={account}
            onToggleConnection={handleToggleConnection}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectedAccountsSection;
