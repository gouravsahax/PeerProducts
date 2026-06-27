import React from 'react';

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="px-4 md:px-8 py-4 flex flex-col gap-4 lg:w-[60vw] w-full">
        <div className="w-48 h-5 bg-zinc-900 rounded animate-pulse" />

        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="border border-zinc-800 px-4 py-4 rounded-sm flex flex-col bg-black/40 text-zinc-300 gap-3 animate-pulse"
          >
            <div className="w-40 h-6 bg-zinc-800 rounded" />
            <div className="w-[90%] h-4 bg-zinc-800/60 rounded" />
            <div className="w-[80%] h-4 bg-zinc-800/60 rounded" />
            {i % 2 === 0 && (
              <div className="w-full h-40 bg-zinc-850 rounded" />
            )}
            <div className="w-20 h-4 bg-zinc-800 rounded underline" />
            
            <div className="flex gap-2 mt-2">
              <div className="w-16 h-8 bg-zinc-800 rounded" />
              <div className="w-20 h-8 bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
