// src/routes/search/+page.server.ts
import { db } from '../../lib/db';
import { exercises } from '../../lib/db/schema';
import { like, or } from 'drizzle-orm';
import type { PageServerLoad } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
  const query = url.searchParams.get('q') || '';

  let searchResults = [];

  if (query.trim() !== '') {
    // Search across name, title, and description
    searchResults = await db
      .select()
      .from(exercises)
      .where(
        or(
          like(exercises.name, `%${query}%`),
          like(exercises.description, `%${query}%`)
        )
      );
  }

  return {
    query,
    searchResults
  };
};