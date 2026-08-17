import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const lessonsList = await db.query.lessons.findMany({
    with: {
      lessonExercises: {
        with: {
          exercise: {
            with: {
              apparatusSettings: true,
            },
          },
        },
      },
    },
  });

  return { lessons: lessonsList };
};