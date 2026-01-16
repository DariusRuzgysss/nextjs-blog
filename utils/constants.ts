import { CategoryFilter, RecipeCategory, SortOptions } from "@/app/types";

export const QUERY_KEYS = {
  POSTS: "posts",
  USER_POSTS: "userPosts",
  USER_POST: "userPost",
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

export const SortFilter = [
  { title: "newest", value: SortOptions.NEWEST_FIRST, onlyLogged: false },
  { title: "oldest", value: SortOptions.OLDEST_FIRST, onlyLogged: false },
  { title: "favorite", value: SortOptions.FAVORITE, onlyLogged: true },
];
