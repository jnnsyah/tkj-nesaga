/*
  Warnings:

  - You are about to drop the column `actionIcon` on the `domains` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `domains` table. All the data in the column will be lost.
  - You are about to drop the column `levelVariant` on the `domains` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "domains" DROP COLUMN "actionIcon",
DROP COLUMN "isPublished",
DROP COLUMN "levelVariant";

-- AlterTable
ALTER TABLE "learning_levels" ADD COLUMN     "icon" TEXT NOT NULL DEFAULT 'default-icon';
