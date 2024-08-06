import { validateAuth } from '@/lib/auth';

import Counter from './_components/counter';
import Leaderboard from './_components/leaderboard';
import LogoutButton from './_components/logout-button';
import RefreshButton from './_components/refresh-button';

export default async function HomePage() {
  const {
    user: { quantity },
  } = await validateAuth();

  return (
    <div className="space-y-4 flex flex-col p-10 items-center h-dvh">
      <div>
        <RefreshButton />
        <LogoutButton />
      </div>

      <Counter initialUserQuantity={quantity} />
      <Leaderboard />
    </div>
  );
}
