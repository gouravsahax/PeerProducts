"use client";

import { toggleFollow } from "@/lib/user-action";
import { useTransition } from "react";
import { Users } from "lucide-react";

export default function FollowButton({ targetUserId, isFollowing, className = "mt-4 w-full" }: { targetUserId: string, isFollowing: boolean, className?: string }) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      await toggleFollow(targetUserId);
    });
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isPending}
      className={`px-6 py-2 rounded-sm text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${className} ${
        isFollowing
          ? "bg-zinc-800 text-white border-1 border-zinc-600 hover:bg-zinc-700"
          : "bg-white text-black border-1 border-white hover:bg-zinc-200"
      }`}
    >
      <Users className="w-4 h-4" />
      {isPending ? "Updating..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
