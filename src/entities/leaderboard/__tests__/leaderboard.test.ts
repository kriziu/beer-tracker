import { describe, expect, it } from 'vitest';

import {
  getBottlesFromQuantity,
  getQuantityInLiters,
  getRankClassName,
  sumAllQuantities,
} from '../leaderboard';

describe('leaderboard', () => {
  describe('getQuantityInLiters', () => {
    it('should return the quantity in liters', () => {
      const quantityInMl = 437651;

      const result = getQuantityInLiters(quantityInMl);

      expect(result).toBe('437.7');
    });
  });

  describe('getRankClassName', () => {
    it('should return the correct classname for first 3 ranks', () => {
      expect(getRankClassName(1)).toBe('bg-amber-400 text-amber-900');
      expect(getRankClassName(2)).toBe('bg-gray-300 text-gray-900');
      expect(getRankClassName(3)).toBe('bg-orange-400 text-orange-900');
    });
  });

  describe('sumAllQuantities', () => {
    it('should return the sum of all quantities', () => {
      const quantities = [1, 2, 3, 4, 5];

      const result = sumAllQuantities(quantities);

      expect(result).toBe(15);
    });
  });

  describe('getBottlesFromQuantity', () => {
    it('should return the number of bottles from the quantity', () => {
      const quantity = 1800;

      const result = getBottlesFromQuantity(quantity);

      expect(result).toBe(3);
    });
  });
});
