-- AlterTable
ALTER TABLE `User` ADD COLUMN `email_status` ENUM('not_verified', 'verified') NOT NULL DEFAULT 'not_verified';
