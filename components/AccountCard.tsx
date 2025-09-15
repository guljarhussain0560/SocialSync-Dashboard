import React from 'react';
import { LinkIcon, } from './icons'; // Import the new LinkIcon
import { Unlink, Link } from 'lucide-react';
export type SocialAccount = {
  id: string;
  name: string;
  icon: React.ReactNode;
  isConnected: boolean;
};

type AccountCardProps = {
  account: SocialAccount;
  onToggleConnection: (id: string) => void;
};

const AccountCard = ({ account, onToggleConnection }: AccountCardProps) => {
  const { id, name, icon, isConnected } = account;

  return (
    <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl shadow-sm transition-shadow hover:shadow-lg">
      {/* Left Side: Icon, Name, and Status */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 h-10 w-10">{icon}</div>
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          {isConnected ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-md">
              <Link className="w-4 h-4" /> Connected
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
              <Unlink className="w-4 h-4" /> Not Connected
            </span>
          )}
        </div>
      </div>

      {/* Right Side: Connect/Disconnect Button */}
      <div>
        {isConnected ? (
          <button
            onClick={() => onToggleConnection(id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <LinkIcon /> Disconnect
          </button>
        ) : (
          <button
            onClick={() => onToggleConnection(id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LinkIcon /> Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountCard;