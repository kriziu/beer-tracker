import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { userTable } from '@/db/schema';

export async function createUser({
  id,
  name,
  email,
  passwordHash,
  quantity,
}: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  quantity: number;
}) {
  const [user] = await db
    .insert(userTable)
    .values({ id, name, email, passwordHash, quantity })
    .returning();

  return user;
}

export async function updateUser(
  userId: string,
  data: Partial<{ name: string; email: string; passwordHash: string; quantity: number }>,
) {
  const [user] = await db
    .update(userTable)
    .set(data)
    .where(eq(userTable.id, userId))
    .returning();

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  });

  return user;
}

export async function getUsersSortedByQuantity() {
  const users = await db.query.userTable.findMany({
    orderBy: [desc(userTable.quantity)],
  });

  return users;
}
