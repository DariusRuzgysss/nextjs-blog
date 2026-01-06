import { CategoryFilter, RecipeCategory } from "@/app/types";

export const QUERY_KEYS = {
  POSTS: "posts",
  USER_POSTS: "userPosts",
};

export const navItems = [
  { name: "Home", href: "/" },
  { name: "My Recipes", href: "/dashboard" },
];

export const recipeCategoryOptions: {
  label: string;
  value: CategoryFilter;
}[] = [
  { label: "All", value: "all" },
  { label: "Vegan", value: RecipeCategory.Vegan },
  { label: "Breakfast", value: RecipeCategory.Breakfast },
  { label: "Lunch", value: RecipeCategory.Lunch },
  { label: "Dinner", value: RecipeCategory.Dinner },
  { label: "Dessert", value: RecipeCategory.Dessert },
  { label: "Quick Bite", value: RecipeCategory.QuickBite },
];
