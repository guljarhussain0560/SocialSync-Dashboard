'use client';

import React, { useState } from 'react';
import AccountCard, { type SocialAccount } from './AccountCard';
// Import the new brand icons
import { LinkedInIcon, TwitterXIcon, InstagramIcon, FacebookIcon } from './icons';

// Updated data using the new brand icon components
const initialAccounts: SocialAccount[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    isConnected: false,
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: <TwitterXIcon />,
    isConnected: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <InstagramIcon />,
    isConnected: false,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <FacebookIcon />,
    isConnected: true,
  },
];

const ConnectedAccountsSection = () => {
  const [socialAccounts, setSocialAccounts] = useState(initialAccounts);

  const handleToggleConnection = (accountId: string) => {
    setSocialAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === accountId
          ? { ...account, isConnected: !account.isConnected }
          : account
      )
    );
  };

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