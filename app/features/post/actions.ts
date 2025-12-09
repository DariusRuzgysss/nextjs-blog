"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogFormData } from "@/components/rhf/BlogForm";
import { BlogPostWhereInput } from "@/lib/generated/prisma/models";
import { FilterTypes } from "./types";

export const getPosts = async ({
  sortBy,
  page,
  pageSize,
  searchQuery,
}: FilterTypes) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const where: BlogPostWhereInput | undefined = searchQuery
    ? {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
        ],
      }
    : undefined;

  const [items, itemsCount] = await Promise.all([
    prisma.blogPost.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        postSeens: user ? { where: { userId: user.id } } : false,
      },
      orderBy: {
        createdAt: sortBy,
      },
      where,
    }),
    prisma.blogPost.count({
      where,
    }),
  ]);

  return {
    items,
    totalPages: Math.ceil(itemsCount / pageSize),
  };
};

export const getPostById = async (id: string) => {
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

export const updatePost = async (post: BlogFormData, id: string) => {
  await prisma.blogPost.update({
    where: {
      id,
    },
    data: { ...post, updatedAt: new Date() },
  });
  redirect(`/post/${id}`);
};

export const createPost = async (data: BlogFormData) => {
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

export const getPostsByUserId = async (userId: string) => {
  return await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deletePost = async (id: string, userId: string) => {
  const seenPost = await prisma.postSeen.findFirst({
    where: { postId: id, userId },
  });

  if (seenPost) {
    await prisma.postSeen.delete({
      where: { id: seenPost.id },
    });
  }

  await prisma.blogPost.delete({
    where: { id, authorId: userId },
  });

  redirect("/dashboard");
};

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
