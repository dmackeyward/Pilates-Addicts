import { db } from '$lib/db';

export const load = async () => {
	const lessonsList = await db.query.lessons.findMany({
		with: {
			lessonExercises: {
				with: { exercise: true }
			}
		}
	});

	return { lessons: lessonsList };
};