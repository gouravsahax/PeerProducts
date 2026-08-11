export default function Loading() {
  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex flex-col items-center px-4 py-8 gap-8">
      {/* Profile Skeleton */}
      <div className="w-full max-w-md bg-zinc-900/40 border-1 border-zinc-700 rounded-sm p-8 shadow-2xl animate-pulse flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4 border-1 border-zinc-700" />
        <div className="w-32 h-6 bg-zinc-800 rounded mb-6" />
        <hr className="border-t-1 border-zinc-700 w-full mb-6" />
        <div className="w-full space-y-4">
          <div className="w-full h-12 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl flex items-center px-3 gap-3">
            <div className="w-5 h-5 bg-zinc-800 rounded-full shrink-0" />
            <div className="flex flex-col gap-1 w-full">
              <div className="w-12 h-2 bg-zinc-800 rounded" />
              <div className="w-40 h-3.5 bg-zinc-800 rounded" />
            </div>
          </div>
          <div className="w-full h-12 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl flex items-center px-3 gap-3">
            <div className="w-5 h-5 bg-zinc-800 rounded-full shrink-0" />
            <div className="flex flex-col gap-1 w-full">
              <div className="w-24 h-2 bg-zinc-800 rounded" />
              <div className="w-16 h-3.5 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Reccs Skeleton */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="w-40 h-6 bg-zinc-800 rounded mb-2 animate-pulse" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-1 border-zinc-700 rounded-md px-4 py-5 mb-4 break-inside-avoid bg-zinc-950/40 animate-pulse flex flex-col gap-4">
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
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
