"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/features/post/actions";
import { FilterTypes } from "@/app/features/post/types";
import BlogPostCard from "@/components/general/BlogPostCard";
import LoadingDashboard from "@/app/dashboard/loading";
import PaginationComponent from "@/components/general/Pagination";

const BlogPosts = ({ filter }: { filter: FilterTypes }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", filter],
    queryFn: () => getPosts(filter),
  });

  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  const { items, totalPages } = data || { items: [], totalPages: 0 };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {items.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationComponent totalPages={totalPages} />
      <div className="flex items-center justify-center">
        {items.length === 0 && <p>No posts found.</p>}
      </div>
    </>
  );
};

export default BlogPosts;
