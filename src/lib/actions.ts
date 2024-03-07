'use server';

import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';

import { db } from '~/db';
import { todos } from '~/db/schema';

export async function addTodo() {
  await db.insert(todos).values({
    text: faker.lorem.sentence(),
  });
}

export async function toggleTodo(id: string, completed: boolean) {
  await db.update(todos).set({ completed }).where(eq(todos.id, id));
}

export async function deleteTodo(id: string) {
  await db.delete(todos).where(eq(todos.id, id));
}
