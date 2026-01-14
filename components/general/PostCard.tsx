"use client";
import { Post, RecipeCategory } from "@/app/types";
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
import { QUERY_KEYS } from "@/utils/constants";
import { Timer } from "lucide-react";
import { minutesToHours } from "@/utils/helper";
import { PostMeta } from "./PostMeta";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const PostCard = ({ post }: { post: Post }) => {
  const t = useTranslations("PostCard");
  const { user } = useKindeBrowserClient();
  const [favoringPostId, setFavoringPostId] = useState<string | null>(null);
  const isAuthor = post.authorId === user?.id;
  const isLogged = !!user;

  const markPostAsSeenMutation = useQueryMutate<string, null, void>(
    undefined,
    markPostAsSeen,
    [QUERY_KEYS.POSTS]
  );

  const unmarkPostAsFavoriteMutation = useQueryMutate<string, null, void>(
    undefined,
    unmarkPostAsFavorite,
    [QUERY_KEYS.USER_POSTS, QUERY_KEYS.POSTS],
    undefined,
    "Removed from favorites"
  );

  const markPostAsFavoriteMutation = useQueryMutate<string, null, void>(
    undefined,
    markPostAsFavorite,
    [QUERY_KEYS.USER_POSTS, QUERY_KEYS.POSTS],
    undefined,
    "Saved to your favorites"
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
        (p) => p.postId === post.id && p.userId === user.id
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-lg border border-(--dark)/16 bg-(--light) shadow-md transition-all hover:shadow-2xl"
    >
      {isNew && (
        <Badge className="absolute z-10 left-1 top-1" variant="destructive">
          {t("new")}
        </Badge>
      )}
      {post.category === RecipeCategory.Vegan && (
        <Image
          alt="vegan"
          src="/images/Vegan_tag.png"
          width={60}
          height={60}
          className="absolute z-10 right-5 top-52"
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
            className={` text-(--primary-color-3) w-8 h-8  ${
              favoringPostId === post.id ? "animate-spin transition-all" : ""
            }`}
            onClick={onClickFavorite}
          />
        </div>
      )}
      <Link
        href={`post/${post.id}`}
        onClick={handleClick}
        className="block w-full h-full active:bg-active lg:active:bg-transparent"
      >
        <div className="rounded-br-[40px] relative h-60 w-full overflow-hidden">
          <Image
            src={post.imageUrl || "/images/no image.jpg"}
            alt="post"
            loading="eager"
            fill
            className="object-cover hover:scale-105 duration-300"
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 23vw"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-[24px] font-bold text-gray-900">
            {post.title}
          </h3>
          <p className="text-(--dark) text-[16px] font-light line-clamp-2 min-h-10">
            {post.content}
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
            <div className="rounded-3xl border border-(--dark) sm:px-3 px-6 py-3 font-medium uppercase text-center text-[14px] text-(--dark) hover:border-(--primary-color-3)">
              {t("viewRecipe")}
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
    </motion.div>
  );
};

export default PostCard;
