import { CategoryFilter, RecipeCategory, SortOptions } from "@/types";

export const QUERY_KEYS = {
  POSTS: "posts",
  USER_POSTS: "userPosts",
  USER_POST: "userPost",
} as const;

export const ROUTES = {
  HOME: "/",
  POST: (id: string) => `/post/${id}`,
  EDIT_POST: (id: string) => `/post/${id}/edit`,
  DASHBOARD: "/dashboard",
  CREATE_POST: "/dashboard/create",
} as const;

export const NAV_ITEMS = [
  { name: "home", href: ROUTES.HOME },
  { name: "myRecipes", href: ROUTES.DASHBOARD },
] as const;

export const LANGUAGES = [
  { code: "en", label: "En" },
  { code: "lt", label: "Lt" },
] as const;

export const RECIPE_CATEGORY_OPTIONS: {
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
] as const;

export const SORT_FILTER = [
  { title: "newest", value: SortOptions.NEWEST_FIRST, onlyLogged: false },
  { title: "oldest", value: SortOptions.OLDEST_FIRST, onlyLogged: false },
  { title: "favorite", value: SortOptions.FAVORITE, onlyLogged: true },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 6,
  MAX_PAGE_SIZE: 50,
} as const;

export const IMAGE_SIZES = {
  LOGO: { width: 60, height: 40 },
  THUMBNAIL: { width: 450, height: 300 },
  CARD: { width: 800, height: 600 },
  FULL: { width: 1200, height: 900 },
} as const;

export const RATING = {
  MIN: 1,
  MAX: 5,
} as const;

export const aiPromptMessage = `You are a nutrition calculator.
  
        I will provide a list of ingredients with their weights in grams.
        Each ingredient name is in Lithuanian.
        Use standard average nutritional values.
  
        Steps:
        1. Calculate total calories of all ingredients.
        2. Calculate total weight of the dish in grams.
        3. Calculate calories per 100 grams using this formula:
          (total calories / total weight) * 100
  
        Return ONLY a single numeric value (integer), with no text, no units, no explanation.
  
        Ingredients:`;
