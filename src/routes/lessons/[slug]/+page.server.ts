import { db } from '$lib/db';
import { lessons } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const lesson = await db.query.lessons.findFirst({
        where: eq(lessons.slug, params.slug),
        with: {
            lessonExercises: {
                orderBy: (le, { asc }) => [asc(le.sequenceOrder)],
                with: {
                    exercise: {
                        with: {
                            apparatusSettings: true,
                            cues: true,
                            contraindications: true,
                        }
                    }
                }
            }
        }
    });

    if (!lesson) {
        throw error(404, 'Lesson plan not found');
    }

    return { lesson };
};