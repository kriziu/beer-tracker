import { describe, expect, it } from 'vitest';

import { getUpdatedQuantity, userToSafeData } from '../user';

describe('User', () => {
  describe('userToSafeData', () => {
    it('should return only safe data', () => {
      const user = {
        id: '123',
        name: 'test',
        email: 'test@email.com',
        quantity: 1,
        passwordHash: 'passwordhash',
        bloat: 'bloat',
        password: 'testpassword',
      };

      const safeData = userToSafeData(user);

      expect(safeData).toEqual({
        id: '123',
        name: 'test',
        email: 'test@email.com',
      });
    });
  });

  describe('getUpdatedQuantity', () => {
    it('should return the original quantity with added new quantity', () => {
      const originalQuantity = 100;

      expect(getUpdatedQuantity(originalQuantity, 50)).toBe(150);
      expect(getUpdatedQuantity(originalQuantity, -50)).toBe(50);
    });

    it('should return 0 if the new quantity is negative', () => {
      const originalQuantity = 100;

      expect(getUpdatedQuantity(originalQuantity, -150)).toBe(0);
    });
  });
});
