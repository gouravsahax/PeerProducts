export interface UserData {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  bio?: string | null;
  reccCount?: number;
}

export interface FollowUser {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
  bio?: string | null;
}
