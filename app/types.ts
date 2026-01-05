import { HTMLInputTypeAttribute } from "react";
import { Path } from "react-hook-form";

export type FormFieldProps<TFormValues> = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name: Path<TFormValues>;
  label?: string;
  valueAsNumber?: boolean;
};

export type Params = Promise<{ id: string }>;
export type SortBy = "desc" | "asc" | "favorites";

export enum SortOptions {
  NEWEST_FIRST = "desc",
  OLDEST_FIRST = "asc",
  FAVORITE = "favorites",
}

export enum RecipeCategory {
  Vegan = "VEGAN",
  Breakfast = "BREAKFAST",
  Lunch = "LUNCH",
  Dinner = "DINNER",
  Dessert = "DESSERT",
  QuickBite = "QUICK_BITE",
}

export type CategoryFilter = RecipeCategory | "all";

export type FilterTypes = {
  searchQuery: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
  category: CategoryFilter;
};

export type UrlParams = Promise<{
  query?: string;
  sort?: SortBy;
  page?: string;
  limit?: number;
  category?: CategoryFilter;
}>;

export type Post = {
  title: string;
  content: string;
  id: string;
  imageUrl?: string;
  authorId: string;
  category: string;
  ingredients: string[];
  postSeens?: PostSeen[];
  favoritePosts?: FavoritePost[];
  comments?: Comment[];
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
};

type PostSeen = {
  id: string;
  userId: string;
  postId: string;
  seenAt: Date;
};

type FavoritePost = {
  id: string;
  userId: string;
  postId: string;
  favAt: Date;
};

type Comment = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};
