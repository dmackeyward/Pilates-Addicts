import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const allExercises = await db.query.exercises.findMany({
    with: {
      apparatusSettings: true,
    },
  });

  return {
    exercises: allExercises,
  };
};