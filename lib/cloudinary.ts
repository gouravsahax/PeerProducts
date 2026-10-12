import { storageService } from './storage/cloudinary.service';

export async function uploadImage(file: File): Promise<string> {
  return storageService.upload(file);
}
