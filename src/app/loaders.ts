import { cache } from 'react';

import { getUsersLeaderboard } from '@/use-cases/users';

export const getUsersLeaderboardLoader = cache(getUsersLeaderboard);
