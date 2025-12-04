/*
  Warnings:

  - You are about to drop the column `isSeen` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "isSeen";

-- CreateTable
CREATE TABLE "PostSeen" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostSeen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostSeen_postId_userId_key" ON "PostSeen"("postId", "userId");

-- AddForeignKey
ALTER TABLE "PostSeen" ADD CONSTRAINT "PostSeen_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
