import BlogForm from "@/components/rhf/BlogForm";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateBlogPostRoute = () => {
  return (
    <div>
      <Card className="lg:max-w-lg max-w-full mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <BlogForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlogPostRoute;
