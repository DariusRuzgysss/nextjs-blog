import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import UserPostsClient from "@/components/general/UserPostsClient";

const Dashboard = async () => {
  const user = await requireUser();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>
      <UserPostsClient userId={user.id} />
    </div>
  );
};

export default Dashboard;
