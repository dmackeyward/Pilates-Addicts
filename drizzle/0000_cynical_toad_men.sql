CREATE TABLE `cues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`category` text NOT NULL,
	`cue_text` text NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercise_muscles` (
	`exercise_id` integer NOT NULL,
	`muscle_id` integer NOT NULL,
	`target_type` text NOT NULL,
	PRIMARY KEY(`exercise_id`, `muscle_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`setup_instructions` text,
	`execution_instructions` text,
	`spring_settings` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `exercises_slug_unique` ON `exercises` (`slug`);--> statement-breakpoint
CREATE TABLE `lesson_exercises` (
	`lesson_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`sequence_order` integer NOT NULL,
	PRIMARY KEY(`lesson_id`, `exercise_id`),
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`duration_minutes` integer,
	`difficulty` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lessons_slug_unique` ON `lessons` (`slug`);--> statement-breakpoint
CREATE TABLE `muscles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`body_region` text NOT NULL
);
