import { redirect } from 'next/navigation';
import { getProfile } from "@/lib/user-action";

export default async function ProfileRedirectPage() {
  const user = await getProfile();
  
  if (!user || !user.username) {
    redirect('/');
  }
  
  redirect(`/profile/${user.username}`);
}
