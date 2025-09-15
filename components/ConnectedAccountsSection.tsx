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
    isConnected: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <FacebookIcon />,
    isConnected: false,
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
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm mx-auto max-w-400">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Connected Accounts</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage your connected social media platforms
        </p>
      </div>

      {/* Grid of Account Cards */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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