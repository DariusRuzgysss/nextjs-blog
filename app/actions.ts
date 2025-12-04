"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogFormData } from "@/components/rhf/BlogForm";

export const getBlogPosts = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return await prisma.blogPost.findMany({
    include: {
      postSeens: user ? { where: { userId: user.id } } : false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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

export const updateBlogPost = async (post: BlogFormData, id: string) => {
  await prisma.blogPost.update({
    where: {
      id,
    },
    data: { ...post, updatedAt: new Date() },
  });
  redirect(`/post/${id}`);
};

export const createBlogPost = async (data: BlogFormData) => {
  const user = await requireUser();
  await prisma.blogPost.create({
    data: {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
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

export const isPostSeen = async (postId: string, userId: string) =>
  await prisma.postSeen.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

export const markPostAsSeen = async (postId: string) => {
  const user = await requireUser();
  await prisma.postSeen.upsert({
    where: {
      postId_userId: { postId, userId: user.id },
    },
    update: {}, // if exists, do nothing
    create: {
      postId,
      userId: user.id,
    },
  });
};
