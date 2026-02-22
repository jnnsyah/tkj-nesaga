-- CreateTable
CREATE TABLE "learning_levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "learning_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "resource_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "levelVariant" TEXT NOT NULL,
    "actionIcon" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_paths" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "levelId" INTEGER NOT NULL,
    "domainId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_path_topics" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "learning_path_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_path_prerequisites" (
    "id" SERIAL NOT NULL,
    "prerequisite" TEXT NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "learning_path_prerequisites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_steps" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaType" TEXT,
    "order" INTEGER NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "learning_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_step_actions" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "to" TEXT,
    "categoryId" INTEGER NOT NULL,
    "learningStepId" INTEGER NOT NULL,

    CONSTRAINT "learning_step_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_recommendations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "learning_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_resources" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "domainId" TEXT,
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
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "mapsUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_company_categories" (
    "companyId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "partner_company_categories_pkey" PRIMARY KEY ("companyId","categoryId")
);

-- CreateTable
CREATE TABLE "company_reviews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "learning_levels_name_key" ON "learning_levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "resource_categories_name_key" ON "resource_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "domains_slug_key" ON "domains"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "learning_paths_slug_key" ON "learning_paths"("slug");

-- CreateIndex
CREATE INDEX "learning_paths_domainId_idx" ON "learning_paths"("domainId");

-- CreateIndex
CREATE INDEX "learning_paths_levelId_idx" ON "learning_paths"("levelId");

-- CreateIndex
CREATE INDEX "learning_path_topics_learningPathId_idx" ON "learning_path_topics"("learningPathId");

-- CreateIndex
CREATE INDEX "learning_path_prerequisites_learningPathId_idx" ON "learning_path_prerequisites"("learningPathId");

-- CreateIndex
CREATE INDEX "learning_steps_learningPathId_idx" ON "learning_steps"("learningPathId");

-- CreateIndex
CREATE INDEX "learning_step_actions_learningStepId_idx" ON "learning_step_actions"("learningStepId");

-- CreateIndex
CREATE INDEX "learning_step_actions_categoryId_idx" ON "learning_step_actions"("categoryId");

-- CreateIndex
CREATE INDEX "learning_recommendations_learningPathId_idx" ON "learning_recommendations"("learningPathId");

-- CreateIndex
CREATE INDEX "learning_recommendations_categoryId_idx" ON "learning_recommendations"("categoryId");

-- CreateIndex
CREATE INDEX "external_resources_categoryId_idx" ON "external_resources"("categoryId");

-- CreateIndex
CREATE INDEX "external_resources_domainId_idx" ON "external_resources"("domainId");

-- CreateIndex
CREATE UNIQUE INDEX "partner_categories_title_key" ON "partner_categories"("title");

-- CreateIndex
CREATE INDEX "company_reviews_partnerCompanyId_idx" ON "company_reviews"("partnerCompanyId");

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_paths" ADD CONSTRAINT "learning_paths_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "learning_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_path_topics" ADD CONSTRAINT "learning_path_topics_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_path_prerequisites" ADD CONSTRAINT "learning_path_prerequisites_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_steps" ADD CONSTRAINT "learning_steps_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_step_actions" ADD CONSTRAINT "learning_step_actions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "resource_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_step_actions" ADD CONSTRAINT "learning_step_actions_learningStepId_fkey" FOREIGN KEY ("learningStepId") REFERENCES "learning_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_recommendations" ADD CONSTRAINT "learning_recommendations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "resource_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_recommendations" ADD CONSTRAINT "learning_recommendations_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "learning_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_resources" ADD CONSTRAINT "external_resources_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "resource_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_resources" ADD CONSTRAINT "external_resources_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_company_categories" ADD CONSTRAINT "partner_company_categories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "partner_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_company_categories" ADD CONSTRAINT "partner_company_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "partner_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_partnerCompanyId_fkey" FOREIGN KEY ("partnerCompanyId") REFERENCES "partner_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
