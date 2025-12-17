import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";

import SearchInput from "@/components/general/SearchInput";
import SortSelect from "@/components/general/SortSelect";
import { UrlParams } from "./types";
import LoadingDashboard from "./dashboard/loading";
import PaginationComponent from "@/components/general/Pagination";
import { getPosts } from "./features/post/actions";
import { FilterTypes } from "./features/post/types";
import SortTitle from "@/components/general/SortTitle";

export const revalidate = 60;

export default async function Home(props: { searchParams?: UrlParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sort || "desc";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.limit) || 5;

  return (
    <div>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr] items-center gap-4">
        <SortTitle sortBy={sortBy} />
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <SearchInput placeholder="Search" />
          <SortSelect />
        </div>
      </div>
      <BlogPosts
        searchQuery={query}
        sortBy={sortBy}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}

const BlogPosts = async (filter: FilterTypes) => {
  const { items, totalPages } = await getPosts(filter);

  return (
    <Suspense fallback={<LoadingDashboard />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {items.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationComponent totalPages={totalPages} />
      <div className="flex items-center justify-center">
        {items.length === 0 && <p>No posts found.</p>}
      </div>
    </Suspense>
  );
};
