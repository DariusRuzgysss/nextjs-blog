import { CategoryFilter, RecipeCategory } from "@/app/types";

export const QUERY_KEYS = {
  POSTS: "posts",
  USER_POSTS: "userPosts",
};

export const navItems = [
  { name: "home", href: "/" },
  { name: "myRecipes", href: "/dashboard" },
];

export const languages = [
  { code: "en", label: "En" },
  { code: "lt", label: "Lt" },
];

export const recipeCategoryOptions: {
  label: string;
  value: CategoryFilter;
}[] = [
  { label: "HomePage.categories.all", value: "all" },
  { label: "HomePage.categories.vegan", value: RecipeCategory.Vegan },
  { label: "HomePage.categories.breakfast", value: RecipeCategory.Breakfast },
  { label: "HomePage.categories.lunch", value: RecipeCategory.Lunch },
  { label: "HomePage.categories.dinner", value: RecipeCategory.Dinner },
  { label: "HomePage.categories.dessert", value: RecipeCategory.Dessert },
  { label: "HomePage.categories.quickBite", value: RecipeCategory.QuickBite },
];
