"use client";

import PostCard from "@/components/general/PostCard";
import { useUserPostsQueryOptions } from "@/hooks/api/useUserPosts";
import { Suspense } from "react";
import SkeletonLoader from "./Skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";

const UserPostsClient = ({ userId }: { userId: string }) => {
  const { data: posts } = useSuspenseQuery(useUserPostsQueryOptions(userId));

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {posts.length === 0 && <p>There are no posts yet.</p>}
      </div>
    </Suspense>
  );
};

export default UserPostsClient;
