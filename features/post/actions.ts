"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PostFormData } from "@/components/rhf/PostForm";
import { BlogPostWhereInput } from "@/lib/generated/prisma/models";
import { notFound } from "next/navigation";
import { FilterTypes, Post } from "@/app/types";
import { deleteImage } from "../cloudinary/actions";
import { revalidatePath } from "next/cache";

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
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
        },
      },
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
        authorId: user?.id ?? "",
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

    return prisma.blogPost.findMany({
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

export const deletePost = async (post: Post): Promise<void> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  try {
    const seenPosts = await prisma.postSeen.findMany({
      where: { postId: post.id },
    });

    const favoritePosts = await prisma.favoritePost.findMany({
      where: { postId: post.id },
    });

    const commentPosts = await prisma.comment.findMany({
      where: { postId: post.id },
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

    if (commentPosts?.length) {
      for (const commentPost of commentPosts) {
        await prisma.comment.delete({
          where: { id: commentPost.id },
        });
      }
    }
    if (post.imageUrl) {
      await deleteImage(post.imageUrl);
    }

    await prisma.blogPost.delete({
      where: { id: post.id, authorId: user?.id },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const markPostAsSeen = async (postId: string) => {
  try {
    const user = await requireUser();
    if (user) {
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
    }
  } catch (error) {
    console.error("Error marking post as seen:", error);
    throw error;
  }
};

export const markPostAsFavorite = async (postId: string) => {
  try {
    const user = await requireUser();
    if (user) {
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
    }
  } catch (error) {
    console.error("Error marking post as favorite:", error);
    throw error;
  }
};

export const unmarkPostAsFavorite = async (postId: string) => {
  try {
    const user = await requireUser();
    if (user) {
      await prisma.favoritePost.deleteMany({
        where: { postId, userId: user.id },
      });
    }
  } catch (error) {
    console.error("Error unmarking post as favorite:", error);
    throw error;
  }
};

export const createComment = async (postId: string, comment: string) => {
  try {
    const user = await requireUser();
    await prisma.comment.create({
      data: {
        content: comment,
        authorId: user?.id ?? "",
        authorName: user?.given_name ?? "",
        authorImage: user?.picture ?? "",
        postId,
      },
    });
    revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string, postId: string) => {
  try {
    const user = await requireUser();
    await prisma.comment.delete({
      where: { id: commentId, authorId: user?.id },
    });
    revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
