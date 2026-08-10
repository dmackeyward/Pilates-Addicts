// src/routes/exercises/+page.server.ts
import { db } from '../../lib/db';
import { exercises } from '../../lib/db/schema';

export async function load() {
  const allExercises = await db.select().from(exercises);

  return {
    exercises: allExercises
  };
}