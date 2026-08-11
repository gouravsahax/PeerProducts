import { getUserProfileByUsername } from "@/lib/user-action";
import { getPaginatedReccsByUserId } from "@/lib/recc-action";
import Image from "next/image";
import { Mail, Award } from "lucide-react";
import ReccCard from "../../components/ReccCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ 
  params,
  searchParams,
}: { 
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { username } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const user = await getUserProfileByUsername(username);
  
  if (!user) {
    notFound();
  }

  const { reccs, total, totalPages } = await getPaginatedReccsByUserId(user.id, currentPage, 8);

  const getInitials = (fullName: string | null) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex flex-col items-center px-4 py-8 gap-8">
      <div className="w-full max-w-md bg-black backdrop-blur-lg border-1 border-zinc-700 rounded-sm p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 flex items-center justify-center text-white text-3xl font-semibold shadow-inner border-1 border-zinc-700 select-none overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "User Avatar"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{user.name ?? "Anonymous"}</h2>
          <p className="text-zinc-500 text-sm mt-1">@{user.username}</p>
        </div>

        <hr className="border-t-1 border-zinc-700 my-6" />

        <div className="space-y-4 text-zinc-300">

          <div className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl">
            <Award className="w-5 h-5 text-zinc-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Recommendations</span>
              <span className="text-sm text-white font-medium">{total}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {user.name ? `${user.name}'s` : 'User'} Recommendations
        </h3>
        {reccs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No recommendations yet.</p>
        ) : (
          reccs.map((recc) => (
            <ReccCard key={recc.id} recc={recc} />
          ))
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-6 border-t-1 border-zinc-700 mt-auto bg-zinc-950/20">
            {currentPage > 1 ? (
              <Link
                href={`/profile/${username}?page=${currentPage - 1}`}
                className="px-4 py-2 border-1 border-zinc-700 hover:border-zinc-500 rounded-sm text-sm font-medium transition-colors text-white"
              >
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 border-1 border-zinc-800 text-zinc-600 rounded-sm text-sm font-medium cursor-not-allowed">
                Previous
              </span>
            )}

            <span className="text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/profile/${username}?page=${currentPage + 1}`}
                className="px-4 py-2 border-1 border-zinc-700 hover:border-zinc-500 rounded-sm text-sm font-medium transition-colors text-white"
              >
                Next
              </Link>
            ) : (
              <span className="px-4 py-2 border-1 border-zinc-800 text-zinc-600 rounded-sm text-sm font-medium cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}