import { UserRepository, userRepository } from '@/lib/repositories/user.repository';
import { ValidationError, ConflictError, NotFoundError } from '@/lib/errors/app-error';

export class UserService {
  constructor(private readonly userRepo: UserRepository = userRepository) {}

  public async getProfileById(userId: string) {
    if (!userId) return null;
    return this.userRepo.findById(userId);
  }

  public async getBasicProfileById(userId: string) {
    if (!userId) return null;
    return this.userRepo.findBasicById(userId);
  }

  public async getProfileByUsername(username: string) {
    if (!username) return null;
    return this.userRepo.findByUsername(username);
  }

  public async updateName(userId: string, name: string): Promise<void> {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new ValidationError('Name cannot be empty');
    }

    await this.userRepo.updateName(userId, trimmed);
  }

  public async updateUsername(userId: string, rawUsername: string): Promise<void> {
    const username = rawUsername.trim();

    if (!username) {
      throw new ValidationError('Username cannot be empty');
    }

    if (username.length < 3 || username.length > 30) {
      throw new ValidationError('Username must be between 3 and 30 characters');
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      throw new ValidationError('Username can only contain letters, numbers, underscores, and dashes');
    }

    try {
      await this.userRepo.updateUsername(userId, username);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code: string }).code === 'P2002'
      ) {
        throw new ConflictError('Username is already taken');
      }
      throw error;
    }
  }

  public async toggleFollow(followerId: string, followingId: string): Promise<void> {
    if (followerId === followingId) {
      throw new ValidationError('Cannot follow yourself');
    }

    const targetUser = await this.userRepo.findBasicById(followingId);
    if (!targetUser) {
      throw new NotFoundError('Target user');
    }

    const existingFollow = await this.userRepo.findFollow(followerId, followingId);

    if (existingFollow) {
      await this.userRepo.deleteFollow(followerId, followingId);
    } else {
      await this.userRepo.createFollow(followerId, followingId);
    }
  }
}

export const userService = new UserService();
