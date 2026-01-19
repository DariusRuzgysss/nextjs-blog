import { getPosts } from "@/lib/api/posts";
import { QUERY_KEYS } from "@/lib/constants";
import { FilterTypes } from "@/types";

import { queryOptions } from "@tanstack/react-query";

export const usePostsQueryOptions = (filter: FilterTypes) =>
  queryOptions({
    queryKey: [QUERY_KEYS.POSTS, filter],
    queryFn: () => getPosts(filter),
    staleTime: 1000 * 60 * 5,
  });
