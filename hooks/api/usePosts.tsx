import { getPosts } from "@/features/post/actions";
import { FilterTypes } from "@/features/post/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function usePosts(filter: FilterTypes) {
  return useSuspenseQuery({
    queryKey: ["posts", filter],
    queryFn: () => getPosts(filter),
  });
}
