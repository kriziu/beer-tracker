import { z } from 'zod';

import type { userTable } from '@/db/schema';

import type { loginUserSchema, registerUserSchema } from './schema';

export type User = typeof userTable.$inferSelect;
export type UserWithSafeData = Omit<User, 'passwordHash'> & {
  passwordHash?: never;
};

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;

export function userToSafeData(user: User): UserWithSafeData {
  const { name, email, id, quantity } = user;

  return { id, name, email, quantity };
}

export function getUpdatedQuantity(userQuantity: number, quantity: number) {
  return Math.max(userQuantity + quantity, 0);
}
