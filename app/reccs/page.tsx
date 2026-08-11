import { getMyReccs } from "@/lib/recc-action"
import MyReccCard from "../components/MyReccCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Recommendations | PeerProducts",
  description: "Manage and view your product recommendations on PeerProducts.",
};

const page = async () => {
  const {reccs, count} = await getMyReccs();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="px-4 md:px-8 py-4 flex flex-col gap-4 lg:w-[60vw]">
        <div>
          Number of reccomendations : {count}
        </div>
        {reccs.map((recc) => (
          <MyReccCard key={recc.id} recc={recc} />
        ))}
      </div>
    </div>
  )
}

export default page
