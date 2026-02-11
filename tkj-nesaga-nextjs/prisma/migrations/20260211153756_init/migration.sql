-- CreateEnum
CREATE TYPE "LearningLevel" AS ENUM ('Foundation', 'Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('current', 'available', 'locked');

-- CreateEnum
CREATE TYPE "PartnerCategoryType" AS ENUM ('ISP', 'Retail', 'Service', 'Instansi');

-- CreateEnum
CREATE TYPE "TimelineSize" AS ENUM ('normal', 'large');

-- CreateEnum
CREATE TYPE "ResourceColor" AS ENUM ('red', 'blue', 'green', 'orange');

-- CreateTable
CREATE TABLE "learning_paths" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "LearningLevel" NOT NULL,
    "levelVariant" TEXT NOT NULL,
    "actionIcon" TEXT,
    "topics" TEXT[],
    "prerequisites" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_steps" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "StepStatus" NOT NULL,
    "mediaType" TEXT,
    "order" INTEGER NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "learning_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_step_actions" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "to" TEXT,
    "learningStepId" INTEGER NOT NULL,

    CONSTRAINT "learning_step_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_recommendations" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "color" "ResourceColor" NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "learning_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_resources" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "color" "ResourceColor" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "external_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "downloadable_documents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "downloadable_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequently_asked_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "defaultOpen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "frequently_asked_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internship_timelines" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" "TimelineSize" NOT NULL DEFAULT 'normal',
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internship_timelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internship_stats" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "internship_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_categories" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PartnerCategoryType" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "shortDesc" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_reviews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "partnerCompanyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_features" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "program_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_highlights" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "curriculum_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "learning_paths_slug_key" ON "learning_paths"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "partner_categories_title_key" ON "partner_categories"("title");

-- AddForeignKey
ALTER TABLE "learning_steps" ADD CONSTRAINT "learning_steps_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_step_actions" ADD CONSTRAINT "learning_step_actions_learningStepId_fkey" FOREIGN KEY ("learningStepId") REFERENCES "learning_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_recommendations" ADD CONSTRAINT "learning_recommendations_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_partnerCompanyId_fkey" FOREIGN KEY ("partnerCompanyId") REFERENCES "partner_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
