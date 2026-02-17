/*
  Warnings:

  - You are about to drop the `Domain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "learning_paths" DROP CONSTRAINT "learning_paths_DomainId_fkey";

-- DropTable
DROP TABLE "Domain";

-- CreateTable
CREATE TABLE "domains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domains_slug_key" ON "domains"("slug");

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
