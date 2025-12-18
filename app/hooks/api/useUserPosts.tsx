import { getPostsByUserId } from "@/app/features/post/actions";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useUserPosts(userId: string) {
  return useSuspenseQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getPostsByUserId(userId),
  });
}
