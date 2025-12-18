import { getPosts } from "@/app/features/post/actions";
import { FilterTypes } from "@/app/features/post/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function usePosts(filter: FilterTypes) {
  return useSuspenseQuery({
    queryKey: ["posts", filter],
    queryFn: () => getPosts(filter),
  });
}
