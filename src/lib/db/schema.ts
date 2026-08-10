import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// 1. Exercises Table
export const exercises = sqliteTable('exercises', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    setupInstructions: text('setup_instructions'),
    executionInstructions: text('execution_instructions'),
    springSettings: text('spring_settings'), // e.g., "1 Red, 1 Blue"
});

// 2. Muscles Table
export const muscles = sqliteTable('muscles', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),         // e.g., "Transversus Abdominis"
    bodyRegion: text('body_region').notNull() // e.g., "Core", "Lower Body"
});

// 3. Exercise <-> Muscles Junction Table (Many-to-Many)
export const exerciseMuscles = sqliteTable('exercise_muscles', {
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    muscleId: integer('muscle_id').notNull().references(() => muscles.id, { onDelete: 'cascade' }),
    targetType: text('target_type').notNull(), // 'primary' or 'secondary'
}, (t) => ({
    pk: primaryKey({ columns: [t.exerciseId, t.muscleId] })
}));

// 4. Cues Table (One-to-Many with Exercises)
export const cues = sqliteTable('cues', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    category: text('category').notNull(), // 'Breath', 'Alignment', 'Imagery'
    cueText: text('cue_text').notNull(),
});

// 5. Lessons Table
export const lessons = sqliteTable('lessons', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    durationMinutes: integer('duration_minutes'),
    difficulty: text('difficulty'), // 'Beginner', 'Intermediate', 'Advanced'
});

// 6. Lesson <-> Exercises Junction Table (Ordered sequence)
export const lessonExercises = sqliteTable('lesson_exercises', {
    lessonId: integer('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    sequenceOrder: integer('sequence_order').notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.lessonId, t.exerciseId] })
}));

// --- Drizzle Relations Definitions ---
export const exercisesRelations = relations(exercises, ({ many }) => ({
    exerciseMuscles: many(exerciseMuscles),
    cues: many(cues),
    lessonExercises: many(lessonExercises),
}));

export const musclesRelations = relations(muscles, ({ many }) => ({
    exerciseMuscles: many(exerciseMuscles),
}));

export const exerciseMusclesRelations = relations(exerciseMuscles, ({ one }) => ({
    exercise: one(exercises, { fields: [exerciseMuscles.exerciseId], references: [exercises.id] }),
    muscle: one(muscles, { fields: [exerciseMuscles.muscleId], references: [muscles.id] }),
}));

export const cuesRelations = relations(cues, ({ one }) => ({
    exercise: one(exercises, { fields: [cues.exerciseId], references: [exercises.id] }),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
    lessonExercises: many(lessonExercises),
}));

export const lessonExercisesRelations = relations(lessonExercises, ({ one }) => ({
    lesson: one(lessons, { fields: [lessonExercises.lessonId], references: [lessons.id] }),
    exercise: one(exercises, { fields: [lessonExercises.exerciseId], references: [exercises.id] }),
}));