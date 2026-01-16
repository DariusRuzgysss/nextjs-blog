"use client";
import { minutesToHours } from "@/utils/helper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { Timer, Edit } from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import CommentsField from "../rhf/CommentsField";
import { buttonVariants, Button } from "../ui/button";
import { AppBreadcrumb } from "./AppBreadcrumb";
import DeletePostClient from "./DeletePostClient";
import PostComments from "./PostComments";
import { PostMeta } from "./PostMeta";
import { StarRating } from "./StarRating";
import { useUserPostQueryOptions } from "@/hooks/api/useUserPost";
import { useTranslations } from "next-intl";
import { ratePost } from "@/features/post/actions";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { QUERY_KEYS } from "@/utils/constants";
import Link from "next/link";
import AnimationWrapperClient from "./AnimationWrapperClient";
import Calories from "./Calories";

type Props = {
  id: string;
};

const UserPostClient = ({ id }: Props) => {
  const t = useTranslations();
  const user = useKindeBrowserClient().getUser();
  const isLoggedIn = !!user;

  const { data: post } = useQuery(useUserPostQueryOptions(id));

  const ratePostMutation = useQueryMutate<string, number, void>(
    undefined,
    ratePost,
    [QUERY_KEYS.USER_POST, QUERY_KEYS.POSTS],
    undefined,
    t("Toasts.ratingSubmitted")
  );

  if (!post) return null;

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
                <Edit />
              </Link>
              <DeletePostClient post={post} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              className="uppercase text-[18px] active:border border-(--primaryColor2)"
              variant="primary"
            >
              <p>{t("General.recipe")}</p>
            </Button>
            <StarRating
              value={post.avgRating}
              {...(isLoggedIn && {
                onChange: (value) =>
                  ratePostMutation.mutate({ id: post.id, data: value }),
              })}
            />
            <div className="max-w-[870px] flex  flex-col gap-3 text-center mt-5 mb-5">
              <p className="font-extrabold text-[38px] lg:text-[80px] leading-none">
                {post.title}
              </p>
              <p className="text-(--dark)/60 text-[16px] lg:text-[21px]">
                {t("PostPage.description")}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {preparationTime && (
              <div className="flex flex-row gap-2">
                <Timer />
                <p className="font-semibold text-[18px]">
                  {preparationTime.toUpperCase()}
                </p>
              </div>
            )}
            {post.calories > 0 && <Calories calories={post.calories} />}
          </div>
          <AnimationWrapperClient
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full h-60 lg:h-120 rounded-lg overflow-hidden mt-5"
          >
            <Image
              src={post.imageUrl || "/images/no image.jpg"}
              alt="post"
              loading="eager"
              fill
              className="object-cover"
              priority
            />
          </AnimationWrapperClient>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 pt-10 mb-10">
          <div className="grid gap-4 px-4 py-6 bg-white rounded-lg border border-(--dark)/24">
            <p className="uppercase text-[24px] font-semibold text-(--primary-color-3)">
              {t("PostPage.ingredients")}
            </p>

            <ul className="list-disc list-inside grid gap-1">
              {post.ingredients.map((ingredient, index) => (
                <li className="lg:text-[18px] text-[16px]" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 self-start">
            <p className="uppercase text-[24px] font-semibold">
              {t("PostPage.instructions")}
            </p>
            <p className="lg:text-[18px] text-[16px] font-light text-(--dark)/90 tracking-wider">
              {post.content}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="uppercase text-[28px] font-semibold">
            {t("PostPage.comments")}
          </h1>
          {user && <CommentsField postId={post.id} />}
          <PostComments post={post} />
        </div>
      </div>
    </main>
  );
};

export default UserPostClient;
