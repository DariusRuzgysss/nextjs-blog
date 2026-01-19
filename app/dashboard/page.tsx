import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import UserPostsClient from "@/components/general/UserPostsClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import clsx from "clsx";

import { getUserPosts } from "@/lib/api/posts";
import { QUERY_KEYS, ROUTES } from "@/lib/constants";
import { getQueryClient } from "@/lib/utils";
import TitleComponent from "@/components/general/TitleClient";

const Dashboard = async () => {
  const user = await requireUser();
  const queryClient = getQueryClient();
  if (!user) {
    return null;
  }

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_POSTS, user.id],
    queryFn: () => getUserPosts(user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <TitleComponent
          tag="h2"
          className="text-xl font-medium"
          title="MyRecipesPage.myRecipes"
        />
        <Link
          className={clsx(
            buttonVariants(),
            "active:bg-active lg:active:bg-transparent",
          )}
          href={ROUTES.CREATE_POST}
        >
          <Plus />
          <TitleComponent title="Actions.new" />
        </Link>
      </div>
      <UserPostsClient userId={user.id} />
    </HydrationBoundary>
  );
};

export default Dashboard;
