"use client";
import { BlogPost } from "@/app/types";
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
import { useQueryClient } from "@tanstack/react-query";

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const { user } = useKindeBrowserClient();
  const queryClient = useQueryClient();
  const [favoringPostId, setFavoringPostId] = useState<string | null>(null);
  const isAuthor = post.authorId === user?.id;
  const isLogged = !!user;

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
    markPostAsSeen(post.id);
  }, [post.id, post.authorId, user?.id]);

  const onClickFavorite = useCallback(async () => {
    setFavoringPostId(post.id);
    try {
      if (
        post.favoritePosts?.length &&
        post.favoritePosts.some((fav) => fav.postId === post.id)
      ) {
        await unmarkPostAsFavorite(post.id);
      } else {
        await markPostAsFavorite(post.id);
      }
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } finally {
      setFavoringPostId(null);
    }
  }, [post.id, post.favoritePosts, queryClient]);

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
            alt="blog post"
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

export default BlogPostCard;
