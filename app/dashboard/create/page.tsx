import PostForm from "@/components/rhf/PostForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const createPostRoute = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={"/dashboard"}
      >
        Back to dashboard
      </Link>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default createPostRoute;
