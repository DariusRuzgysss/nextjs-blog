import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";
import PostForm from "@/components/rhf/PostForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const createPostRoute = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My Recipes", href: `/dashboard` },
          { label: "Create Recipe" },
        ]}
      />
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Create Your Recipe</CardTitle>
          <CardDescription>
            Share your culinary masterpiece with the world
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
