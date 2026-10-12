import { v2 as cloudinary } from 'cloudinary';
import { IStorageService } from './storage.interface';
import { ValidationError } from '../errors/app-error';

export class CloudinaryStorageService implements IStorageService {
  private isConfigured: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (this.isConfigured) return;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    this.isConfigured = true;
  }

  public async upload(file: File, folder: string = 'wellpeer_reccs'): Promise<string> {
    if (!file || file.size === 0) {
      throw new ValidationError('File cannot be empty');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    try {
      const response = await cloudinary.uploader.upload(base64Image, {
        folder,
      });
      return response.secure_url;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Cloudinary upload failed: ${message}`);
    }
  }
}

export const storageService = new CloudinaryStorageService();
