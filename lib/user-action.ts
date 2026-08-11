"use server";

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { cacheTag, updateTag } from 'next/cache';

async function getCachedProfile(userId: string) {
  "use cache";
  cacheTag("profile");
  return await prisma.user.findFirst({
    where: {
      id: userId
    }
  });
}

export async function getUserProfileByUsername(username: string) {
  
  if(!username) {
    return null;
  }

  try{
    return await prisma.user.findFirst({
      where: {
        username: username
      }
    });
  } catch {
    throw new Error("Error in fetching user data");
  }
}

export async function getUserProfileById(userId: string) {
  
  if(!userId) {
    return null;
  }

  try{
    return await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
  } catch {
    throw new Error("Error in fetching user data");
  }
}

export async function getProfile() {
  const session = await auth();

    if(!session?.user?.id) {
        return null;
    }

    try{
        return await getCachedProfile(session.user.id);
    } catch {
        throw new Error("Error in fetching user data");
    }
}

export async function updateProfileName(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const name = String(formData.get("name") ?? "").trim();
    if (!name) {
        throw new Error("Name cannot be empty");
    }

    try {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name,
            },
        });
        updateTag("profile");
        updateTag("reccs");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update profile name");
    }
}

export async function updateProfileUsername(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const username = String(formData.get("username") ?? "").trim();
    if (!username) {
        throw new Error("Username cannot be empty");
    }
    
    if (username.length < 3 || username.length > 30) {
        throw new Error("Username must be between 3 and 30 characters");
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        throw new Error("Username can only contain letters, numbers, underscores, and dashes");
    }

    try {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                username,
            },
        });
        updateTag("profile");
        updateTag("reccs");
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error("Username is already taken");
        }
        console.error(error);
        throw new Error("Failed to update profile username");
    }
}
