import Link from "next/link";
import { getAllRecs, getLatestRecs, getFollowingRecs } from "@/lib/recc-action";
import ReccCard from "./components/ReccCard";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Feed | PeerProducts",
  description: "Browse genuine product recommendations from the PeerProducts community.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; feed?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const validFeeds = ["latest", "following", "hot"];
  const feedType = validFeeds.includes(params.feed || "") ? params.feed : "hot";

  if (!params.page) {
    redirect(`/?page=1${search ? `&search=${encodeURIComponent(search)}` : ""}${feedType !== "hot" ? `&feed=${feedType}` : ""}`);
  }

  const currentPage = parseInt(params.page || "1", 10);
  
  let reccs, totalPages;
  if (feedType === "latest") {
    ({ reccs, totalPages } = await getLatestRecs(currentPage, 8, search));
  } else if (feedType === "following") {
    ({ reccs, totalPages } = await getFollowingRecs(currentPage, 8, search));
  } else {
    ({ reccs, totalPages } = await getAllRecs(currentPage, 8, search));
  }

  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const feedParam = feedType !== "hot" ? `&feed=${feedType}` : "";

  const col1 = reccs.filter((_, idx) => idx % 2 === 0);
  const col2 = reccs.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full min-h-screen lg:w-[85vw] xl:w-[80vw] flex flex-col border-x-1 border-zinc-700">

        <div className="w-full p-4 border-b border-zinc-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div role="tablist" aria-label="Feed type" className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Link
              href={`/?page=1${searchParam}`}
              aria-label="Hot recommendations feed"
              className={`flex-1 md:flex-none text-center px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap ${
                feedType === "hot"
                  ? "bg-zinc-800 text-white border border-zinc-600"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
              }`}
            >
              Hot
            </Link>
            <Link
              href={`/?page=1${searchParam}&feed=latest`}
              aria-label="Latest recommendations feed"
              className={`flex-1 md:flex-none text-center px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap ${
                feedType === "latest"
                  ? "bg-zinc-800 text-white border border-zinc-600"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
              }`}
            >
              Latest
            </Link>
            <Link
              href={`/?page=1${searchParam}&feed=following`}
              aria-label="Following recommendations feed"
              className={`flex-1 md:flex-none text-center px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap ${
                feedType === "following"
                  ? "bg-zinc-800 text-white border border-zinc-600"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
              }`}
            >
              Following
            </Link>
          </div>
          
          <form action="/" method="GET" className="flex gap-2 w-full max-w-md shrink-0">
            <input type="hidden" name="page" value="1" />
            {feedType !== "hot" && <input type="hidden" name="feed" value={feedType} />}
            <input
              type="text"
              name="search"
              aria-label="Search recommendations by type"
              placeholder="Search by type..."
              defaultValue={search}
              className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-sm text-sm focus:outline-none focus:border-zinc-500 text-white placeholder-zinc-600"
            />
            {search && (
              <Link
                href={`/?page=1${feedParam}`}
                aria-label="Clear search filter"
                className="px-3 py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-500 hover:text-zinc-300 rounded-sm text-sm flex items-center justify-center transition-colors"
              >
                Clear
              </Link>
            )}
            <button
              type="submit"
              aria-label="Search recommendations"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-sm text-sm font-medium transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {reccs.length === 0 ? (
          <div className="w-full p-8 text-center text-zinc-400">
            No recommendations found.
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col gap-4 p-4 md:hidden">
              {reccs.map((recc) => (
                <ReccCard key={recc.id} recc={recc} />
              ))}
            </div>

            <div className="w-full hidden md:grid grid-cols-2 gap-4 p-4 items-start">
              <div className="flex flex-col gap-4">
                {col1.map((recc) => (
                  <ReccCard key={recc.id} recc={recc} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {col2.map((recc) => (
                  <ReccCard key={recc.id} recc={recc} />
                ))}
              </div>
            </div>
          </>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="flex justify-center items-center gap-4 py-6 border-t border-zinc-700 mt-auto bg-zinc-950/20">
            {currentPage > 1 ? (
              <Link
                href={`/?page=${currentPage - 1}${searchParam}${feedParam}`}
                aria-label="Go to previous page"
                className="px-4 py-2 border border-zinc-800 hover:border-zinc-500 rounded-sm text-sm font-medium transition-colors"
              >
                Previous
              </Link>
            ) : (
              <span aria-disabled="true" className="px-4 py-2 border border-zinc-900 text-zinc-600 rounded-sm text-sm font-medium cursor-not-allowed">
                Previous
              </span>
            )}

            <span className="text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/?page=${currentPage + 1}${searchParam}${feedParam}`}
                aria-label="Go to next page"
                className="px-4 py-2 border border-zinc-800 hover:border-zinc-500 rounded-sm text-sm font-medium transition-colors"
              >
                Next
              </Link>
            ) : (
              <span aria-disabled="true" className="px-4 py-2 border border-zinc-900 text-zinc-600 rounded-sm text-sm font-medium cursor-not-allowed">
                Next
              </span>
            )}
          </nav>
        )}

      </div>
    </div>
  );
}