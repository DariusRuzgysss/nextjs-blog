"use client";

import PostCard from "@/components/general/PostCard";
import { useUserPostsQueryOptions } from "@/hooks/api/useUserPosts";
import { Suspense } from "react";
import SkeletonLoader from "./Skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const UserPostsClient = ({ userId }: { userId: string }) => {
  const t = useTranslations();
  const { data: posts } = useSuspenseQuery(useUserPostsQueryOptions(userId));

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </AnimatePresence>
      <div className="flex items-center justify-center">
        {posts.length === 0 && <p>{t("General.noRecipesFound")}</p>}
      </div>
    </Suspense>
  );
};

export default UserPostsClient;
