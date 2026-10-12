export interface IStorageService {
  upload(file: File, folder?: string): Promise<string>;
}
