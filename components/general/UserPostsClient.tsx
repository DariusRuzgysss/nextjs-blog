"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "@/app/features/post/actions";
import BlogPostCard from "@/components/general/BlogPostCard";
import LoadingDashboard from "@/app/dashboard/loading";

const UserPostsClient = ({ userId }: { userId: string }) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getPostsByUserId(userId),
  });

  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }
  console.log(posts);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {posts?.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPostsClient;
