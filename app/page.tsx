import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import { getBlogPosts } from "./actions";
import SearchInput from "@/components/general/SearchInput";

export const revalidate = 60;

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="px-2 lg:px-0">
      <div className="flex flex-row items-center">
        <h1 className="basis-sm text-2xl lg:text-3xl font-bold tracking-tight">
          Latest posts
        </h1>
        <SearchInput placeholder="Search" />
      </div>
      <BlogPosts query={query} />
    </div>
  );
}

const BlogPosts = async ({ query }: { query: string }) => {
  const data = await getBlogPosts(query);

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {data.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {data.length === 0 && <p>No posts found.</p>}
      </div>
    </Suspense>
  );
};
