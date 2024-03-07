import { Suspense } from 'react';

import { TodoList } from './_components/todo-list';
import { TodoListSkeleton } from './_components/todo-list-skeleton';

type HomePageProps = {
  searchParams: {
    page: string | string[] | undefined;
    limit: string | string[] | undefined;
  };
};

export default function HomePage({ searchParams: { page, limit } }: HomePageProps) {
  const parsedPage = typeof page === 'string' ? Number(page) : 1;
  const parsedLimit = typeof limit === 'string' ? Number(limit) : 10;

  return (
    <Suspense key={`${parsedPage}_${parsedLimit}`} fallback={<TodoListSkeleton />}>
      <TodoList page={parsedPage} limit={parsedLimit} />;
    </Suspense>
  );
}
