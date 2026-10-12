export interface ReccItem {
  id: string;
  title: string;
  description?: string | null;
  url?: string | null;
  imageUrl?: string | null;
  type: string;
  likeCount: number;
  createdAt: Date | string;
  userId: string;
  user?: {
    name?: string | null;
  } | null;
  likes?: Array<{ userId: string }>;
}

export interface RawReccRow {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  imageUrl: string | null;
  type: string;
  likeCount: number;
  createdAt: Date;
  userId: string;
  userName: string | null;
  likedByCurrentUser: string | null;
}
