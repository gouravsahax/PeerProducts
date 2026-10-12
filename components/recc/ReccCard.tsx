import Link from "next/link";
import ReccImage from "./ReccImage";
import LikeButton from "./LikeButton";
import { getUserProfileById } from "@/actions/user";
import Image from "next/image";
import { User } from "lucide-react";
import type { ReccItem } from "@/types";

export type { ReccItem };

export default async function ReccCard({ recc }: { recc: ReccItem }) {
  const user = await getUserProfileById(recc?.userId);

  return (
    <article
      className="border-1 border-zinc-700 rounded-md px-4 py-4 bg-zinc-950/40 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-sm text-zinc-400 pb-2">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user?.name ? `${user.name}'s profile avatar` : "User profile avatar"}
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : (
          <User className="h-5 w-5" aria-hidden="true" />
        )}
        <span className="text-white hover:underline hover:underline-offset-2 font-medium">
          <Link href={`/profile/${user?.username}`}>
            {user?.name ? user.name : "Unknown"}
          </Link>
        </span>
        <span aria-hidden="true">→</span>
        <span className="font-medium">
          recommended a{" "}
          {recc.url ? (
            <Link
              href={recc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline underline-offset-2"
            >
              {recc.type}
            </Link>
          ) : (
            <span className="text-white">{recc.type}</span>
          )}
        </span>
      </div>

      <h2 className="text-sm font-semibold text-white">
        {recc.title}
      </h2>
      {recc.description && (
        <p className="text-sm text-zinc-400 mt-1">
          {recc.description}
        </p>
      )}

      {recc.imageUrl && (
        <ReccImage src={recc.imageUrl} alt={recc.title} />
      )}

      <div className="mt-2 flex items-center gap-5 text-sm text-zinc-400">
        <LikeButton
          reccId={recc.id}
          initialLikeCount={recc.likeCount}
          initialHasLiked={Boolean(recc.likes && recc.likes.length > 0)}
        />
        <span className="ml-auto" suppressHydrationWarning>
          {new Date(recc.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </article>
  );
}
