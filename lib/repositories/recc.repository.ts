import { prisma } from '@/lib/prisma';
import type { PrismaClient } from '@/app/generated/prisma/client';
import type { RawReccRow } from '@/types';

export interface CreateReccInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
  type: string;
  userId: string;
}

export class ReccRepository {
  constructor(private readonly db: PrismaClient = prisma) {}

  public async findById(id: string) {
    return this.db.recc.findUnique({
      where: { id },
    });
  }

  public async getPaginatedFeed(
    feedType: 'hot' | 'latest' | 'following',
    page: number,
    limit: number,
    search: string,
    userId?: string
  ): Promise<{ reccs: RawReccRow[]; total: number }> {
    const skip = (page - 1) * limit;

    let countWhere: Record<string, unknown> = {};
    if (feedType === 'following' && userId) {
      countWhere = search
        ? {
            type: { contains: search, mode: 'insensitive' as const },
            user: { followers: { some: { followerId: userId } } },
          }
        : {
            user: { followers: { some: { followerId: userId } } },
          };
    } else if (search) {
      countWhere = {
        type: { contains: search, mode: 'insensitive' as const },
      };
    }

    const total = await this.db.recc.count({ where: countWhere });

    let rawRows: RawReccRow[];

    if (feedType === 'hot') {
      rawRows = await this.db.$queryRaw<RawReccRow[]>`
        SELECT 
          r.id,
          r.title,
          r.description,
          r.url,
          r."imageUrl",
          r.type,
          r."likeCount",
          r."createdAt",
          r."userId",
          u.name AS "userName",
          l."userId" AS "likedByCurrentUser"
        FROM "Recc" r
        LEFT JOIN "User" u ON r."userId" = u.id
        LEFT JOIN "Like" l ON r.id = l."reccId" AND l."userId" = ${userId || ''}
        WHERE r.type ILIKE ${'%' + search + '%'}
        ORDER BY GREATEST(-100.0, CAST(r."likeCount" AS DOUBLE PRECISION) - (EXTRACT(EPOCH FROM (timezone('utc', now()) - r."createdAt")) / 86400.0) * 0.5) DESC
        LIMIT ${limit} OFFSET ${skip}
      `;
    } else if (feedType === 'following' && userId) {
      rawRows = await this.db.$queryRaw<RawReccRow[]>`
        SELECT 
          r.id,
          r.title,
          r.description,
          r.url,
          r."imageUrl",
          r.type,
          r."likeCount",
          r."createdAt",
          r."userId",
          u.name AS "userName",
          l."userId" AS "likedByCurrentUser"
        FROM "Recc" r
        LEFT JOIN "User" u ON r."userId" = u.id
        LEFT JOIN "Like" l ON r.id = l."reccId" AND l."userId" = ${userId}
        INNER JOIN "Follows" f ON r."userId" = f."followingId" AND f."followerId" = ${userId}
        WHERE r.type ILIKE ${'%' + search + '%'}
        ORDER BY r."createdAt" DESC
        LIMIT ${limit} OFFSET ${skip}
      `;
    } else {
      rawRows = await this.db.$queryRaw<RawReccRow[]>`
        SELECT 
          r.id,
          r.title,
          r.description,
          r.url,
          r."imageUrl",
          r.type,
          r."likeCount",
          r."createdAt",
          r."userId",
          u.name AS "userName",
          l."userId" AS "likedByCurrentUser"
        FROM "Recc" r
        LEFT JOIN "User" u ON r."userId" = u.id
        LEFT JOIN "Like" l ON r.id = l."reccId" AND l."userId" = ${userId || ''}
        WHERE r.type ILIKE ${'%' + search + '%'}
        ORDER BY r."createdAt" DESC
        LIMIT ${limit} OFFSET ${skip}
      `;
    }

    return { reccs: rawRows, total };
  }

  public async findByUserId(userId: string) {
    const [reccs, user] = await Promise.all([
      this.db.recc.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.user.findUnique({
        where: { id: userId },
        select: { reccCount: true },
      }),
    ]);

    return {
      reccs,
      count: user?.reccCount ?? 0,
    };
  }

  public async findPaginatedByUserId(
    userId: string,
    page: number,
    limit: number,
    currentUserId?: string
  ) {
    const skip = (page - 1) * limit;

    const [reccs, user] = await Promise.all([
      this.db.recc.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          likes: currentUserId ? { where: { userId: currentUserId } } : false,
        },
      }),
      this.db.user.findUnique({
        where: { id: userId },
        select: { reccCount: true },
      }),
    ]);

    const total = user?.reccCount ?? 0;

    return {
      reccs,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async createWithUserCount(data: CreateReccInput) {
    return this.db.$transaction(
      async (tx) => {
        const recc = await tx.recc.create({
          data: {
            title: data.title,
            description: data.description || null,
            url: data.url,
            imageUrl: data.imageUrl,
            type: data.type,
            userId: data.userId,
          },
        });
        await tx.user.update({
          where: { id: data.userId },
          data: { reccCount: { increment: 1 } },
        });
        return recc;
      },
      {
        maxWait: 15000,
        timeout: 20000,
      }
    );
  }

  public async update(id: string, data: { title: string; description: string | null }) {
    return this.db.recc.update({
      where: { id },
      data,
    });
  }

  public async deleteWithUserCount(reccId: string, userId: string) {
    return this.db.$transaction(
      async (tx) => {
        await tx.recc.delete({
          where: { id: reccId },
        });
        await tx.user.update({
          where: { id: userId },
          data: { reccCount: { decrement: 1 } },
        });
      },
      {
        maxWait: 15000,
        timeout: 20000,
      }
    );
  }

  public async toggleLike(reccId: string, userId: string): Promise<{ liked: boolean }> {
    const existingLike = await this.db.like.findUnique({
      where: {
        userId_reccId: {
          userId,
          reccId,
        },
      },
    });

    if (existingLike) {
      await this.db.like.delete({
        where: {
          userId_reccId: {
            userId,
            reccId,
          },
        },
      });
      await this.db.recc.update({
        where: { id: reccId },
        data: { likeCount: { decrement: 1 } },
      });
      return { liked: false };
    } else {
      await this.db.like.create({
        data: {
          userId,
          reccId,
        },
      });
      await this.db.recc.update({
        where: { id: reccId },
        data: { likeCount: { increment: 1 } },
      });
      return { liked: true };
    }
  }
}

export const reccRepository = new ReccRepository();
