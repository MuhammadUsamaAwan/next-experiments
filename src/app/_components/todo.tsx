'use client';

import { useOptimistic } from 'react';

import type { Todo as TodoType } from '~/db/schema';
import { deleteTodo, toggleTodo } from '~/lib/actions';
import { Checkbox } from '~/components/ui/checkbox';
import { Icons } from '~/components/icons';

export function Todo({ todo }: { todo: TodoType }) {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic<TodoType | null>(todo);

  async function handleToggle(checked: boolean) {
    if (optimisticTodo === null) return;
    setOptimisticTodo({ ...optimisticTodo, completed: checked });
    await toggleTodo(optimisticTodo.id, checked).catch(() => alert('Failed to toggle todo'));
  }

  async function handleDelete() {
    if (optimisticTodo === null) return;
    setOptimisticTodo(null);
    await deleteTodo(optimisticTodo.id).catch(() => alert('Failed to delete todo'));
  }

  if (optimisticTodo === null) return null;

  return (
    <div className='flex items-center gap-2'>
      <Checkbox checked={optimisticTodo.completed} id={optimisticTodo.id} onCheckedChange={handleToggle} />
      <label htmlFor={optimisticTodo.id}>{optimisticTodo.text}</label>
      <button className='text-destructive' onClick={handleDelete}>
        <Icons.trash />
      </button>
    </div>
  );
}
