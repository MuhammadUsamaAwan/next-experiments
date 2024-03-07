import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const todos = sqliteTable('todos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  text: text('text').notNull(),
});

export type Todo = typeof todos.$inferSelect;
