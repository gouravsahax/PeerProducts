"use server";

import { auth } from "@/auth";
import { cacheTag, updateTag } from "next/cache";
import { userService } from "@/lib/services/user.service";
import { UnauthorizedError } from "@/lib/errors/app-error";

async function getCachedProfile(userId: string) {
  "use cache";
  cacheTag("profile");
  return userService.getBasicProfileById(userId);
}

export async function getUserProfileByUsername(username: string) {
  return userService.getProfileByUsername(username);
}

export async function getUserProfileById(userId: string) {
  return userService.getProfileById(userId);
}

export async function getProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return getCachedProfile(session.user.id);
}

export async function updateProfileName(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  const name = String(formData.get("name") ?? "");
  await userService.updateName(session.user.id, name);

  updateTag("profile");
  updateTag("reccs");
}

export async function updateProfileUsername(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  const username = String(formData.get("username") ?? "");
  await userService.updateUsername(session.user.id, username);

  updateTag("profile");
  updateTag("reccs");
}

export async function toggleFollow(targetUserId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  await userService.toggleFollow(session.user.id, targetUserId);
  updateTag("profile");
}
