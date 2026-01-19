export enum RecipeCategory {
  Vegan = "VEGAN",
  Breakfast = "BREAKFAST",
  Lunch = "LUNCH",
  Dinner = "DINNER",
  Dessert = "DESSERT",
  QuickBite = "QUICK_BITE",
}

export type CategoryFilter = RecipeCategory | "all";

export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  category: string;
  ingredients: string[];
  calories: number;
  preparationTime: number;
  createdAt: Date;
  updatedAt: Date;
  avgRating: number;
  totalRating: number;
  postSeens?: PostSeen[];
  favoritePosts?: FavoritePost[];
  comments?: Comment[];
  ratings?: Rating[];
};

export type PostSeen = {
  id: string;
  userId: string;
  postId: string;
  seenAt: Date;
};

export type FavoritePost = {
  id: string;
  userId: string;
  postId: string;
  favAt: Date;
};

export type Rating = {
  id: string;
  value: number; // 1-5
  userId: string;
  postId: string;
  createdAt: Date;
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

export type PostFormType = Pick<
  Post,
  | "id"
  | "title"
  | "content"
  | "imageUrl"
  | "category"
  | "ingredients"
  | "preparationTime"
  | "calories"
>;
