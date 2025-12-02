import BlogPostCard from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import { getBlogPosts } from "./actions";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest posts</h1>
      <BlogPosts />
    </div>
  );
}

const BlogPosts = async () => {
  const data = await getBlogPosts();
  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </Suspense>
  );
};
