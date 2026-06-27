import React from 'react';

export default function Loading() {
  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800 rounded-sm p-8 shadow-2xl animate-pulse flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4 border border-zinc-700" />
        
        <div className="w-32 h-6 bg-zinc-800 rounded mb-6" />

        <hr className="border-zinc-800 w-full mb-6" />

        <div className="w-full space-y-4">
          <div className="w-full h-12 bg-zinc-950/40 border border-zinc-900 rounded-xl flex items-center px-3 gap-3">
            <div className="w-5 h-5 bg-zinc-800 rounded-full shrink-0" />
            <div className="flex flex-col gap-1 w-full">
              <div className="w-12 h-2 bg-zinc-800 rounded" />
              <div className="w-40 h-3.5 bg-zinc-800 rounded" />
            </div>
          </div>

          <div className="w-full h-12 bg-zinc-950/40 border border-zinc-900 rounded-xl flex items-center px-3 gap-3">
            <div className="w-5 h-5 bg-zinc-800 rounded-full shrink-0" />
            <div className="flex flex-col gap-1 w-full">
              <div className="w-24 h-2 bg-zinc-800 rounded" />
              <div className="w-16 h-3.5 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>

        <div className="w-full h-10 bg-zinc-800/60 border border-zinc-800 rounded-xl mt-8" />
      </div>
    </div>
  );
}
