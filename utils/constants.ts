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
