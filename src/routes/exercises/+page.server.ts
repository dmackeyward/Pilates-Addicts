// src/routes/exercises/+page.server.ts
import { db } from '$lib/db';
import { exercises } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const allExercises = await db.select().from(exercises);

  return {
    exercises: allExercises
  };
};