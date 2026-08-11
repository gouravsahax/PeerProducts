'use client';

import React from 'react';
import { Mail, Award } from 'lucide-react';

interface UserData {
  email: string | null;
  reccCount: number;
}

export default function ProfileStats({ user }: { user: UserData }) {
  return (
    <div className="space-y-4 text-zinc-300">
      <div className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl">
        <Mail className="w-5 h-5 text-zinc-500 shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email</span>
          <span className="text-sm truncate text-white">{user.email ?? 'No email associated'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl">
        <Award className="w-5 h-5 text-zinc-500 shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Recommendations</span>
          <span className="text-sm text-white font-medium">{user.reccCount}</span>
        </div>
      </div>
    </div>
  );
}
