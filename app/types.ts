import { HTMLInputTypeAttribute } from "react";
import { Path } from "react-hook-form";

export type FormFieldProps<TFormValues> = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name: Path<TFormValues>;
  label?: string;
  valueAsNumber?: boolean;
  className?: string;
  fieldValue?: string;
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
  preparationTime: number;
  favoritePosts?: FavoritePost[];
  comments?: PostComment[];
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostFormType = Pick<
  Post,
  | "id"
  | "title"
  | "content"
  | "imageUrl"
  | "category"
  | "ingredients"
  | "preparationTime"
>;

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

export type PostComment = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};
