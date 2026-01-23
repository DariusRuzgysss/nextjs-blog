"use client";
import { Post, RecipeCategory } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useCallback, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  markPostAsFavorite,
  markPostAsSeen,
  unmarkPostAsFavorite,
} from "@/features/post/actions";
import { Icon } from "@iconify/react";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { Timer } from "lucide-react";
import { PostMeta } from "./PostMeta";
import { useTranslations } from "next-intl";
import { StarRating } from "./StarRating";
import AnimationWrapperClient from "./AnimationWrapperClient";
import Calories from "./Calories";
import { QUERY_KEYS, ROUTES } from "@/lib/constants";
import { minutesToHours } from "@/lib/helper";
import parse from "html-react-parser";

const PostCard = ({ post }: { post: Post }) => {
  const t = useTranslations();
  const { user } = useKindeBrowserClient();
  const [favoringPostId, setFavoringPostId] = useState<string | null>(null);
  const isAuthor = post.authorId === user?.id;
  const isLogged = !!user;

  const markPostAsSeenMutation = useQueryMutate<string, null, void>(
    undefined,
    markPostAsSeen,
    [QUERY_KEYS.POSTS],
  );

  const unmarkPostAsFavoriteMutation = useQueryMutate<string, null, void>(
    undefined,
    unmarkPostAsFavorite,
    [QUERY_KEYS.USER_POSTS, QUERY_KEYS.POSTS],
    undefined,
    t("Toasts.recipeUnfavorited"),
  );

  const markPostAsFavoriteMutation = useQueryMutate<string, null, void>(
    undefined,
    markPostAsFavorite,
    [QUERY_KEYS.USER_POSTS, QUERY_KEYS.POSTS],
    undefined,
    t("Toasts.recipeFavorited"),
  );

  const isNew = isLogged && !isAuthor && (post.postSeens?.length ?? 0) === 0;
  const isFavorite = Boolean(post.favoritePosts?.length);

  const preparationTime = minutesToHours(post.preparationTime);

  const handleClick = useCallback(() => {
    if (post.authorId === user?.id) {
      return;
    }
    const hasSeen =
      user?.id &&
      !post.postSeens?.some(
        (p) => p.postId === post.id && p.userId === user.id,
      );
    if (hasSeen) {
      markPostAsSeenMutation.mutateAsync({ id: post.id, data: null });
    }
  }, [post.authorId, post.postSeens, post.id, user, markPostAsSeenMutation]);

  const onClickFavorite = useCallback(async () => {
    setFavoringPostId(post.id);
    if (post.favoritePosts?.some((fav) => fav.postId === post.id)) {
      await unmarkPostAsFavoriteMutation.mutateAsync({
        id: post.id,
        data: null,
      });
    } else {
      await markPostAsFavoriteMutation.mutateAsync({ id: post.id, data: null });
    }
    setFavoringPostId(null);
  }, [
    post.id,
    post.favoritePosts,
    unmarkPostAsFavoriteMutation,
    markPostAsFavoriteMutation,
  ]);

  return (
    <AnimationWrapperClient
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-lg border border-(--dark)/16 bg-(--white) shadow-md transition-all hover:shadow-2xl"
    >
      {isNew && (
        <Badge className="absolute z-10 left-1 top-1" variant="destructive">
          {t("PostCard.new")}
        </Badge>
      )}
      {post.calories > 0 && (
        <Calories
          calories={post.calories}
          className="absolute z-10 left-2 top-50"
        />
      )}

      {post.category === RecipeCategory.Vegan && (
        <Image
          alt="vegan"
          src="/images/Vegan_tag.png"
          width={60}
          height={60}
          className="absolute z-10 right-2 top-43 opacity-80"
        />
      )}
      {isLogged && (
        <div className="absolute z-10 right-2 top-2 shadow-lg shadow-black/30 cursor-pointer rounded-full bg-background w-12 h-12 flex justify-center items-center">
          <Icon
            icon={`${
              isFavorite
                ? "material-symbols-light:favorite-rounded"
                : "material-symbols-light:favorite-outline-rounded"
            }`}
            className={` text-(--primary-color-3) w-9 h-9  ${
              favoringPostId === post.id ? "animate-spin transition-all" : ""
            }`}
            onClick={onClickFavorite}
          />
        </div>
      )}
      <Link
        href={ROUTES.POST(post.id)}
        onClick={handleClick}
        className="block w-full h-full active:bg-active lg:active:bg-transparent"
      >
        <div className="rounded-br-[40px] relative h-60 w-full overflow-hidden">
          <Image
            src={post.imageUrl || "/images/no image.jpg"}
            alt="post"
            loading="eager"
            fetchPriority="high"
            fill
            className="object-cover hover:scale-105 duration-300"
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="flex flex-col items-end">
            <StarRating value={post.avgRating} />
          </div>
          <h3 className="mb-2 min-h-16 mr-4 text-[24px] line-clamp-2 font-bold">
            {post.title}
          </h3>
          <p className="text-(--dark) text-[16px] font-light line-clamp-2 min-h-10">
            {parse(post.content)}
          </p>

          <div className="flex items-center justify-between mb-5 mt-5">
            {preparationTime ? (
              <div className="flex shrink-0 flex-row gap-4 mr-5 items-center">
                <Timer />
                <div className="flex flex-row items-center gap-1">
                  {preparationTime}
                </div>
              </div>
            ) : (
              <div />
            )}
            <div className="rounded-3xl border border-(--dark) px-3 lg:px-6 py-3 font-medium uppercase text-center text-[12px] lg:text-[14px] text-(--dark) hover:border-(--primary-color-3)">
              {t("PostCard.viewRecipe")}
            </div>
          </div>
          <PostMeta
            className="flex items-center justify-between"
            authorImage={post.authorImage}
            createdAt={post.createdAt}
            authorName={post.authorName}
          />
        </div>
      </Link>
    </AnimationWrapperClient>
  );
};

export default PostCard;
