-- AlterTable
ALTER TABLE "learning_paths" ADD COLUMN     "DomainId" TEXT;

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_slug_key" ON "Domain"("slug");

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
