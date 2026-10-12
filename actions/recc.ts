"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cacheLife } from "next/cache";
import { reccService } from "@/lib/services/recc.service";
import { UnauthorizedError } from "@/lib/errors/app-error";

async function getCachedLatestFeed(page: number, limit: number, search: string, userId?: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 86400,
  });
  return reccService.getFeed('latest', page, limit, search, userId);
}

async function getCachedFollowingFeed(page: number, limit: number, search: string, userId?: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 86400,
  });
  return reccService.getFeed('following', page, limit, search, userId);
}

async function getCachedMyReccs(userId: string) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 86400,
  });
  return reccService.getUserReccs(userId);
}

async function getCachedPaginatedUserReccs(
  userId: string,
  page: number,
  limit: number,
  currentUserId?: string
) {
  "use cache";
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 86400,
  });
  return reccService.getPaginatedUserReccs(userId, page, limit, currentUserId);
}

export async function getAllRecs(page = 1, limit = 8, search = "") {
  const session = await auth();
  return reccService.getFeed('hot', page, limit, search, session?.user?.id);
}

export async function getLatestRecs(page = 1, limit = 8, search = "") {
  const session = await auth();
  return getCachedLatestFeed(page, limit, search, session?.user?.id);
}

export async function getFollowingRecs(page = 1, limit = 8, search = "") {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { reccs: [], total: 0, totalPages: 0, currentPage: page };
  }
  return getCachedFollowingFeed(page, limit, search, userId);
}

export async function getMyReccs() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return getCachedMyReccs(session.user.id);
}

export async function getReccsByUserId(id: string) {
  return getCachedMyReccs(id);
}

export async function getPaginatedReccsByUserId(id: string, page = 1, limit = 8) {
  const session = await auth();
  return getCachedPaginatedUserReccs(id, page, limit, session?.user?.id);
}

export async function createRecc(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  const title = String(formData.get("title") ?? "");
  const desc = String(formData.get("desc") ?? "");
  const url = String(formData.get("url") ?? "");
  const type = String(formData.get("type") ?? "");
  const imageFile = formData.get("image") as File | null;

  await reccService.create(session.user.id, {
    title,
    desc,
    url,
    type,
    imageFile,
  });

  redirect("/reccs");
}

export async function getARecc(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return reccService.getByIdForEdit(id, session.user.id);
}

export async function updateRecc(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  const title = String(formData.get("title") ?? "");
  const desc = String(formData.get("desc") ?? "");

  await reccService.update(id, session.user.id, {
    title,
    desc,
  });

  redirect("/reccs");
}

export async function deleteRecc(reccId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  await reccService.delete(reccId, session.user.id);
}

export async function toggleLike(reccId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  return reccService.toggleLike(reccId, session.user.id);
}