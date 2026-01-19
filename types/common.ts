export type SortBy = "desc" | "asc" | "favorites";

export enum SortOptions {
  NEWEST_FIRST = "desc",
  OLDEST_FIRST = "asc",
  FAVORITE = "favorites",
}

export type FilterTypes = {
  searchQuery: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
  category: string;
};

export type Params = Promise<{ id: string }>;

export type UrlParams = Promise<{
  query?: string;
  sort?: SortBy;
  page?: string;
  limit?: number;
  category?: string;
}>;

export type PaginatedResponse<T> = {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems?: number;
};
