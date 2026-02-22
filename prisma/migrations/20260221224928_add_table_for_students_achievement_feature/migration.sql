-- CreateTable
CREATE TABLE "achievement_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "achievement_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement_levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "achievement_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_achievements" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "achievement_categories_name_key" ON "achievement_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_levels_name_key" ON "achievement_levels"("name");

-- CreateIndex
CREATE INDEX "student_achievements_categoryId_idx" ON "student_achievements"("categoryId");

-- CreateIndex
CREATE INDEX "student_achievements_levelId_idx" ON "student_achievements"("levelId");

-- AddForeignKey
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "achievement_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_achievements" ADD CONSTRAINT "student_achievements_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "achievement_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
