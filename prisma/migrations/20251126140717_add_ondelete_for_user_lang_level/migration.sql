-- DropForeignKey
ALTER TABLE `UserLangLevel` DROP FOREIGN KEY `UserLangLevel_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserLangLevel` ADD CONSTRAINT `UserLangLevel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
