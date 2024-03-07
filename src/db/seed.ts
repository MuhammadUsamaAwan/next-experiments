import { faker } from '@faker-js/faker';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { todos } from '~/db/schema';

export async function main() {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);
  await Promise.all(
    Array.from({ length: 500 }, async () => {
      await db.insert(todos).values({
        completed: Math.random() > 0.5,
        text: faker.lorem.sentence(),
      });
    })
  );
}

main()
  .then(() => {
    console.log('Seed complete');
    process.exit(0);
  })
  .catch(err => {
    console.error(`Seed failed: ${err}`);
    process.exit(1);
  });
