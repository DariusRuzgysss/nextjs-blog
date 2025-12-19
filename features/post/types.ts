import { SortBy } from "@/app/types";

export type FilterTypes = {
  searchQuery: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
};
