import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";
import CardPostForm from "@/components/general/CardPostForm";
import { ROUTES } from "@/lib/constants";

const createPostRoute = () => {
  return (
    <main className="max-w-3xl mx-auto">
      <AppBreadcrumb
        items={[
          { label: "Navbar.home", href: ROUTES.HOME },
          { label: "Navbar.myRecipes", href: ROUTES.DASHBOARD },
          { label: "Actions.new" },
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
