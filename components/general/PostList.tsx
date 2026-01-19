"use client";

import PostCard from "@/components/general/PostCard";
import PaginationComponent from "@/components/general/Pagination";
import { Suspense } from "react";
import { usePostsQueryOptions } from "@/hooks/api/usePosts";
import SkeletonLoader from "./Skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FilterTypes } from "@/types";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const PostList = ({ filter }: { filter: FilterTypes }) => {
  const t = useTranslations();
  const { data } = useSuspenseQuery(usePostsQueryOptions(filter));
  const { items, totalPages } = data;

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        <AnimatePresence mode="popLayout">
          {items.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </AnimatePresence>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {items.length === 0 && <p>{t("General.noRecipesFound")}</p>}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </Suspense>
  );
};

export default PostList;
