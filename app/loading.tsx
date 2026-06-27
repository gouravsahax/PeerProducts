import React from 'react';

export default function Loading() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full min-h-screen lg:w-[85vw] xl:w-[80vw] flex flex-col border-x border-zinc-900">
        <div className="w-full columns-1 md:columns-2 gap-4 p-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border border-zinc-900 rounded-xl px-4 py-5 mb-4 break-inside-avoid bg-zinc-950/20 animate-pulse flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800" />
                <div className="flex flex-col gap-1.5">
                  <div className="w-24 h-3.5 bg-zinc-800 rounded" />
                  <div className="w-36 h-2.5 bg-zinc-800/80 rounded" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-[85%] h-5 bg-zinc-800 rounded" />
                <div className="w-full h-3 bg-zinc-800/60 rounded" />
                <div className="w-[92%] h-3 bg-zinc-800/60 rounded" />
              </div>

              {i % 2 === 0 && (
                <div className="w-full aspect-video bg-zinc-800 rounded-lg" />
              )}

              <div className="flex items-center gap-4 mt-2">
                <div className="w-12 h-4 bg-zinc-800 rounded" />
                <div className="w-16 h-4 bg-zinc-800 rounded ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
