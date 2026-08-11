'use client';

import React from 'react';
import { SignOut } from '@/lib/auth-action';
import { LogOut } from 'lucide-react';

export default function ProfileActions() {
  return (
    <div className="mt-8 flex flex-col gap-3">
      <form action={SignOut} className="w-full">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 rounded-xl text-sm font-medium transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </form>
    </div>
  );
}
