"use client";
import { BlogPost } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useCallback } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { markPostAsSeen } from "@/app/features/post/actions";

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const { user } = useKindeBrowserClient();
  const isNew =
    post.postSeens && !post.postSeens.length && post.authorId !== user?.id;

  const handleClick = useCallback(() => {
    if (post.authorId === user?.id) {
      return;
    }
    markPostAsSeen(post.id);
  }, [post.id, post.authorId, user?.id]);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-2xl">
      {isNew && (
        <Badge className="absolute z-10 left-1 top-1" variant="destructive">
          New
        </Badge>
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
