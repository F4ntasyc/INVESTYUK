-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,
    `role` ENUM('INVESTOR', 'DINAS', 'ADMIN') NOT NULL DEFAULT 'INVESTOR',
    `agencyId` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_agencyId_idx`(`agencyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `accounts_userId_idx`(`userId`),
    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameId` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sectors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `nameId` VARCHAR(191) NOT NULL,
    `nameEn` VARCHAR(191) NOT NULL,
    `descriptionId` TEXT NOT NULL,
    `descriptionEn` TEXT NOT NULL,
    `icon` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `agencyId` INTEGER NOT NULL,

    UNIQUE INDEX `sectors_slug_key`(`slug`),
    INDEX `sectors_agencyId_idx`(`agencyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `districts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `latitude` DECIMAL(9, 6) NOT NULL,
    `longitude` DECIMAL(9, 6) NOT NULL,

    UNIQUE INDEX `districts_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `titleId` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `summaryId` TEXT NOT NULL,
    `summaryEn` TEXT NOT NULL,
    `descriptionId` LONGTEXT NOT NULL,
    `descriptionEn` LONGTEXT NOT NULL,
    `sectorId` INTEGER NOT NULL,
    `districtId` INTEGER NOT NULL,
    `address` VARCHAR(191) NULL,
    `latitude` DECIMAL(9, 6) NOT NULL,
    `longitude` DECIMAL(9, 6) NOT NULL,
    `investmentValue` BIGINT NOT NULL,
    `estRoiPercent` DECIMAL(5, 2) NOT NULL,
    `paybackYears` DECIMAL(4, 1) NOT NULL,
    `landAreaHa` DECIMAL(10, 2) NULL,
    `jobsEstimate` INTEGER NULL,
    `coverImageUrl` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `publishedAt` DATETIME(3) NULL,
    `clusterId` INTEGER NULL,
    `embedding` JSON NULL,
    `embeddingModel` VARCHAR(191) NULL,
    `embeddingHash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `opportunities_slug_key`(`slug`),
    INDEX `opportunities_status_sectorId_idx`(`status`, `sectorId`),
    INDEX `opportunities_districtId_idx`(`districtId`),
    INDEX `opportunities_clusterId_idx`(`clusterId`),
    INDEX `opportunities_featured_status_idx`(`featured`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunity_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opportunityId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `altId` VARCHAR(191) NULL,
    `altEn` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `opportunity_images_opportunityId_idx`(`opportunityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opportunity_requirements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opportunityId` INTEGER NOT NULL,
    `textId` TEXT NOT NULL,
    `textEn` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `opportunity_requirements_opportunityId_idx`(`opportunityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cluster_runs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `k` INTEGER NOT NULL,
    `features` JSON NOT NULL,
    `normalization` JSON NOT NULL,
    `inertia` DECIMAL(14, 4) NULL,
    `silhouette` DECIMAL(6, 4) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `cluster_runs_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clusters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `runId` INTEGER NOT NULL,
    `index` INTEGER NOT NULL,
    `labelId` VARCHAR(191) NOT NULL,
    `labelEn` VARCHAR(191) NOT NULL,
    `descriptionId` TEXT NULL,
    `descriptionEn` TEXT NULL,
    `centroid` JSON NOT NULL,
    `color` VARCHAR(191) NULL,

    UNIQUE INDEX `clusters_runId_index_key`(`runId`, `index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `search_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `queryText` VARCHAR(500) NOT NULL,
    `parsedFilters` JSON NULL,
    `resultCount` INTEGER NOT NULL,
    `method` VARCHAR(20) NOT NULL,
    `locale` VARCHAR(5) NOT NULL DEFAULT 'id',
    `durationMs` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `search_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedure_steps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepOrder` INTEGER NOT NULL,
    `titleId` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `contentId` TEXT NOT NULL,
    `contentEn` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faqs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` VARCHAR(191) NOT NULL,
    `questionEn` VARCHAR(191) NOT NULL,
    `answerId` TEXT NOT NULL,
    `answerEn` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `titleId` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `excerptId` TEXT NULL,
    `excerptEn` TEXT NULL,
    `contentId` LONGTEXT NOT NULL,
    `contentEn` LONGTEXT NOT NULL,
    `category` VARCHAR(191) NULL,
    `coverImageUrl` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `authorId` VARCHAR(191) NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_slug_key`(`slug`),
    INDEX `articles_status_publishedAt_idx`(`status`, `publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trackingCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `organization` VARCHAR(191) NULL,
    `message` TEXT NOT NULL,
    `opportunityId` INTEGER NULL,
    `userId` VARCHAR(191) NULL,
    `assignedAgencyId` INTEGER NULL,
    `status` ENUM('NEW', 'IN_PROGRESS', 'REPLIED', 'DONE') NOT NULL DEFAULT 'NEW',
    `locale` VARCHAR(5) NOT NULL DEFAULT 'id',
    `consentAt` DATETIME(3) NOT NULL,
    `consentVersion` VARCHAR(191) NOT NULL,
    `anonymizedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `closedAt` DATETIME(3) NULL,

    UNIQUE INDEX `inquiries_trackingCode_key`(`trackingCode`),
    INDEX `inquiries_email_idx`(`email`),
    INDEX `inquiries_status_assignedAgencyId_idx`(`status`, `assignedAgencyId`),
    INDEX `inquiries_opportunityId_idx`(`opportunityId`),
    INDEX `inquiries_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inquiryId` INTEGER NOT NULL,
    `type` ENUM('CREATED', 'STATUS_CHANGED', 'ASSIGNED', 'REPLIED', 'NOTE') NOT NULL,
    `fromStatus` ENUM('NEW', 'IN_PROGRESS', 'REPLIED', 'DONE') NULL,
    `toStatus` ENUM('NEW', 'IN_PROGRESS', 'REPLIED', 'DONE') NULL,
    `message` TEXT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `actorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `inquiry_events_inquiryId_createdAt_idx`(`inquiryId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saved_opportunities` (
    `userId` VARCHAR(191) NOT NULL,
    `opportunityId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `opportunityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actorId` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `ipHash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `audit_logs_actorId_createdAt_idx`(`actorId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deletion_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `trackingCode` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'DONE', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `processedAt` DATETIME(3) NULL,
    `processedBy` VARCHAR(191) NULL,

    INDEX `deletion_requests_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `agencies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sectors` ADD CONSTRAINT `sectors_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `agencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunities` ADD CONSTRAINT `opportunities_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sectors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunities` ADD CONSTRAINT `opportunities_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunities` ADD CONSTRAINT `opportunities_clusterId_fkey` FOREIGN KEY (`clusterId`) REFERENCES `clusters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunity_images` ADD CONSTRAINT `opportunity_images_opportunityId_fkey` FOREIGN KEY (`opportunityId`) REFERENCES `opportunities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opportunity_requirements` ADD CONSTRAINT `opportunity_requirements_opportunityId_fkey` FOREIGN KEY (`opportunityId`) REFERENCES `opportunities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cluster_runs` ADD CONSTRAINT `cluster_runs_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clusters` ADD CONSTRAINT `clusters_runId_fkey` FOREIGN KEY (`runId`) REFERENCES `cluster_runs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_opportunityId_fkey` FOREIGN KEY (`opportunityId`) REFERENCES `opportunities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_assignedAgencyId_fkey` FOREIGN KEY (`assignedAgencyId`) REFERENCES `agencies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_events` ADD CONSTRAINT `inquiry_events_inquiryId_fkey` FOREIGN KEY (`inquiryId`) REFERENCES `inquiries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_events` ADD CONSTRAINT `inquiry_events_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saved_opportunities` ADD CONSTRAINT `saved_opportunities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saved_opportunities` ADD CONSTRAINT `saved_opportunities_opportunityId_fkey` FOREIGN KEY (`opportunityId`) REFERENCES `opportunities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
