import { getBlogPostById } from "@/app/actions";
import { Params } from "@/app/types";
import BlogForm from "@/components/rhf/BlogForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const EditBlogPostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getBlogPostById(id);
  return (
    <div>
      <Card className="lg:max-w-lg max-w-full mx-auto">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>Fill with a new information</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm post={post} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlogPostRoute;
