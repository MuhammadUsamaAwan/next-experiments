import { getTodos } from '~/lib/fetchers';
import { Button } from '~/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';

import { Todo } from './todo';

type TodoListProps = {
  page: number;
  limit: number;
};

export async function TodoList({ page, limit }: TodoListProps) {
  const todos = await getTodos(page, limit);

  return (
    <main className='container py-20'>
      <div className='flex items-center justify-between'>
        <h1 className='mb-6 text-3xl font-semibold'>Todo List</h1>
        <Button>Add New</Button>
      </div>
      <div className='mb-6 space-y-4'>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
      <Pagination className='justify-start'>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${page - 1}`} />
            </PaginationItem>
          )}
          {page < 50 && (
            <PaginationItem>
              <PaginationNext href={`/?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
}
