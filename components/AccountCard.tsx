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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white border border-gray-200 rounded-xl transition-shadow hover:shadow-lg">
      {/* Left Side: Icon, Name, and Status */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex-shrink-0 h-10 w-10">{icon}</div>
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          {isConnected ? (
            <span className="mt-2 inline-flex items-center text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-md">
              <Link className="w-4 h-4" /> Connected
            </span>
          ) : (
            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
              <Unlink className="w-4 h-4" /> Not Connected
            </span>
          )}
        </div>
      </div>

      {/* Right Side: Connect/Disconnect Button */}
      <div className="w-full sm:w-auto">
        {isConnected ? (
          <button
            onClick={() => onToggleConnection(id)}
            className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors"
          >
            <LinkIcon /> Disconnect
          </button>
        ) : (
          <button
            onClick={() => onToggleConnection(id)}
            className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <LinkIcon /> Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountCard;