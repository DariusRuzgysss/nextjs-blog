import SearchInput from "@/components/general/SearchInput";
import PostList from "@/components/general/PostList";
import SortTitle from "@/components/general/SortTitle";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UnleashCulinary from "@/components/general/UnleashCulinary";
import Categories from "@/components/general/Categories";
import { FilterDrawer } from "@/components/general/FilterDrawer";
import { UrlParams } from "@/types";
import { getPosts } from "@/lib/api/posts";
import { QUERY_KEYS } from "@/lib/constants";
import { getQueryClient } from "@/lib/utils";
import { buildFilter } from "@/lib/helper";

export default async function Home(props: { searchParams?: UrlParams }) {
  const filter = await buildFilter(props.searchParams);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.POSTS, filter],
    queryFn: () => getPosts(filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnleashCulinary />
      <Categories />
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr] items-center w-full sm:max-w-[75%] mx-auto gap-4 mt-4">
        <SortTitle sortBy={filter.sortBy} />
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <SearchInput />
          <FilterDrawer />
        </div>
      </div>
      <PostList filter={filter} />
    </HydrationBoundary>
  );
}
