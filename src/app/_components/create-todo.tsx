'use client';

import { addTodo } from '~/lib/actions';
import { Button } from '~/components/ui/button';

export default function CreateTodo() {
  return <Button onClick={() => addTodo()}>Add New</Button>;
}
