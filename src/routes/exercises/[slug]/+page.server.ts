// src/routes/exercises/[slug]/+page.server.ts
import { db } from '$lib/db';
import { exercises } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const result = await db
    .select()
    .from(exercises)
    .where(eq(exercises.slug, slug));

  const exercise = result[0];

  if (!exercise) {
    error(404, 'Exercise not found');
  }

  return {
    exercise
  };
};