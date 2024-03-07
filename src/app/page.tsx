import { Checkbox } from '~/components/ui/checkbox';
import { db } from '~/db';
import { Todo } from '~/db/schema';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"

export async function getTodos(page = 1, limit = 10) {
  return db.query.todos.findMany({
    limit,
    offset: (page - 1) * limit,
  });
}

type HomePageProps = {
  searchParams: {
    page: string | string[] | undefined;
  }
}

export default async function HomePage({ searchParams: { page } }: HomePageProps) {
  const parsedPage = typeof page === 'string' ? Number(page) : 1;
  const todos = await getTodos(parsedPage);

  return (
    <main className='container py-20'>
      <h1 className='mb-6 text-3xl font-semibold'>Todo List</h1>
      <div className='mb-6 space-y-4'>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
      <Pagination className='justify-start'>
        <PaginationContent>
          {parsedPage > 1 &&
          <PaginationItem>
            <PaginationPrevious href={`/?page=${parsedPage-1}`} />
          </PaginationItem>
          }
          {parsedPage < 50 && 
          <PaginationItem>
            <PaginationNext href={`/?page=${parsedPage+1}`} />
          </PaginationItem>
          }
        </PaginationContent>
      </Pagination>
    </main>
  );
}

function Todo({ todo }: { todo: Todo }) {
  return (
    <div className='flex items-center gap-2'>
      <Checkbox checked={todo.completed} />
      <div>{todo.text}</div>
    </div>
  );
}
