import { getPostById } from "@/features/post/actions";
import { Params } from "@/app/types";
import PostForm from "@/components/rhf/PostForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const EditPostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={`/post/${post.id}`}
      >
        Back to post
      </Link>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
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
