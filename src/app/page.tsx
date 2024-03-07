import { main } from '~/db/seed';

export default async function HomePage() {
  await main();
  return <div>HomePage</div>;
}
