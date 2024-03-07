import { unstable_cache } from 'next/cache';
import { desc } from 'drizzle-orm';

import { db } from '~/db';
import { todos } from '~/db/schema';

export const getTodos = unstable_cache(
  async (page: number = 1, limit: number = 10) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return db.query.todos.findMany({
      limit,
      offset: (page - 1) * limit,
      orderBy: desc(todos.createdAt),
    });
  },
  ['todos'],
  {
    revalidate: 60,
    tags: ['todos'],
  }
);
