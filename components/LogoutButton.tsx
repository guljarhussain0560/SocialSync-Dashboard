// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false, // we handle redirect manually
    });

    // Clear client-side cache or redirect after sign out
    router.push("/login"); // redirect to login or signup
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer lg:w-[140px] lg:h-[35px] md:w-[120px] md:h-[55px] flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
}
