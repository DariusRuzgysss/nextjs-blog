import { getUserPosts } from "@/lib/api/posts";
import { QUERY_KEYS } from "@/lib/constants";
import { queryOptions } from "@tanstack/react-query";

export const useUserPostsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.USER_POSTS, userId],
    queryFn: () => getUserPosts(userId),
    staleTime: 1000 * 60 * 5,
  });
