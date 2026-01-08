import { getPostById } from "@/features/post/actions";
import { Params } from "@/app/types";
import PostForm from "@/components/rhf/PostForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";

const EditPostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  return (
    <div className="max-w-3xl mx-auto">
      <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Recipe", href: `/post/${post.id}` },
          { label: "Edit Recipe" },
        ]}
      />
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Edit Recipe</CardTitle>
          <CardDescription>Fill with a new information</CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm post={post} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPostRoute;
