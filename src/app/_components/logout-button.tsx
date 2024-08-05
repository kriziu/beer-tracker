'use client';

import { LogOut } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';

import * as Actions from '../actions';

export default function LogoutButton() {
  const logoutAction = useServerAction(Actions.logoutAction);

  return (
    <Button
      variant="outline"
      className="fixed top-4 right-4"
      size="icon"
      onClick={() => logoutAction.execute()}
      loading={logoutAction.isPending}
    >
      <LogOut className="size-4" />
    </Button>
  );
}
