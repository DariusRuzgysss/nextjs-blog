import SearchInput from "@/components/general/SearchInput";
import SortSelect from "@/components/general/SortSelect";
import { UrlParams } from "./types";
import BlogPostsClient from "@/components/general/BlogPostsClient";
import SortTitle from "@/components/general/SortTitle";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosts } from "../features/post/actions";
import { getQueryClient } from "../utils/getQueryClient";

export default async function Home(props: { searchParams?: UrlParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sort || "desc";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.limit) || 5;

  const filter = { searchQuery: query, sortBy, page, pageSize };
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", filter],
    queryFn: () => getPosts(filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr] items-center gap-4">
        <SortTitle sortBy={sortBy} />
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <SearchInput placeholder="Search" />
          <SortSelect />
        </div>
      </div>
      <BlogPostsClient filter={filter} />
    </HydrationBoundary>
  );
}
