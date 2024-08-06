'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerAction } from 'zsa';

import { lucia, validateRequest } from '@/lib/auth';
import { updateUserQuantity } from '@/use-cases/users';

export const logoutAction = createServerAction().handler(async () => {
  const { session } = await validateRequest();
  if (!session) {
    clearCookies();
    redirect('/login');
  }

  await lucia.invalidateSession(session.id);

  clearCookies();
  redirect('/');
});

export const refreshAction = createServerAction().handler(async () => {
  revalidatePath('/');
});

export const updateUserQuantityAction = createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    const { user } = await validateRequest();
    if (!user) return;

    await updateUserQuantity(user.id, input);

    revalidatePath('/');
  });

function clearCookies() {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
