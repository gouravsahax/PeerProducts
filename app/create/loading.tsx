import React from 'react';
import LoadingInput from '../components/LoadingInput';

export default function Loading() {
  return (
    <div className="w-screen h-full flex justify-center items-center pt-6">
      <div className="px-4 py-4 flex flex-col mt-6 w-[96%] md:w-[70%] lg:w-[40%] gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <LoadingInput key={i} />
        ))}

        <div className="flex flex-col gap-2 w-full">
          <div className="w-40 h-4 bg-zinc-800 rounded" />
          <div className="w-full h-10 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-sm" />
        </div>

        <div className="w-full h-10 bg-zinc-850 rounded-sm mt-4" />
      </div>
    </div>
  );
}
