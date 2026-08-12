import { db } from '$lib/db';

export const load = async () => {
	const guidesList = await db.query.guides.findMany({
		with: {
			guideExercises: {
				with: { exercise: true }
			}
		}
	});

	return { guides: guidesList };
};