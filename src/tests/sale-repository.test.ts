import { describe, it, vi, expect } from 'vitest';
import pool from '../config/db';
import { saleSave } from '../repositories/sale.repository';

vi.mocked('../config/db');
describe('SaleRepository', () => {
  it('should save sale with code 1', async () => {
    const data = {
      clientId: 1,
      payConditionId: 1,
      total: 10,
    };
    pool.query = vi.fn().mockResolvedValue({
      rows: [
        {
          id: 1,
          ...data,
        },
      ],
    });
    const sale = await saleSave(data);
    expect(sale.id).toEqual(1);
  });
});
