import { getPostsByUserId } from "@/features/post/actions";
import { QUERY_KEYS } from "@/utils/constants";
import { queryOptions } from "@tanstack/react-query";

export const useUserPostsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.USER_POSTS, userId],
    queryFn: () => getPostsByUserId(userId),
    staleTime: 1000 * 60 * 5,
  });
