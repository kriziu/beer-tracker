'use client';

import { useEffect } from 'react';

import { RefreshCcw } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import * as Actions from '../actions';

export default function RefreshButton() {
  const refreshAction = useServerAction(Actions.refreshAction);

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      'focus',
      () => {
        if (refreshAction.isPending || document.hidden) return;

        refreshAction.execute();
      },
      { signal: abortController.signal },
    );

    window.addEventListener(
      'visibilitychange',
      () => {
        if (refreshAction.isPending || document.hidden) return;

        refreshAction.execute();
      },
      { signal: abortController.signal },
    );

    return () => {
      abortController.abort();
    };
  }, [refreshAction]);

  return (
    <Button
      variant="outline"
      className="fixed top-4 left-4"
      size="icon"
      onClick={() => refreshAction.execute()}
      disabled={refreshAction.isPending}
    >
      <RefreshCcw className={cn('size-4', refreshAction.isPending && 'animate-spin')} />
    </Button>
  );
}
