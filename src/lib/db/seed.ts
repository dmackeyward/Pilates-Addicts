// src/lib/db/seed.ts
import { db } from './index.js';
import { exercises } from './schema.js';

async function seed() {
  console.log('Seeding database with initial reformer repertoire...');

  const initialExercises = [
    {
      name: 'Footwork: Parallel V-Plie',
      title: 'Footwork: Parallel V-Plie',
      slug: 'footwork-parallel-v-plie',
      category: 'Reformer',
      description: 'Foundational warm-up focusing on alignment, lower extremity tracking, and core stability against spring tension.'
    },
    {
      name: 'The Hundred',
      title: 'The Hundred',
      slug: 'the-hundred',
      category: 'Reformer',
      description: 'Classic abdominal endurance and breath coordination exercise performed on the carriage with straps.'
    },
    {
      name: 'Elephant',
      title: 'The Hundred', // (or Elephant)
      slug: 'elephant',
      category: 'Reformer',
      description: 'Full-body integration and articulation exercise targeting shoulder stability, hamstring length, and core control.'
    },
    {
      name: 'Short Box Series: Round Back',
      title: 'Short Box Series: Round Back',
      slug: 'short-box-round-back',
      category: 'Reformer',
      description: 'Articulating spinal flexion exercise over the short box, focusing on deep abdominal wall engagement.'
    }
  ];

  for (const ex of initialExercises) {
    await db.insert(exercises).values(ex).onConflictDoNothing();
  }

  console.log('Database seeding complete!');
}

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});