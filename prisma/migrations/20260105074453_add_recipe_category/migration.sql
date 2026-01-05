/*
  Warnings:

  - Added the required column `category` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecipeCategory" AS ENUM ('VEGAN', 'BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT', 'QUICK_BITE');

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "category" "RecipeCategory" NOT NULL;
