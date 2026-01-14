"use client";

import PostCard from "@/components/general/PostCard";
import PaginationComponent from "@/components/general/Pagination";
import { Suspense } from "react";
import { usePostsQueryOptions } from "@/hooks/api/usePosts";
import SkeletonLoader from "./Skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FilterTypes } from "@/app/types";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const PostsClient = ({ filter }: { filter: FilterTypes }) => {
  const t = useTranslations();
  const { data } = useSuspenseQuery(usePostsQueryOptions(filter));

  const { items, totalPages } = data;

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div
        id="list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4"
      >
        <AnimatePresence mode="popLayout"></AnimatePresence>
        {items.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
      <div className="flex flex-1 items-center justify-center">
        {items.length === 0 && <p>{t("General.noRecipesFound")}</p>}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </Suspense>
  );
};

export default PostsClient;
