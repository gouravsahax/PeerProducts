import React from 'react';
import LoadingReccCard from './components/LoadingReccCard';

export default function Loading() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full min-h-screen lg:w-[85vw] xl:w-[80vw] flex flex-col border-x-1 border-zinc-700">
        <div className="w-full columns-1 md:columns-2 gap-4 p-4">
          {[...Array(6)].map((_, i) => (
            <LoadingReccCard key={i} hasImage={i % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
