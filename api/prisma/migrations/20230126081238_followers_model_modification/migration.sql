/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followers" TEXT[],
ADD COLUMN     "following" TEXT[];

-- DropTable
DROP TABLE "Follower";
