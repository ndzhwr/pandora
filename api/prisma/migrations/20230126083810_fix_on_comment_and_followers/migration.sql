/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_userId_fkey";

-- DropForeignKey
ALTER TABLE "_followers" DROP CONSTRAINT "_followers_A_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "shareCount" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "Follow";

-- CreateTable
CREATE TABLE "Followers" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Followers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Followers_userId_key" ON "Followers"("userId");

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followers" ADD CONSTRAINT "_followers_A_fkey" FOREIGN KEY ("A") REFERENCES "Followers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
