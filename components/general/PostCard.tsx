"use client";
import { Post } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useCallback, useMemo, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  markPostAsFavorite,
  markPostAsSeen,
  unmarkPostAsFavorite,
} from "@/features/post/actions";
import { Icon } from "@iconify/react";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { QUERY_KEYS } from "@/utils/constants";

const PostCard = ({ post }: { post: Post }) => {
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

  const isNew = useMemo(
    () => post.postSeens && !post.postSeens.length && !isAuthor,
    [post.postSeens, isAuthor]
  );
  const isFavorite = useMemo(
    () => post.favoritePosts && post.favoritePosts.length > 0,
    [post.favoritePosts]
  );

  const handleClick = useCallback(() => {
    if (post.authorId === user?.id) {
      return;
    }
    markPostAsSeenMutation.mutateAsync({ id: post.id, data: null });
  }, [post.authorId, post.id, user?.id, markPostAsSeenMutation]);

  const onClickFavorite = useCallback(async () => {
    setFavoringPostId(post.id);
    if (
      post.favoritePosts?.length &&
      post.favoritePosts.some((fav) => fav.postId === post.id)
    ) {
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
    <div className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-2xl">
      {isNew && (
        <Badge className="absolute z-10 left-1 top-1" variant="destructive">
          New
        </Badge>
      )}
      {isLogged && (
        <Icon
          icon={`${
            isFavorite
              ? "material-symbols-light:favorite-rounded"
              : "material-symbols-light:favorite-outline-rounded"
          }`}
          fontSize={40}
          className={`absolute z-10 right-1 top-1 cursor-pointer text-red-600 ${
            favoringPostId === post.id ? "animate-spin transition-all" : ""
          }`}
          onClick={onClickFavorite}
        />
      )}
      <Link
        href={`post/${post.id}`}
        onClick={handleClick}
        className="block w-full h-full"
      >
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={post.imageUrl || "/images/no image.jpg"}
            alt="post"
            loading="eager"
            fill
            className="object-cover hover:scale-105 duration-300"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-gray-900">{post.title}</h3>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2 min-h-10">
            {post.content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative size-8 rounded-full overflow-hidden">
                {post.authorImage && (
                  <Image
                    src={post.authorImage}
                    alt={post.authorName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover"
                  />
                )}
              </div>
              <p>{post.authorName}</p>
            </div>
            <time className="text-sm text-gray-500">
              {new Intl.DateTimeFormat("lt", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(post.createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
