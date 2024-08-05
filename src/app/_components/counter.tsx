'use client';

import { useEffect, useMemo, useState } from 'react';

import debounce from 'lodash/debounce';
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
import { getUpdatedQuantity } from '@/entities/user';

import Score from './score';
import * as Action from '../actions';

type CounterProps = Readonly<{
  initialUserQuantity: number;
}>;

export default function Counter({ initialUserQuantity }: CounterProps) {
  const [userQuantity, setUserQuantity] = useState(initialUserQuantity);
  const [debouncedQuantity, setDebouncedQuantity] = useState(0);
  const [quantity, setQuantity] = useState('500');

  const updateUserQuantityAction = useServerAction(Action.updateUserQuantityAction, {
    onFinish: () => {
      setDebouncedQuantity(0);
    },
  });

  useEffect(() => {
    setUserQuantity(initialUserQuantity);
  }, [initialUserQuantity]);

  const debouncedExecute = useMemo(
    () => debounce(updateUserQuantityAction.execute, 300),
    [updateUserQuantityAction.execute],
  );

  const updateQuantity = (newQuantity: number) => {
    const newUserQuantity = getUpdatedQuantity(userQuantity, newQuantity);
    setUserQuantity(newUserQuantity);

    if (newUserQuantity === 0) {
      setDebouncedQuantity(-initialUserQuantity);
      return -initialUserQuantity;
    }

    const newDebouncedQuantity = debouncedQuantity + newQuantity;
    setDebouncedQuantity(newDebouncedQuantity);

    return newDebouncedQuantity;
  };

  const handleIncrement = () => {
    const newQuantity = updateQuantity(Number(quantity));
    debouncedExecute(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = updateQuantity(-Number(quantity));
    debouncedExecute(newQuantity);
  };

  const isLoadingDecrement = debouncedQuantity < 0 && updateUserQuantityAction.isPending;
  const isLoadingIncrement = debouncedQuantity > 0 && updateUserQuantityAction.isPending;

  return (
    <div className="space-y-4 w-full">
      <Score quantity={userQuantity} />
      <div className="flex space-x-4 w-full">
        <Button
          className="shrink-0"
          size="icon"
          variant="secondary"
          onClick={handleDecrement}
          loading={isLoadingDecrement}
        >
          <Minus className="size-4" />
        </Button>
        <Select value={quantity} onValueChange={setQuantity}>
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
    </div>
  );
}
