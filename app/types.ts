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

export type UrlParams = Promise<{
  query?: string;
  sort?: SortBy;
  page?: string;
  limit?: number;
}>;

export type BlogPost = {
  title: string;
  content: string;
  id: string;
  imageUrl?: string;
  authorId: string;
  postSeens?: Array<PostSeen>;
  favoritePosts?: Array<FavoritePost>;
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
