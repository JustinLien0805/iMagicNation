CREATE TABLE `messages` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`input` text,
	`reply` text,
	`imageSrc` text,
	`createdAt` timestamp DEFAULT (now()),
	`storyId` varchar(191),
	`authorId` varchar(191)
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(191) NOT NULL,
	`type` varchar(191) DEFAULT '我的故事',
	`authorId` varchar(191),
	`initDialog` varchar(191),
	`initImage` text
);
--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `createdAt` TO `timestamp`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `userId` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `timestamp` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `nickname`;