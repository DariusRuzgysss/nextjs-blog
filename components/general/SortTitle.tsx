"use client";
import { SortBy, SortOptions } from "@/app/types";

import { useMemo } from "react";

const SortTitle = ({ sortBy }: { sortBy: SortBy }) => {
  const nameBySort = useMemo(() => {
    if (sortBy === SortOptions.NEWEST_FIRST) return "Newest";
    if (sortBy === SortOptions.OLDEST_FIRST) return "Oldest";
    if (sortBy === SortOptions.FAVORITE) return "Favorite";
  }, [sortBy]);

  return (
    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
      {nameBySort} posts
    </h1>
  );
};

export default SortTitle;
