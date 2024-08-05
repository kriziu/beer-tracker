import * as UserDataAccess from '@/data-access/user';
import { validateDataAccessAuth } from '@/lib/auth';

export const mutateUsersDependencies = {
  createUser: UserDataAccess.createUser,
  getUserByEmail: UserDataAccess.getUserByEmail,
  getUserById: UserDataAccess.getUserById,
  updateUser: UserDataAccess.updateUser,
};
export type MutateUsersDependencies = typeof mutateUsersDependencies;

export const getUsersDependencies = {
  validateDataAccessAuth,
  getUsersSortedByQuantity: UserDataAccess.getUsersSortedByQuantity,
};
export type GetUsersDependencies = typeof getUsersDependencies;
