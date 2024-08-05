const BOTTLE_SIZE = 500;

export function getQuantityInLiters(quantity: number) {
  return (quantity / 1000).toFixed(1);
}

export function getRankClassName(rank: number) {
  if (rank === 1) {
    return 'bg-amber-400 text-amber-900';
  } else if (rank === 2) {
    return 'bg-gray-300 text-gray-900';
  } else if (rank === 3) {
    return 'bg-orange-400 text-orange-900';
  }

  return '';
}

export function sumAllQuantities(quantities: number[]) {
  return quantities.reduce((acc, quantity) => acc + quantity, 0);
}

export function getBottlesFromQuantity(quantity: number) {
  return Math.floor(quantity / BOTTLE_SIZE);
}
