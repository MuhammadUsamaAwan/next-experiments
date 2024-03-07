import { Checkbox } from '~/components/ui/checkbox';
import { db } from '~/db';
import { Todo, todos } from '~/db/schema';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import { Button } from '~/components/ui/button';
import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';

export async function getTodos(page = 1, limit = 10) {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return db.query.todos.findMany({
    limit,
    offset: (page - 1) * limit,
  });
}

export async function addTodo() {
  "use server"
  await db.insert(todos).values({
    text: faker.lorem.sentence(),
  })
}

export async function completeTodo(id: string) {
  "use server"
  await db.update(todos).set({ completed: true }).where(eq(todos.id, id));
}

export async function deleteTodo(id: string) {
  "use server"
  await db.delete(todos).where(eq(todos.id, id));
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
      <Checkbox defaultChecked={todo.completed} id={todo.id} />
      <label htmlFor={todo.id}>{todo.text}</label>
    </div>
  );
}
