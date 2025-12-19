"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogFormData } from "@/components/rhf/BlogForm";
import { BlogPostWhereInput } from "@/lib/generated/prisma/models";
import { FilterTypes } from "./types";
import { notFound, redirect } from "next/navigation";

export const getPosts = async ({
  sortBy,
  page,
  pageSize,
  searchQuery,
}: FilterTypes) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isAuthor = user ? { where: { userId: user.id } } : false;
    const where: BlogPostWhereInput | undefined = (() => {
      if (searchQuery) {
        return {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { content: { contains: searchQuery, mode: "insensitive" } },
          ],
        };
      } else if (sortBy === "favorites") {
        return {
          favoritePosts: { some: user ? { userId: user.id } : undefined },
        };
      } else {
        return undefined;
      }
    })();

    const [items, itemsCount] = await Promise.all([
      prisma.blogPost.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          postSeens: isAuthor,
          favoritePosts: isAuthor,
        },
        orderBy: {
          createdAt: sortBy === "favorites" ? "desc" : sortBy,
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
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const data = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

export const updatePost = async (post: BlogFormData, id: string) => {
  try {
    await prisma.blogPost.update({
      where: {
        id,
      },
      data: { ...post, updatedAt: new Date() },
    });
    redirect(`/post/${id}`);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const createPost = async (data: BlogFormData) => {
  try {
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
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPostsByUserId = async (userId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return await prisma.blogPost.findMany({
      where: {
        authorId: userId,
      },
      include: {
        favoritePosts: user ? { where: { userId: user.id } } : false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    throw error;
  }
};

export const deletePost = async (id: string, userId: string) => {
  try {
    const seenPost = await prisma.postSeen.findFirst({
      where: { postId: id, userId },
    });

    const favoritePost = await prisma.favoritePost.findFirst({
      where: { postId: id, userId },
    });

    if (seenPost) {
      await prisma.postSeen.delete({
        where: { id: seenPost.id },
      });
    }

    if (favoritePost) {
      await prisma.favoritePost.delete({
        where: { id: favoritePost.id },
      });
    }

    await prisma.blogPost.delete({
      where: { id, authorId: userId },
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const markPostAsSeen = async (postId: string) => {
  try {
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
  } catch (error) {
    console.error("Error marking post as seen:", error);
    throw error;
  }
};

export const markPostAsFavorite = async (postId: string) => {
  try {
    const user = await requireUser();
    await prisma.favoritePost.upsert({
      where: {
        postId_userId: { postId, userId: user.id },
      },
      update: {}, // if exists, do nothing
      create: {
        postId,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error marking post as favorite:", error);
    throw error;
  }
};

export const unmarkPostAsFavorite = async (postId: string) => {
  try {
    const user = await requireUser();
    await prisma.favoritePost.deleteMany({
      where: { postId, userId: user.id },
    });
  } catch (error) {
    console.error("Error unmarking post as favorite:", error);
    throw error;
  }
};
