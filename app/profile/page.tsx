import { getProfile } from "@/lib/user-action";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import ProfileActions from "./components/ProfileActions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | PeerProducts",
  description: "View and edit your profile credentials and account settings on PeerProducts.",
};

const page = async () => {
  const data = await getProfile();

  if (!data) {
    return (
      <div className="w-screen min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-zinc-900/40 border-1 border-zinc-700 rounded-2xl p-8 text-center text-zinc-400">
          No profile data found. Please sign in again.
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-black backdrop-blur-lg border-1 border-zinc-700 rounded-sm p-8 shadow-2xl transition-all duration-300 hover:border-zinc-700/80">
        <ProfileHeader user={data} />
        <hr className="border-t-1 border-zinc-700 my-6" />
        <ProfileStats user={data} />
        <ProfileActions />
      </div>
    </div>
  );
};

export default page;
