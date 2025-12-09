import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { Params } from "@/app/types";
import { CustomDialog } from "@/components/general/Dialog";
import { Icon } from "@iconify/react";
import { deletePost, getPostById } from "@/app/features/post/actions";

const PostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  const user = await requireUser();
  const isEditable = post.authorId === user.id;

  return (
    <div className="max-w-3xl mx-auto p-4 lg:px-0">
      <Link className={buttonVariants({ variant: "outline" })} href="/">
        Back to posts
      </Link>
      <div className="my-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          {isEditable && (
            <div className="flex flex-row gap-3 items-center">
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href={`/post/${id}/edit`}
              >
                <Icon
                  icon="ic:baseline-mode-edit"
                  fontSize={24}
                  className="cursor-pointer hover:opacity-80"
                />
              </Link>
              <CustomDialog
                title={`Are you sure want to delete "${post.title}" ?`}
                description="Couldn't be recovered after deletion"
                onConfirm={async () => {
                  "use server";
                  await deletePost(id, user.id);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 rounded-full overflow-hidden">
              {post.authorImage && (
                <Image
                  src={post.authorImage}
                  alt={post.authorName}
                  fill
                  loading="eager"
                  sizes="48"
                  className="object-cover"
                />
              )}
            </div>
            <p className="font-medium">{post.authorName}</p>
          </div>
          <time className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("lt", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(post.createdAt)}
          </time>
        </div>
      </div>
      <div className="relative h-80 w-full overflow-hidden rounded-lg">
        <Image
          src={post.imageUrl || "/images/no image.jpg"}
          alt="blog post"
          loading="eager"
          fill
          className="object-contain"
          priority
        />
      </div>
      <Card>
        <CardContent>{post.content}</CardContent>
      </Card>
    </div>
  );
};

export default PostRoute;
