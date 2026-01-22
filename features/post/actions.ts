"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/prisma/seed";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { deleteImage } from "../cloudinary/actions";
import { revalidatePath } from "next/cache";
import { Post } from "@/types";
import { RATING } from "@/lib/constants";
import { PostFormSchema } from "@/lib/validations";

export const updatePost = async (
  id: string,
  post: PostFormSchema,
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

export const createPost = async (data: PostFormSchema): Promise<void> => {
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
        calories: data.calories,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (post: Post): Promise<void> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  try {
    if (post.imageUrl) {
      await deleteImage(post.imageUrl);
    }

    await prisma.$transaction(async (tx) => {
      await Promise.all([
        tx.postSeen.deleteMany({ where: { postId: post.id } }),
        tx.favoritePost.deleteMany({ where: { postId: post.id } }),
        tx.comment.deleteMany({ where: { postId: post.id } }),
        tx.rating.deleteMany({ where: { postId: post.id } }),
      ]);

      await tx.blogPost.delete({
        where: {
          id: post.id,
          authorId: user.id,
        },
      });
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

export async function ratePost(postId: string, value: number) {
  try {
    if (value < RATING.MIN || value > RATING.MAX) {
      throw new Error("Invalid rating");
    }

    const user = await requireUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    await prisma.rating.upsert({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
      update: { value },
      create: {
        value,
        userId: user.id,
        postId,
      },
    });

    const updatedRatings = await prisma.rating.findMany({
      where: {
        postId,
      },
    });

    const postRatingCount = await prisma.rating.count({
      where: {
        postId,
      },
    });

    const totalRatings = updatedRatings.reduce((sum, r) => sum + r.value, 0);
    const avgRating = postRatingCount
      ? Math.round(totalRatings / postRatingCount)
      : 0;

    await prisma.blogPost.update({
      where: {
        id: postId,
      },
      data: { avgRating },
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
}
