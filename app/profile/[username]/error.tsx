'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-black backdrop-blur-lg border-1 border-zinc-700 rounded-sm p-8 shadow-2xl flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-950 flex items-center justify-center mb-4">
          <span className="text-red-500 text-2xl font-bold">!</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Failed to load profile</h2>
        <p className="text-zinc-400 text-sm mb-6">{error.message || 'Something went wrong'}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-sm hover:bg-white font-medium transition cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
