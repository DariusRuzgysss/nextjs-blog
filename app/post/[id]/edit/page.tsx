import { getPostById } from "@/features/post/actions";
import { Params } from "@/app/types";
import BlogForm from "@/components/rhf/BlogForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const EditBlogPostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  return (
    <div className="max-w-3xl mx-auto p-2v">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={`/post/${post.id}`}
      >
        Back to post
      </Link>
      <Card className="lg:max-w-lg max-w-full mx-auto mt-3">
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
