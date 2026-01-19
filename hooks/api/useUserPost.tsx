import { getPostById } from "@/lib/api/posts";
import { QUERY_KEYS } from "@/lib/constants";

import { queryOptions } from "@tanstack/react-query";

export const useUserPostQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.USER_POST, id],
    queryFn: () => getPostById(id),
    staleTime: 1000 * 60 * 5,
  });
