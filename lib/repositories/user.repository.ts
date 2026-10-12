import { prisma } from '@/lib/prisma';
import type { PrismaClient } from '@/app/generated/prisma/client';

export class UserRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  public async findById(id: string) {
    if (!id) return null;
    return this.db.user.findFirst({
      where: { id },
      include: {
        _count: {
          select: { followers: true, following: true },
        },
      },
    });
  }

  public async findBasicById(id: string) {
    if (!id) return null;
    return this.db.user.findFirst({
      where: { id },
    });
  }

  public async findByUsername(username: string) {
    if (!username) return null;
    return this.db.user.findFirst({
      where: { username },
      include: {
        _count: {
          select: { followers: true, following: true },
        },
      },
    });
  }

  public async updateName(id: string, name: string) {
    return this.db.user.update({
      where: { id },
      data: { name },
    });
  }

  public async updateUsername(id: string, username: string) {
    return this.db.user.update({
      where: { id },
      data: { username },
    });
  }

  public async findFollow(followerId: string, followingId: string) {
    return this.db.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  public async createFollow(followerId: string, followingId: string) {
    return this.db.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  public async deleteFollow(followerId: string, followingId: string) {
    return this.db.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  public async getFollowers(userId: string) {
    return this.db.follows.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });
  }

  public async getFollowing(userId: string) {
    return this.db.follows.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
  }
}

export const userRepository = new UserRepository();
