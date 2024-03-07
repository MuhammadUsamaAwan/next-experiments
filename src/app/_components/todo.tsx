'use client';

import type { Todo as TodoType } from '~/db/schema';
import { deleteTodo, toggleTodo } from '~/lib/actions';
import { Checkbox } from '~/components/ui/checkbox';
import { Icons } from '~/components/icons';

export function Todo({ todo }: { todo: TodoType }) {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        defaultChecked={todo.completed}
        id={todo.id}
        onCheckedChange={checked => toggleTodo(todo.id, checked as boolean)}
      />
      <label htmlFor={todo.id}>{todo.text}</label>
      <button className='text-destructive' onClick={() => deleteTodo(todo.id)}>
        <Icons.trash />
      </button>
    </div>
  );
}
