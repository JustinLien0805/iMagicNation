CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`nickname` varchar(191) NOT NULL,
	`createdAt` timestamp DEFAULT (now())
);
