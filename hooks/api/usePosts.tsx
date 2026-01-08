import { FilterTypes } from "@/app/types";
import { getPosts } from "@/features/post/actions";

import { QUERY_KEYS } from "@/utils/constants";
import { queryOptions } from "@tanstack/react-query";

export const usePostsQueryOptions = (filter: FilterTypes) =>
  queryOptions({
    queryKey: [QUERY_KEYS.POSTS, filter],
    queryFn: () => getPosts(filter),
    staleTime: 1000 * 60,
  });
