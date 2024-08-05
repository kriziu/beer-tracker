import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';

import {
  User,
  RegisterUserDto,
  registerUserSchema,
  loginUserSchema,
  LoginUserDto,
  UserWithSafeData,
  userToSafeData,
  getUpdatedQuantity,
} from '@/entities/user';
import { passwordHashOptions } from '@/lib/auth.config';

import type { MutateUsersDependencies } from './dependencies';

export const errorMessages = {
  UserAlreadyExist: 'User with this email already exists.',
  InvalidCredentials: 'Invalid credentials.',
  NoUserFound: 'No user found.',
};

export async function registerUser(
  ctx: MutateUsersDependencies,
  data: RegisterUserDto,
): Promise<UserWithSafeData> {
  const parsedData = registerUserSchema.parse(data);

  const userInDb = await ctx.getUserByEmail(parsedData.email);
  if (userInDb) {
    throw new Error(errorMessages.UserAlreadyExist);
  }

  const passwordHash = await hashPassword(parsedData.password);
  const userId = generateIdFromEntropySize(10);

  const user = await ctx.createUser({
    id: userId,
    name: parsedData.name,
    email: parsedData.email,
    quantity: 0,
    passwordHash,
  });

  return userToSafeData(user);
}

export async function loginUser(
  ctx: MutateUsersDependencies,
  data: LoginUserDto,
): Promise<UserWithSafeData> {
  const { email, password } = loginUserSchema.parse(data);

  const user = await ctx.getUserByEmail(email);
  if (!user) {
    throw new Error(errorMessages.InvalidCredentials);
  }

  const isValidPassword = await isUserPasswordMatch(user, password);
  if (!isValidPassword) {
    throw new Error(errorMessages.InvalidCredentials);
  }

  return userToSafeData(user);
}

export async function updateUserQuantity(
  ctx: MutateUsersDependencies,
  userId: string,
  quantity: number,
): Promise<UserWithSafeData> {
  const originalUser = await ctx.getUserById(userId);
  if (!originalUser) {
    throw new Error(errorMessages.NoUserFound);
  }

  const newQuantity = getUpdatedQuantity(originalUser.quantity, quantity);
  const updatedUser = await ctx.updateUser(userId, { quantity: newQuantity });

  return userToSafeData(updatedUser);
}

async function isUserPasswordMatch(user: User, password: string) {
  const { passwordHash } = user;

  if (!passwordHash) {
    return false;
  }

  return await verify(passwordHash, password, passwordHashOptions);
}

async function hashPassword(password: string) {
  return await hash(password, passwordHashOptions);
}
