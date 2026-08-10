import { db } from '../../../lib/db'; // fallback relative import if alias acts up
import { exercises } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    const exercise = await db.query.exercises.findFirst({
        where: eq(exercises.slug, slug),
        with: {
            exerciseMuscles: {
                with: {
                    muscle: true
                }
            },
            cues: true
        }
    });

    if (!exercise) {
        throw error(404, 'Exercise not found');
    }

    return {
        exercise
    };
};