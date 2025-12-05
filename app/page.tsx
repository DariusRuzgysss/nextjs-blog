import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import { getBlogPosts } from "./actions";
import SearchInput from "@/components/general/SearchInput";
import SortSelect from "@/components/general/SortSelect";
import { FilterTypes } from "./types";
import LoadingDashboard from "./dashboard/loading";
import PaginationComponent from "@/components/general/Pagination";

export const revalidate = 60;

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    sort?: "desc" | "asc";
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sort || "desc";
  const page = Number(searchParams?.page) || 1;
  const pageSize = 5;

  return (
    <div className="px-2 lg:px-0">
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[auto_1fr] items-center gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          {`${sortBy === "desc" ? "Newest" : "Oldest"} posts`}
        </h1>
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
  const { items, totalPages } = await getBlogPosts(filter);

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
