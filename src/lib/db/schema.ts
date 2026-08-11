import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// ==========================================
// 1. EXERCISES TABLE (Apparatus Specs Included)
// ==========================================
export const exercises = sqliteTable('exercises', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    setupInstructions: text('setup_instructions'),
    executionInstructions: text('execution_instructions'),
    springSettings: text('spring_settings'), // e.g., "1 Red, 1 Blue"
    footbarPosition: text('footbar_position'),
    gearBar: text('gear_bar'),
    stopperPosition: text('stopper_position'),
    headrestPosition: text('headrest_position')
});

// ==========================================
// 2. MUSCLES & JUNCTION
// ==========================================
export const muscles = sqliteTable('muscles', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),         // e.g., "Transversus Abdominis"
    bodyRegion: text('body_region').notNull() // e.g., "Core", "Lower Body"
});

export const exerciseMuscles = sqliteTable('exercise_muscles', {
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    muscleId: integer('muscle_id').notNull().references(() => muscles.id, { onDelete: 'cascade' }),
    targetType: text('target_type').notNull(), // 'Primary' or 'Secondary'
}, (t) => ({
    pk: primaryKey({ columns: [t.exerciseId, t.muscleId] })
}));

// ==========================================
// 3. CATEGORIES & JUNCTION
// ==========================================
export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description')
});

export const exerciseCategories = sqliteTable('exercise_categories', {
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' })
}, (t) => ({
    pk: primaryKey({ columns: [t.exerciseId, t.categoryId] })
}));

// ==========================================
// 4. PROPS & JUNCTION
// ==========================================
export const props = sqliteTable('props', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description')
});

export const exerciseProps = sqliteTable('exercise_props', {
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    propId: integer('prop_id').notNull().references(() => props.id, { onDelete: 'cascade' })
}, (t) => ({
    pk: primaryKey({ columns: [t.exerciseId, t.propId] })
}));

// ==========================================
// 5. CUES TABLE
// ==========================================
export const cues = sqliteTable('cues', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    category: text('category').notNull(), // 'Breath', 'Alignment', 'Form', 'Control'
    cueText: text('cue_text').notNull(),
});

// ==========================================
// 6. MODIFICATIONS & CONTRAINDICATIONS
// ==========================================
export const exerciseModifications = sqliteTable('exercise_modifications', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    modificationType: text('modification_type').notNull(), // 'Regression', 'Progression', 'Injury Modification'
    title: text('title').notNull(),
    description: text('description').notNull()
});

export const contraindications = sqliteTable('contraindications', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    condition: text('condition').notNull(), // e.g., 'Osteoporosis'
    notes: text('notes')
});

// ==========================================
// 7. LESSONS & JUNCTION
// ==========================================
export const lessons = sqliteTable('lessons', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    durationMinutes: integer('duration_minutes'),
    difficulty: text('difficulty'), // 'Beginner', 'Intermediate', 'Advanced'
});

export const lessonExercises = sqliteTable('lesson_exercises', {
    lessonId: integer('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
    exerciseId: integer('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
    sequenceOrder: integer('sequence_order').notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.lessonId, t.exerciseId] })
}));


// ==========================================
// DRIZZLE RELATIONS DEFINITIONS
// ==========================================

export const exercisesRelations = relations(exercises, ({ many }) => ({
    exerciseMuscles: many(exerciseMuscles),
    categories: many(exerciseCategories),
    props: many(exerciseProps),
    cues: many(cues),
    modifications: many(exerciseModifications),
    contraindications: many(contraindications),
    lessonExercises: many(lessonExercises),
}));

export const musclesRelations = relations(muscles, ({ many }) => ({
    exerciseMuscles: many(exerciseMuscles),
}));

export const exerciseMusclesRelations = relations(exerciseMuscles, ({ one }) => ({
    exercise: one(exercises, { fields: [exerciseMuscles.exerciseId], references: [exercises.id] }),
    muscle: one(muscles, { fields: [exerciseMuscles.muscleId], references: [muscles.id] }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
    exerciseCategories: many(exerciseCategories),
}));

export const exerciseCategoriesRelations = relations(exerciseCategories, ({ one }) => ({
    exercise: one(exercises, { fields: [exerciseCategories.exerciseId], references: [exercises.id] }),
    category: one(categories, { fields: [exerciseCategories.categoryId], references: [categories.id] }),
}));

export const propsRelations = relations(props, ({ many }) => ({
    exerciseProps: many(exerciseProps),
}));

export const exercisePropsRelations = relations(exerciseProps, ({ one }) => ({
    exercise: one(exercises, { fields: [exerciseProps.exerciseId], references: [exercises.id] }),
    prop: one(props, { fields: [exerciseProps.propId], references: [props.id] }),
}));

export const cuesRelations = relations(cues, ({ one }) => ({
    exercise: one(exercises, { fields: [cues.exerciseId], references: [exercises.id] }),
}));

export const exerciseModificationsRelations = relations(exerciseModifications, ({ one }) => ({
    exercise: one(exercises, { fields: [exerciseModifications.exerciseId], references: [exercises.id] }),
}));

export const contraindicationsRelations = relations(contraindications, ({ one }) => ({
    exercise: one(exercises, { fields: [contraindications.exerciseId], references: [exercises.id] }),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
    lessonExercises: many(lessonExercises),
}));

export const lessonExercisesRelations = relations(lessonExercises, ({ one }) => ({
    lesson: one(lessons, { fields: [lessonExercises.lessonId], references: [lessons.id] }),
    exercise: one(exercises, { fields: [lessonExercises.exerciseId], references: [exercises.id] }),
}));