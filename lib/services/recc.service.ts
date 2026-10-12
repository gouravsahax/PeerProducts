import { ReccRepository, reccRepository } from '@/lib/repositories/recc.repository';
import { IStorageService } from '@/lib/storage/storage.interface';
import { storageService } from '@/lib/storage/cloudinary.service';
import { ValidationError, NotFoundError, ForbiddenError } from '@/lib/errors/app-error';

export interface CreateReccDTO {
  title: string;
  desc: string;
  url: string;
  type: string;
  imageFile?: File | null;
}

export interface UpdateReccDTO {
  title: string;
  desc: string;
}

export class ReccService {
  constructor(
    private readonly reccRepo: ReccRepository = reccRepository,
    private readonly storage: IStorageService = storageService
  ) {}

  public async getFeed(
    type: 'hot' | 'latest' | 'following',
    page: number = 1,
    limit: number = 8,
    search: string = '',
    userId?: string
  ) {
    const { reccs, total } = await this.reccRepo.getPaginatedFeed(type, page, limit, search, userId);

    const mapped = reccs.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      url: row.url,
      imageUrl: row.imageUrl,
      type: row.type,
      likeCount: row.likeCount,
      createdAt: row.createdAt,
      userId: row.userId,
      user: {
        name: row.userName,
      },
      likes: row.likedByCurrentUser ? [{ userId: row.likedByCurrentUser }] : [],
    }));

    return {
      reccs: mapped,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  public async getUserReccs(userId: string) {
    if (!userId) {
      throw new ValidationError('User ID is required');
    }
    return this.reccRepo.findByUserId(userId);
  }

  public async getPaginatedUserReccs(
    userId: string,
    page: number = 1,
    limit: number = 8,
    currentUserId?: string
  ) {
    if (!userId) {
      throw new ValidationError('User ID is required');
    }
    return this.reccRepo.findPaginatedByUserId(userId, page, limit, currentUserId);
  }

  public async getByIdForEdit(id: string, userId: string) {
    const recc = await this.reccRepo.findById(id);

    if (!recc) {
      throw new NotFoundError('Recommendation');
    }

    if (recc.userId !== userId) {
      throw new ForbiddenError('You can only edit your own recommendations');
    }

    return {
      id: recc.id,
      title: recc.title,
      desc: recc.description ?? '',
    };
  }

  public async create(userId: string, dto: CreateReccDTO) {
    const title = dto.title.trim();
    const url = dto.url.trim();
    const type = dto.type.trim();
    const desc = dto.desc.trim();

    if (!title || !url || !type) {
      throw new ValidationError('Title, URL, and category type are required');
    }

    let imageUrl: string | null = null;
    if (dto.imageFile && dto.imageFile.size > 0) {
      imageUrl = await this.storage.upload(dto.imageFile);
    }

    return this.reccRepo.createWithUserCount({
      title,
      description: desc,
      url,
      imageUrl,
      type,
      userId,
    });
  }

  public async update(id: string, userId: string, dto: UpdateReccDTO) {
    const title = dto.title.trim();
    const desc = dto.desc.trim();

    if (!title) {
      throw new ValidationError('Title cannot be empty');
    }

    const recc = await this.reccRepo.findById(id);
    if (!recc) {
      throw new NotFoundError('Recommendation');
    }

    if (recc.userId !== userId) {
      throw new ForbiddenError('You cannot edit recommendations created by other users');
    }

    return this.reccRepo.update(id, {
      title,
      description: desc || null,
    });
  }

  public async delete(id: string, userId: string) {
    const recc = await this.reccRepo.findById(id);
    if (!recc) {
      throw new NotFoundError('Recommendation');
    }

    if (recc.userId !== userId) {
      throw new ForbiddenError('You cannot delete recommendations created by other users');
    }

    return this.reccRepo.deleteWithUserCount(id, userId);
  }

  public async toggleLike(reccId: string, userId: string) {
    return this.reccRepo.toggleLike(reccId, userId);
  }
}

export const reccService = new ReccService();
