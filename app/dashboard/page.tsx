import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import UserPostsClient from "@/components/general/UserPostsClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPostsByUserId } from "../features/post/actions";
import { getQueryClient } from "../utils/getQueryClient";

const Dashboard = async () => {
  const user = await requireUser();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["userPosts", user.id],
    queryFn: () => getPostsByUserId(user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Your Blog Articles</h2>
          <Link className={buttonVariants()} href="/dashboard/create">
            Create Post
          </Link>
        </div>
        <UserPostsClient userId={user.id} />
      </div>
    </HydrationBoundary>
  );
};

export default Dashboard;
