import { Skeleton } from '~/components/ui/skeleton';

export function TodoListSkeleton() {
  return (
    <main className='container py-20'>
      <h1 className='mb-6 text-3xl font-semibold'>Todo List</h1>
      <div className='space-y-4'>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className='h-6 w-1/2' />
        ))}
      </div>
    </main>
  );
}
