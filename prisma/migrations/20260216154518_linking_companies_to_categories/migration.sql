/*
  Warnings:

  - You are about to drop the column `initial` on the `company_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `company_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `company_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `partner_companies` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `partner_companies` table. All the data in the column will be lost.
  - You are about to drop the column `shortDesc` on the `partner_companies` table. All the data in the column will be lost.
  - Added the required column `academicYear` to the `company_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_reviews" DROP COLUMN "initial",
DROP COLUMN "rating",
DROP COLUMN "role",
ADD COLUMN     "academicYear" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "learning_paths" ADD COLUMN     "DomainId" TEXT;

-- AlterTable
ALTER TABLE "partner_companies" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "shortDesc",
ADD COLUMN     "mapsUrl" TEXT;

-- DropEnum
DROP TYPE "PartnerCategoryType";

-- CreateTable
CREATE TABLE "domains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PartnerCategoryToPartnerCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PartnerCategoryToPartnerCompany_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "domains_slug_key" ON "domains"("slug");

-- CreateIndex
CREATE INDEX "_PartnerCategoryToPartnerCompany_B_index" ON "_PartnerCategoryToPartnerCompany"("B");

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerCategoryToPartnerCompany" ADD CONSTRAINT "_PartnerCategoryToPartnerCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "partner_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerCategoryToPartnerCompany" ADD CONSTRAINT "_PartnerCategoryToPartnerCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "partner_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
