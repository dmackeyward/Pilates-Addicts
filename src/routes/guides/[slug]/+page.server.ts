import { db } from '$lib/db';
import { guides } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const guide = await db.query.guides.findFirst({
		where: eq(guides.slug, params.slug),
		with: {
			guideExercises: {
				orderBy: (ge, { asc }) => [asc(ge.sequenceOrder)],
				with: {
					exercise: true
				}
			}
		}
	});

	if (!guide) {
		throw error(404, 'Guide not found');
	}

	return { guide };
};