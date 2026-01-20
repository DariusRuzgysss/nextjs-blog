"use server";
import { prisma } from "@/prisma/seed";
import { FilterTypes, Post } from "@/types";

import { BlogPostWhereInput } from "../generated/prisma/models";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { calculatePostRating } from "../helper";
import { PREPARATION_TIME } from "../constants";

export const getPosts = async ({
  sortBy,
  page,
  pageSize,
  searchQuery,
  category: selectedCategory,
  preparationTime,
}: FilterTypes): Promise<{ items: Post[]; totalPages: number }> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isAuthor = user ? { where: { userId: user.id } } : false;
    const where: BlogPostWhereInput | undefined = (() => {
      const filters: BlogPostWhereInput = {};
      if (searchQuery) {
        filters.OR = [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
        ];
      }

      if (sortBy === "favorites" && user) {
        filters.favoritePosts = {
          some: {
            userId: user.id,
          },
        };
      }

      if (selectedCategory !== "all") {
        filters.category = selectedCategory;
      }

      if (
        preparationTime &&
        (preparationTime[0] > PREPARATION_TIME.MIN ||
          preparationTime[1] < PREPARATION_TIME.MAX)
      ) {
        filters.preparationTime = {
          ...(preparationTime[0] > PREPARATION_TIME.MIN && {
            gte: preparationTime[0],
          }),
          ...(preparationTime[1] < PREPARATION_TIME.MAX && {
            lte: preparationTime[1],
          }),
        };
      }

      return Object.keys(filters).length ? filters : undefined;
    })();

    const [items, itemsCount] = await Promise.all([
      prisma.blogPost.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          postSeens: isAuthor,
          favoritePosts: isAuthor,
          ratings: true,
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

    const itemsWithRating = items.map((post) => {
      const avg = calculatePostRating(post);

      return {
        ...post,
        avgRating: avg,
        totalRating: post.ratings.length,
      };
    });

    return {
      items: itemsWithRating,
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
        ratings: true,
      },
      where: {
        id,
      },
    });

    if (!data) {
      return notFound();
    }

    const avg = calculatePostRating(data);

    return {
      ...data,
      avgRating: avg,
      totalRating: data.ratings.length,
    };
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await prisma.blogPost.findMany({
      where: {
        authorId: userId,
      },
      include: {
        favoritePosts: user ? { where: { userId: user.id } } : false,
        ratings: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const dataWithRating = data.map((post) => {
      const avg = calculatePostRating(post);
      return {
        ...post,
        avgRating: avg,
        totalRating: post.ratings.length,
      };
    });

    return dataWithRating;
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    throw error;
  }
};
