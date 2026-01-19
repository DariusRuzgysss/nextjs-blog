import { Params } from "@/types";
import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";
import CardPostForm from "@/components/general/CardPostForm";
import { getPostById } from "@/lib/api/posts";
import { ROUTES } from "@/lib/constants";

const EditPostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  return (
    <main className="max-w-3xl mx-auto">
      <AppBreadcrumb
        items={[
          { label: "Navbar.home", href: ROUTES.HOME },
          { label: "Navbar.myRecipes", href: ROUTES.DASHBOARD },
          { label: "General.recipe", href: ROUTES.POST(post.id) },
          { label: "Actions.edit" },
        ]}
      />
      <CardPostForm
        post={post}
        title="ManageRecipePage.editRecipe"
        description="ManageRecipePage.editRecipeDesc"
      />
    </main>
  );
};

export default EditPostRoute;
