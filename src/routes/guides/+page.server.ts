import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const guidesList = await db.query.guides.findMany({
    with: {
      guideExercises: {
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

  return { guides: guidesList };
};