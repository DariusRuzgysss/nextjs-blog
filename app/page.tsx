import SearchInput from "@/components/general/SearchInput";
import SortSelect from "@/components/general/SortSelect";
import { UrlParams } from "./types";
import PostsClient from "@/components/general/PostsClient";
import SortTitle from "@/components/general/SortTitle";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosts } from "../features/post/actions";
import { getQueryClient } from "../utils/getQueryClient";
import { QUERY_KEYS } from "@/utils/constants";
import UnleashCulinary from "@/components/general/UnleashCulinary";
import Categories from "@/components/general/Categories";

export default async function Home(props: { searchParams?: UrlParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sort || "desc";
  const category = searchParams?.category || "all";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.limit) || 6;

  const filter = { searchQuery: query, sortBy, page, pageSize, category };
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.POSTS, filter],
    queryFn: () => getPosts(filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnleashCulinary />
      <Categories />
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr] items-center gap-4 mt-4">
        <SortTitle sortBy={sortBy} />
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <SearchInput />
          <SortSelect />
        </div>
      </div>
      <PostsClient filter={filter} />
    </HydrationBoundary>
  );
}
