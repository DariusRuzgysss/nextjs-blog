import BlogForm from "@/components/rhf/BlogForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const createPostRoute = () => {
  return (
    <div className="px-2 lg:px-0">
      <Card className="lg:max-w-lg max-w-full mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default createPostRoute;
