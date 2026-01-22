export type SortBy = (typeof SortOptions)[keyof typeof SortOptions];

export enum SortOptions {
  NEWEST_FIRST = "desc",
  OLDEST_FIRST = "asc",
  FAVORITE = "favorites",
  RATED = "rated",
}

export type FilterTypes = {
  searchQuery: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
  category: string;
  preparationTime: number[];
};

export type Params = Promise<{ id: string }>;

export type UrlParams = Promise<{
  query?: string;
  sort?: SortBy;
  page?: string;
  limit?: number;
  category?: string;
  timeMin?: string;
  timeMax?: string;
}>;

export type PaginatedResponse<T> = {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems?: number;
};
