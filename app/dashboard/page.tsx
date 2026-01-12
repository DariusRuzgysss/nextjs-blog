import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import UserPostsClient from "@/components/general/UserPostsClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPostsByUserId } from "../../features/post/actions";
import { getQueryClient } from "../../utils/getQueryClient";
import { QUERY_KEYS } from "@/utils/constants";
import { Plus } from "lucide-react";
import clsx from "clsx";

const Dashboard = async () => {
  const user = await requireUser();
  const queryClient = getQueryClient();
  if (!user) {
    return null;
  }

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_POSTS, user.id],
    queryFn: () => getPostsByUserId(user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">My Recipes</h2>
        <Link
          className={clsx(
            buttonVariants(),
            "active:bg-active lg:active:bg-transparent"
          )}
          href="/dashboard/create"
        >
          <Plus />
          New
        </Link>
      </div>
      <UserPostsClient userId={user.id} />
    </HydrationBoundary>
  );
};

export default Dashboard;
