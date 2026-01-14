import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";
import CardPostForm from "@/components/general/CardPostForm";

const createPostRoute = () => {
  return (
    <main className="max-w-3xl mx-auto">
      <AppBreadcrumb
        items={[
          { label: "Navbar.home", href: "/" },
          { label: "Navbar.myRecipes", href: `/dashboard` },
          { label: "ManageRecipePage.createYourRecipe" },
        ]}
      />
      <CardPostForm
        title="ManageRecipePage.createYourRecipe"
        description="ManageRecipePage.createYourRecipeDesc"
      />
    </main>
  );
};

export default createPostRoute;
