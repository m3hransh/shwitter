/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_postedById_fkey";

-- DropForeignKey
ALTER TABLE "_Votes" DROP CONSTRAINT "_Votes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Votes" DROP CONSTRAINT "_Votes_B_fkey";

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "_Votes";

-- CreateTable
CREATE TABLE "Shweet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Shweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedShweet" (
    "shweetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikedShweet_pkey" PRIMARY KEY ("shweetId","userId")
);

-- AddForeignKey
ALTER TABLE "Shweet" ADD CONSTRAINT "Shweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedShweet" ADD CONSTRAINT "LikedShweet_shweetId_fkey" FOREIGN KEY ("shweetId") REFERENCES "Shweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedShweet" ADD CONSTRAINT "LikedShweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
