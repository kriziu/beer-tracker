'use client';

import { useCallback, useEffect, useTransition } from 'react';

import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router, startTransition]);

  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      'focus',
      () => {
        if (isPending || document.hidden) return;

        handleRefresh();
      },
      { signal: abortController.signal },
    );

    window.addEventListener(
      'visibilitychange',
      () => {
        if (isPending || document.hidden) return;

        handleRefresh();
      },
      { signal: abortController.signal },
    );

    return () => {
      abortController.abort();
    };
  }, [handleRefresh, isPending]);

  return (
    <Button
      variant="outline"
      className="fixed top-4 left-4"
      size="icon"
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCcw className={cn('size-4', isPending && 'animate-spin')} />
    </Button>
  );
}
