import { db } from '~/db';

export async function getTodos(page = 1, limit = 10) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return db.query.todos.findMany({
    limit,
    offset: (page - 1) * limit,
  });
}
