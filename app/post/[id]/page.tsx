import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { requireUser } from "@/lib/auth";
import { Params } from "@/app/types";
import { Icon } from "@iconify/react";
import { getPostById } from "@/features/post/actions";
import DeletePostClient from "@/components/general/DeletePostClient";
import { AppBreadcrumb } from "@/components/general/AppBreadcrumb";
import { Timer } from "lucide-react";
import { minutesToHours } from "@/utils/helper";
import { PostMeta } from "@/components/general/PostMeta";
import PostComments from "@/components/general/PostComments";
import CommentsField from "@/components/rhf/CommentsField";
import TitleClient from "@/components/general/TitleClient";

const PostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const post = await getPostById(id);
  const user = await requireUser();
  const isEditable = post.authorId === user?.id;

  const preparationTime = minutesToHours(post.preparationTime);

  return (
    <main className="flex flex-col gap-4">
      <AppBreadcrumb
        items={[
          { label: "Navbar.home", href: "/" },
          { label: "Navbar.myRecipes", href: "/dashboard" },
          { label: "General.recipe" },
        ]}
      />
      <div className="rounded-4xl border-(--dark)/24 border lg:py-16 lg:px-10 py-10 px-4">
        <div className="flex flex-row justify-between items-start mb-10 gap-2">
          <div className="flex flex-col gap-3">
            <PostMeta
              authorImage={post.authorImage}
              createdAt={post.createdAt}
              authorName={post.authorName}
            />
            {post.comments.length > 0 && (
              <div className="flex flex-row gap-3 text-(--dark)/70">
                <Icon
                  icon="material-symbols:mode-comment-outline"
                  fontSize={24}
                />
                <p>{post.comments.length}</p>
              </div>
            )}
          </div>
          {isEditable && (
            <div className="flex flex-row gap-3 items-center shrink-0">
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
              <DeletePostClient post={post} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Button
              className="uppercase text-[18px] active:border border-(--primaryColor2)"
              variant="primary"
            >
              <TitleClient title="General.recipe" />
            </Button>
            <div className="max-w-[870px] flex  flex-col gap-3 text-center mt-5 mb-5">
              <p className="font-extrabold text-[38px] lg:text-[80px] leading-none">
                {post.title}
              </p>
              <TitleClient
                title="PostPage.description"
                className="text-(--dark)/60 text-[16px] lg:text-[21px]"
              />
            </div>
          </div>

          {preparationTime && (
            <div className="flex flex-row gap-2">
              <Timer />
              <p className="font-semibold text-[18px]">
                {preparationTime.toUpperCase()}
              </p>
            </div>
          )}
          <div className="relative w-full h-60 lg:h-120 rounded-lg overflow-hidden mt-5">
            <Image
              src={post.imageUrl || "/images/no image.jpg"}
              alt="post"
              loading="eager"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 pt-10 mb-10">
          <div className="grid gap-4 px-4 py-6 bg-white rounded-lg border border-(--dark)/24">
            <TitleClient
              title="PostPage.ingredients"
              className="uppercase text-[24px] font-semibold text-(--primary-color-3)"
            />
            <ul className="list-disc list-inside grid gap-1">
              {post.ingredients.map((ingredient, index) => (
                <li className="lg:text-[18px] text-[16px]" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 self-start">
            <TitleClient
              title="PostPage.instructions"
              className="uppercase text-[24px] font-semibold"
            />

            <p className="lg:text-[18px] text-[16px] font-light text-(--dark)/90 tracking-wider">
              {post.content}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <TitleClient
            tag="h1"
            title="PostPage.comments"
            className="uppercase text-[28px] font-semibold"
          />
          {user && <CommentsField postId={post.id} />}
          <PostComments post={post} />
        </div>
      </div>
    </main>
  );
};

export default PostRoute;
