import { getPostById } from "@/features/post/actions";
import { Params } from "@/app/types";
import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";
import CardPostForm from "@/components/general/CardPostForm";

const EditPostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  return (
    <div className="max-w-3xl mx-auto">
      <AppBreadcrumb
        items={[
          { label: "Navbar.home", href: "/" },
          { label: "Navbar.myRecipes", href: "/dashboard" },
          { label: "General.recipe", href: `/post/${post.id}` },
          { label: "ManageRecipePage.editRecipe" },
        ]}
      />
      <CardPostForm
        post={post}
        title="ManageRecipePage.editRecipe"
        description="ManageRecipePage.editRecipeDesc"
      />
    </div>
  );
};

export default EditPostRoute;
