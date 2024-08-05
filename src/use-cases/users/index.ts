import { getUsersDependencies, mutateUsersDependencies } from './dependencies';
import * as GetUsers from './get-users';
import * as MutateUsers from './mutate-users';

// GETTERS
export const getUsersLeaderboard = GetUsers.getUsersLeaderboard.bind(
  null,
  getUsersDependencies,
);

// MUTATORS
export const registerUser = MutateUsers.registerUser.bind(null, mutateUsersDependencies);
export const loginUser = MutateUsers.loginUser.bind(null, mutateUsersDependencies);
export const updateUserQuantity = MutateUsers.updateUserQuantity.bind(
  null,
  mutateUsersDependencies,
);
