import { describe, expect, it } from 'vitest';
import { groupOrders } from './groupOrders';

describe('groupOrders', () => {
  it('groups products purchased in the same Stripe checkout', () => {
    const orders = groupOrders([
      {
        id: 1,
        checkoutSessionId: 'cs_test_one',
        createdAt: '2026-09-01T10:00:00.000Z',
        quantity: 2,
      },
      {
        id: 2,
        checkoutSessionId: 'cs_test_one',
        createdAt: '2026-09-01T10:00:00.000Z',
        quantity: 1,
      },
      {
        id: 3,
        checkoutSessionId: 'cs_test_two',
        createdAt: '2026-09-02T10:00:00.000Z',
        quantity: 4,
      },
    ]);

    expect(orders).toHaveLength(2);
    expect(orders[0].id).toBe('cs_test_two');
    expect(orders[1].items.map((item) => item.id)).toEqual([1, 2]);
  });

  it('keeps legacy rows without a checkout id as separate purchases', () => {
    const orders = groupOrders([
      { id: 8, createdAt: '2023-01-01T00:00:00.000Z' },
      { id: 9, createdAt: '2023-01-01T00:00:00.000Z' },
    ]);

    expect(orders.map((order) => order.id)).toEqual(['legacy-8', 'legacy-9']);
  });
});
