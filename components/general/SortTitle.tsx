"use client";
import { SortBy, SortOptions } from "@/types";
import { useTranslations } from "next-intl";

import { useMemo } from "react";

const SortTitle = ({ sortBy }: { sortBy: SortBy }) => {
  const t = useTranslations("General");
  const nameBySort = useMemo(() => {
    if (sortBy === SortOptions.NEWEST_FIRST) return "newest";
    else if (sortBy === SortOptions.OLDEST_FIRST) return "oldest";
    else if (sortBy === SortOptions.FAVORITE) return "favorite";
    else return "mostViewed";
  }, [sortBy]);

  return (
    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
      {t(nameBySort)} {t("recipes")}
    </h1>
  );
};

export default SortTitle;
