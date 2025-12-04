"use client";
import { BlogPost } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { markPostAsSeen } from "@/app/actions";

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const isSeen = post.postSeens && !post.postSeens.length;
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-2xl">
      {isSeen && (
        <Badge className="absolute z-10 left-1 top-1" variant="destructive">
          New
        </Badge>
      )}
      <Link
        href={`post/${post.id}`}
        onClick={() => {
          markPostAsSeen(post.id);
        }}
        className="block w-full h-full"
      >
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={post.imageUrl}
            alt="blog post"
            loading="eager"
            sizes="48"
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
                    loading="eager"
                    sizes="48"
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
