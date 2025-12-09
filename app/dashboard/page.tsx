import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import BlogPostCard from "@/components/general/BlogPostCard";
import { getPostsByUserId } from "../features/post/actions";

export const revalidate = 60;

const Dashboard = async () => {
  const user = await requireUser();
  const posts = await getPostsByUserId(user.id);

  return (
    <div className="px-2 lg:px-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
