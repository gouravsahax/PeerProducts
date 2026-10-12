import Link from "next/link";
import Image from "next/image";
import SubmitButton from "./SubmitButton";
import { deleteRecc } from "@/lib/recc-action";
import type { ReccItem } from "./ReccCard";

export default function MyReccCard({ recc }: { recc: ReccItem }) {
  return (
    <div className="border border-zinc-700 px-4 py-2 rounded-sm flex flex-col bg-black text-zinc-300">
      <h3 className="text-lg uppercase mb-2">{recc.title}</h3>
      <p className="mb-4">{recc.description}</p>
      {recc.imageUrl && (
        <div className="mb-4 overflow-hidden rounded-sm border border-zinc-700 relative aspect-video w-full">
          <Image
            src={recc.imageUrl}
            alt={recc.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      <Link
        className="underline mb-4"
        href={recc.url || "/"}
        target={recc.url ? "_blank" : undefined}
        rel={recc.url ? "noopener noreferrer" : undefined}
      >
        {recc.type}
      </Link>
      <div className="flex gap-2 mb-2">
        <Link href={`/reccs/edit/${recc.id}`} className="cursor-pointer px-2 py-1 border border-green-600 hover:bg-green-600 hover:text-black rounded-sm text-md">Edit</Link>
        <form action={deleteRecc.bind(null, recc.id)}>
          <SubmitButton pendingText="Deleting..." className="cursor-pointer px-2 py-1 border border-red-600 hover:bg-red-600 hover:text-black rounded-sm text-md">Delete</SubmitButton>
        </form>
      </div>
    </div>
  );
}
