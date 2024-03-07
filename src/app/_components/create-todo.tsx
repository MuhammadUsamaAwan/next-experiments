'use client';

import { useTransition } from 'react';

import { addTodo } from '~/lib/actions';
import { Button } from '~/components/ui/button';

export default function CreateTodo() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      disabled={pending}
      onClick={() => startTransition(() => addTodo().catch(() => alert('Failed to create todo')))}
    >
      Add New
    </Button>
  );
}
