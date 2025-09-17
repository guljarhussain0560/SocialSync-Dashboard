"use client";
import React, { useState } from "react";
import { LinkIcon } from "./icons";
import { Unlink, Link } from "lucide-react";

export type SocialAccount = {
  id: string; // Prisma ID
  provider: string; // FACEBOOK, INSTAGRAM, etc.
  name: string;
  icon: React.ReactNode;
  isConnected: boolean;
};

type AccountCardProps = {
  account: SocialAccount;
  onToggleConnection: (id: string, isConnected: boolean) => void;
};

const AccountCard = ({ account, onToggleConnection }: AccountCardProps) => {
  const { id, name, icon, isConnected, provider } = account;
  const [loading, setLoading] = useState(false);

  const handleToggleConnection = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });

      if (!response.ok) throw new Error("Failed to toggle connection");

      const updatedAccount = await response.json();

      // Update parent state
      onToggleConnection(updatedAccount.id, updatedAccount.isConnected);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white border border-gray-200 rounded-xl transition-shadow hover:shadow-lg">
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

      <div className="w-full sm:w-auto">
        <button
          onClick={handleToggleConnection}
          disabled={loading}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
            ${isConnected ? "text-black bg-white border border-gray-300 hover:bg-gray-100" : "text-white bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
          ) : (
            <LinkIcon />
          )}
          {loading ? "Processing..." : isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
