'use client';

import React, { useState, useTransition } from 'react';
import { updateProfileName, updateProfileUsername } from '@/lib/user-action';
import { Edit3, Check, X, Loader2 } from 'lucide-react';

interface UserData {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
}

export default function ProfileHeader({ user }: { user: UserData }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  
  const [name, setName] = useState(user.name ?? '');
  const [username, setUsername] = useState(user.username ?? '');
  
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  
  const [isPending, startTransition] = useTransition();

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);
    const trimmed = name.trim();
    if (!trimmed) return setNameError('Name cannot be empty');

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('name', trimmed);
        await updateProfileName(formData);
        setIsEditingName(false);
      } catch (err: any) {
        setNameError(err.message || 'Failed to update name');
      }
    });
  };

  const handleSaveUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(null);
    const trimmed = username.trim();
    if (!trimmed) return setUsernameError('Username cannot be empty');

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('username', trimmed);
        await updateProfileUsername(formData);
        setIsEditingUsername(false);
      } catch (err: any) {
        setUsernameError(err.message || 'Failed to update username');
      }
    });
  };

  const getInitials = (fullName: string | null) => {
    if (!fullName) return 'U';
    return fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative group mb-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 flex items-center justify-center text-white text-3xl font-semibold shadow-inner border-1 border-zinc-700 select-none overflow-hidden">
          {user.image ? (
            <img src={user.image} alt={user.name ?? 'User Avatar'} className="w-full h-full object-cover" />
          ) : (
            getInitials(user.name)
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        {/* Name Section */}
        {isEditingName ? (
          <form onSubmit={handleSaveName} className="w-full flex flex-col items-center gap-1">
            <div className="w-full flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 text-white rounded-lg px-3 py-1.5 text-center text-lg font-bold outline-none transition"
                placeholder="Name"
                maxLength={40}
                disabled={isPending}
                autoFocus
              />
              <button type="submit" disabled={isPending} className="p-2 bg-white text-black hover:bg-zinc-200 rounded-lg cursor-pointer transition">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              </button>
              <button type="button" onClick={() => { setName(user.name ?? ''); setNameError(null); setIsEditingName(false); }} disabled={isPending} className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg cursor-pointer transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            {nameError && <p className="text-red-500 text-xs font-medium">{nameError}</p>}
          </form>
        ) : (
          <div className="flex items-center gap-2 group">
            <h2 className="text-2xl font-bold text-white tracking-tight">{user.name ?? 'Anonymous'}</h2>
            <button onClick={() => setIsEditingName(true)} className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/60 cursor-pointer transition" title="Edit Name">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Username Section */}
        {isEditingUsername ? (
          <form onSubmit={handleSaveUsername} className="w-full flex flex-col items-center gap-1">
            <div className="w-full flex items-center gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 text-zinc-300 rounded-lg px-3 py-1.5 text-center text-sm outline-none transition"
                placeholder="Username"
                maxLength={30}
                disabled={isPending}
                autoFocus
              />
              <button type="submit" disabled={isPending} className="p-1.5 bg-white text-black hover:bg-zinc-200 rounded-lg cursor-pointer transition">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              </button>
              <button type="button" onClick={() => { setUsername(user.username ?? ''); setUsernameError(null); setIsEditingUsername(false); }} disabled={isPending} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg cursor-pointer transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            {usernameError && <p className="text-red-500 text-xs font-medium">{usernameError}</p>}
          </form>
        ) : (
          <div className="flex items-center gap-2 group">
            <p className="text-zinc-500 text-sm">@{user.username}</p>
            <button onClick={() => setIsEditingUsername(true)} className="p-1 text-zinc-500 hover:text-zinc-300 rounded-md hover:bg-zinc-800/60 cursor-pointer transition" title="Edit Username">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
