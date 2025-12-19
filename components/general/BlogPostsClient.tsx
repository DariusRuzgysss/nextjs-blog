"use client";

import { FilterTypes } from "@/features/post/types";
import BlogPostCard from "@/components/general/BlogPostCard";
import PaginationComponent from "@/components/general/Pagination";
import { Suspense } from "react";
import { usePosts } from "@/hooks/api/usePosts";
import SkeletonLoader from "./Skeleton";

const BlogPosts = ({ filter }: { filter: FilterTypes }) => {
  const { data } = usePosts(filter);
  const { items, totalPages } = data || { items: [], totalPages: 0 };

  return (
    <Suspense fallback={<SkeletonLoader />}>
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

export default BlogPosts;
