import { db } from '$lib/db';
import { exercises } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const exercise = await db.query.exercises.findFirst({
      where: eq(exercises.slug, params.slug),
      with: {
        // Updated key names to match schema relations
        exerciseCategories: { with: { category: true } },
        exerciseProps: { with: { prop: true } },
        exerciseMuscles: { with: { muscle: true } },
        cues: true,
        modifications: true,
        contraindications: true
      }
    });

    if (!exercise) {
      throw error(404, `Exercise '${params.slug}' not found`);
    }

    return { exercise };
  } catch (err) {
    console.error('Error loading exercise page:', err);
    throw error(500, 'Failed to load exercise details');
  }
};