'use client';

// import { useTransition } from 'react';
import { useFormStatus } from 'react-dom';

import { addTodo } from '~/lib/actions';
import { Button } from '~/components/ui/button';

// export default function CreateTodo() {
//   const [pending, startTransition] = useTransition();

//   return (
//     <Button
//       disabled={pending}
//       onClick={() => startTransition(() => addTodo().catch(() => alert('Failed to create todo')))}
//     >
//       Add New
//     </Button>
//   );
// }

export default function CreateTodo() {
  return (
    <form action={addTodo}>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>Add New</Button>;
}
