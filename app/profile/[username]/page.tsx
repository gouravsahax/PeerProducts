import { getUserProfileByUsername } from "@/lib/user-action";
import { getPaginatedReccsByUserId } from "@/lib/recc-action";
import Image from "next/image";
import { Award } from "lucide-react";
import ReccCard from "../../components/ReccCard";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import FollowButton from "../components/FollowButton";
import { Users } from "lucide-react";
import { notFound } from "next/navigation";

interface FollowUser {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
  bio?: string | null;
}

function UserListCard({ 
  user, 
  currentUserId, 
  isFollowing 
}: { 
  user: FollowUser; 
  currentUserId?: string; 
  isFollowing: boolean; 
}) {
  const getInitials = (fullName: string | null) => {
    if (!fullName) return "U";
    return fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="w-full flex items-center justify-between p-4 bg-zinc-950/40 border-1 border-zinc-700 rounded-sm hover:border-zinc-500 transition-colors">
      <Link href={`/profile/${user.username}`} className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 flex items-center justify-center text-white font-semibold shadow-inner border-1 border-zinc-700 select-none overflow-hidden shrink-0">
          {user.image ? (
            <Image src={user.image} alt={user.name ?? "Avatar"} width={48} height={48} className="w-full h-full object-cover" />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium">{user.name ?? "Anonymous"}</span>
          <span className="text-zinc-500 text-sm">@{user.username}</span>
        </div>
      </Link>
      {currentUserId && currentUserId !== user.id && (
        <div className="w-32">
          <FollowButton targetUserId={user.id} isFollowing={isFollowing} className="w-full" />
        </div>
      )}
    </div>
  );
}

export default async function Page({ 
  params,
  searchParams,
}: { 
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string; tab?: string }>;
}) {
  const { username } = await params;
  const { page, tab = "reccs" } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const user = await getUserProfileByUsername(username);
  
  if (!user) {
    notFound();
  }

  const session = await auth();
  const currentUserId = session?.user?.id;

  const isFollowing = currentUserId 
    ? await prisma.follows.findUnique({
        where: { followerId_followingId: { followerId: currentUserId, followingId: user.id } }
      }) !== null
    : false;

  const isOwnProfile = currentUserId === user.id;

  const { reccs, total, totalPages } = await getPaginatedReccsByUserId(user.id, currentPage, 8);

  type FollowerRecord = Awaited<ReturnType<typeof prisma.follows.findMany<{ include: { follower: true } }>>>;
  type FollowingRecord = Awaited<ReturnType<typeof prisma.follows.findMany<{ include: { following: true } }>>>;

  let followersData: FollowerRecord = [];
  let followingData: FollowingRecord = [];
  const currentUserFollows = new Set<string>();

  if (tab === "followers") {
    followersData = await prisma.follows.findMany({
      where: { followingId: user.id },
      include: { follower: true },
    });
  } else if (tab === "following") {
    followingData = await prisma.follows.findMany({
      where: { followerId: user.id },
      include: { following: true },
    });
  }

  if (currentUserId && (tab === "followers" || tab === "following")) {
    const follows = await prisma.follows.findMany({
      where: { followerId: currentUserId },
      select: { followingId: true }
    });
    follows.forEach(f => currentUserFollows.add(f.followingId));
  }

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

          <Link href={`/profile/${username}?tab=reccs`} className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl hover:border-zinc-500 transition-colors">
            <Award className="w-5 h-5 text-zinc-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Recommendations</span>
              <span className="text-sm text-white font-medium">{total}</span>
            </div>
          </Link>
          
          <Link href={`/profile/${username}?tab=followers`} className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl hover:border-zinc-500 transition-colors">
            <Users className="w-5 h-5 text-zinc-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Followers</span>
              <span className="text-sm text-white font-medium">{user._count?.followers || 0}</span>
            </div>
          </Link>

          <Link href={`/profile/${username}?tab=following`} className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border-1 border-zinc-700 rounded-xl hover:border-zinc-500 transition-colors">
            <Users className="w-5 h-5 text-zinc-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Following</span>
              <span className="text-sm text-white font-medium">{user._count?.following || 0}</span>
            </div>
          </Link>
        </div>

        {!isOwnProfile && currentUserId && (
          <FollowButton targetUserId={user.id} isFollowing={isFollowing} />
        )}

        {isOwnProfile && (
          <Link href="/settings" className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm text-sm font-medium transition cursor-pointer mt-4">
            Edit Profile
          </Link>
        )}
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="flex gap-4 border-b-1 border-zinc-800 pb-4 mb-4">
          <Link href={`/profile/${username}?tab=reccs`} className={`text-lg font-semibold transition-colors hover:text-white ${tab === 'reccs' ? 'text-white border-b-2 border-white pb-4 -mb-[18px]' : 'text-zinc-500'}`}>Recommendations</Link>
          <Link href={`/profile/${username}?tab=followers`} className={`text-lg font-semibold transition-colors hover:text-white ${tab === 'followers' ? 'text-white border-b-2 border-white pb-4 -mb-[18px]' : 'text-zinc-500'}`}>Followers</Link>
          <Link href={`/profile/${username}?tab=following`} className={`text-lg font-semibold transition-colors hover:text-white ${tab === 'following' ? 'text-white border-b-2 border-white pb-4 -mb-[18px]' : 'text-zinc-500'}`}>Following</Link>
        </div>

        {tab === "reccs" && (
          <>
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
                    href={`/profile/${username}?tab=reccs&page=${currentPage - 1}`}
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
                    href={`/profile/${username}?tab=reccs&page=${currentPage + 1}`}
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
          </>
        )}

        {tab === "followers" && (
          <div className="flex flex-col gap-4">
            {followersData.length === 0 ? (
              <p className="text-zinc-500 text-sm">No followers yet.</p>
            ) : (
              followersData.map((f) => (
                <UserListCard key={f.follower.id} user={f.follower} currentUserId={currentUserId} isFollowing={currentUserFollows.has(f.follower.id)} />
              ))
            )}
          </div>
        )}

        {tab === "following" && (
          <div className="flex flex-col gap-4">
            {followingData.length === 0 ? (
              <p className="text-zinc-500 text-sm">Not following anyone yet.</p>
            ) : (
              followingData.map((f) => (
                <UserListCard key={f.following.id} user={f.following} currentUserId={currentUserId} isFollowing={currentUserFollows.has(f.following.id)} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}