'use client';

import { useRef } from 'react';

import { Minus, Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

import * as Action from '../actions';

type CounterProps = Readonly<{
  quantity: number;
}>;

export default function Counter({ quantity }: CounterProps) {
  const [selectedQuantity, setSelectedQuantity] = useLocalStorageState(
    'select-quantity',
    '500',
  );

  const clickedOnIncrement = useRef(true);

  const updateUserQuantityAction = useServerAction(Action.updateUserQuantityAction);

  const handleIncrement = () => {
    clickedOnIncrement.current = true;
    updateUserQuantityAction.execute(Number(selectedQuantity));
  };

  const handleDecrement = () => {
    clickedOnIncrement.current = false;
    updateUserQuantityAction.execute(-Number(selectedQuantity));
  };

  const isLoadingDecrement =
    !clickedOnIncrement.current && updateUserQuantityAction.isPending;
  const isLoadingIncrement =
    clickedOnIncrement.current && updateUserQuantityAction.isPending;

  return (
    <div className="flex space-x-4 w-full">
      <Button
        className="shrink-0"
        size="icon"
        variant="secondary"
        onClick={handleDecrement}
        loading={isLoadingDecrement}
        disabled={quantity <= 0}
      >
        <Minus className="size-4" />
      </Button>
      <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="500">500ml</SelectItem>
          <SelectItem value="400">400ml</SelectItem>
          <SelectItem value="330">330ml</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="shrink-0"
        size="icon"
        variant="secondary"
        onClick={handleIncrement}
        loading={isLoadingIncrement}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
