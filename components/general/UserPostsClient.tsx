"use client";

import BlogPostCard from "@/components/general/BlogPostCard";
import LoadingDashboard from "@/app/dashboard/loading";
import { useUserPosts } from "@/app/hooks/api/useUserPosts";
import { Suspense } from "react";

const UserPostsClient = ({ userId }: { userId: string }) => {
  const { data: posts } = useUserPosts(userId);

  return (
    <Suspense fallback={<LoadingDashboard />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {posts?.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </Suspense>
  );
};

export default UserPostsClient;
