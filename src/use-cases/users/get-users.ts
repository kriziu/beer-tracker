import { userToSafeData, UserWithSafeData } from '@/entities/user';

import { GetUsersDependencies } from './dependencies';

export async function getUsersLeaderboard(
  ctx: GetUsersDependencies,
): Promise<UserWithSafeData[]> {
  await ctx.validateDataAccessAuth();

  const users = await ctx.getUsersSortedByQuantity();

  return users.map(userToSafeData);
}
