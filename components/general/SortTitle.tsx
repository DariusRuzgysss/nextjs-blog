"use client";
import { SortBy } from "@/app/types";
import React, { useMemo } from "react";

const SortTitle = ({ sortBy }: { sortBy: SortBy }) => {
  const nameBySort = useMemo(() => {
    if (sortBy === "desc") return "Newest";
    if (sortBy === "asc") return "Oldest";
    if (sortBy === "favorites") return "Favorite";
  }, [sortBy]);

  return (
    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
      {nameBySort} posts
    </h1>
  );
};

export default SortTitle;
