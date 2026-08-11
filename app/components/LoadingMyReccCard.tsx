export default function LoadingMyReccCard({ hasImage = false }: { hasImage?: boolean }) {
  return (
    <div className="border border-zinc-800 px-4 py-4 rounded-sm flex flex-col bg-black/40 text-zinc-300 gap-3 animate-pulse">
      <div className="w-40 h-6 bg-zinc-800 rounded" />
      <div className="w-[90%] h-4 bg-zinc-800/60 rounded" />
      <div className="w-[80%] h-4 bg-zinc-800/60 rounded" />
      {hasImage && (
        <div className="w-full h-40 bg-zinc-850 rounded" />
      )}
      <div className="w-20 h-4 bg-zinc-800 rounded underline" />
      
      <div className="flex gap-2 mt-2">
        <div className="w-16 h-8 bg-zinc-800 rounded" />
        <div className="w-20 h-8 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}
