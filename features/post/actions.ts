"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PostFormData } from "@/components/rhf/PostForm";
import { BlogPostWhereInput } from "@/lib/generated/prisma/models";
import { notFound } from "next/navigation";
import { FilterTypes } from "@/app/types";

export const getPosts = async ({
  sortBy,
  page,
  pageSize,
  searchQuery,
  category: selectedCategory,
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
      } else if (selectedCategory !== "all") {
        return {
          category: selectedCategory,
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
          comments: {
            orderBy: { createdAt: "desc" },
          },
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
      totalPages: Math.ceil(itemsCount / pageSize) || 1,
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

export const updatePost = async (
  id: string,
  post: PostFormData
): Promise<void> => {
  try {
    await prisma.blogPost.update({
      where: {
        id,
      },
      data: { ...post, updatedAt: new Date() },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const createPost = async (data: PostFormData): Promise<void> => {
  try {
    const user = await requireUser();
    await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        ingredients: data.ingredients,
        authorId: user?.id,
        authorName: user?.given_name ?? "",
        authorImage: user?.picture ?? "",
        category: data.category,
        preparationTime: data.preparationTime,
      },
    });
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

export const deletePost = async (id: string, userId: string): Promise<void> => {
  try {
    const seenPosts = await prisma.postSeen.findMany({
      where: { postId: id },
    });

    const favoritePosts = await prisma.favoritePost.findMany({
      where: { postId: id },
    });

    if (seenPosts?.length) {
      for (const post of seenPosts) {
        await prisma.postSeen.delete({
          where: { id: post.id },
        });
      }
    }

    if (favoritePosts?.length) {
      for (const favoritePost of favoritePosts) {
        await prisma.favoritePost.delete({
          where: { id: favoritePost.id },
        });
      }
    }

    await prisma.blogPost.delete({
      where: { id, authorId: userId },
    });
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
