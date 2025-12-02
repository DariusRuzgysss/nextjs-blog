"use server";

import { BlogFormData } from "@/components/rhf/BlogForm";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { notFound, redirect } from "next/navigation";
import { BlogPost } from "./types";

export const getBlogPosts = async () => {
  return await prisma.blogPost.findMany();
};

export const getBlogPostById = async (id: string) => {
  const data = await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export const updateBlogPost = async (post: BlogPost) => {
  await prisma.blogPost.update({
    where: {
      id: post.id,
    },
    data: post,
  });
};

export const createBlogPost = async (data: BlogFormData) => {
  const user = await requireUser();
  await prisma.blogPost.create({
    data: {
      title: data.title,
      content: data.content,
      imageUrl: data.url,
      authorId: user?.id,
      authorName: user?.given_name ?? "",
      authorImage: user?.picture ?? "",
    },
  });

  redirect("/dashboard");
};

export const getBlogPostsByUserId = async (userId: string) => {
  return await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
