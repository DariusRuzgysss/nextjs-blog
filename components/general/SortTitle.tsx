"use client";
import { SortBy, SortOptions } from "@/types";
import { useTranslations } from "next-intl";

import { useMemo } from "react";

const SortTitle = ({ sortBy }: { sortBy: SortBy }) => {
  const t = useTranslations();
  const nameBySort = useMemo(() => {
    if (sortBy === SortOptions.NEWEST_FIRST) return SortOptions.NEWEST_FIRST;
    else if (sortBy === SortOptions.OLDEST_FIRST)
      return SortOptions.OLDEST_FIRST;
    else if (sortBy === SortOptions.FAVORITE) return SortOptions.FAVORITE;
    else if (sortBy === SortOptions.RATED) return SortOptions.RATED;
    else return "";
  }, [sortBy]);

  return (
    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
      {t(`Filters.${nameBySort}`)} {t("General.recipes")}
    </h1>
  );
};

export default SortTitle;
