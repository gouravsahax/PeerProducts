import Link from "next/link";
import ReccImage from "./ReccImage";
import LikeButton from "./LikeButton";

export default function ReccCard({ recc }: { recc: any }) {
  return (
    <article
      className="border border-zinc-800 rounded-xl px-4 py-4 bg-zinc-950/40 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <div className="border-1 border-zinc-800 rounded-full">image</div>
        <span className="text-white font-medium">
          {recc.user?.name ?? "Unknown"}
        </span>
        <span>→</span>
        <span>
          recommended a{" "}
          {recc.url ? (
            <Link
              href={recc.url}
              target="_blank"
              className="text-blue-300 underline underline-offset-2"
            >
              {recc.type}
            </Link>
          ) : (
            <span className="text-white">{recc.type}</span>
          )}
        </span>
      </div>

      <h2 className="text-base font-semibold text-white">
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
        <span className="ml-auto">
          {new Date(recc.createdAt).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
}
