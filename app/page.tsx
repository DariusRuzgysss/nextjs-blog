import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import { getBlogPosts } from "./actions";

export const revalidate = 60;

export default function Home() {
  return (
    <div className="px-2 lg:px-0">
      <h1 className="text-3xl font-bold tracking-tight">Latest posts</h1>
      <BlogPosts />
    </div>
  );
}

const BlogPosts = async () => {
  const data = await getBlogPosts();

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {data.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </Suspense>
  );
};
