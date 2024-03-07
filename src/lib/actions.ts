'use server';

import { revalidateTag } from 'next/cache';
import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';

import { db } from '~/db';
import { todos } from '~/db/schema';

export async function addTodo() {
  if (Math.random() > 0.5) {
    throw new Error('Failed to add todo');
  }
  await db.insert(todos).values({
    text: faker.lorem.sentence(),
  });
  revalidateTag('todos');
}

export async function toggleTodo(id: string, completed: boolean) {
  if (Math.random() > 0.5) {
    throw new Error('Failed to toggle todo');
  }
  await db.update(todos).set({ completed }).where(eq(todos.id, id));
  revalidateTag('todos');
}

export async function deleteTodo(id: string) {
  if (Math.random() > 0.5) {
    throw new Error('Failed to delete todo');
  }
  await db.delete(todos).where(eq(todos.id, id));
  revalidateTag('todos');
}
