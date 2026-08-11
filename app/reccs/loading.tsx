import React from 'react';
import LoadingMyReccCard from '../components/LoadingMyReccCard';

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="px-4 md:px-8 py-4 flex flex-col gap-4 lg:w-[60vw] w-full">
        <div className="w-48 h-5 bg-zinc-900 rounded animate-pulse" />

        {[...Array(4)].map((_, i) => (
          <LoadingMyReccCard key={i} hasImage={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}
