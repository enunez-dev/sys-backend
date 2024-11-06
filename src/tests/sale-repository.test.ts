import { describe, it, vi, expect } from 'vitest';
import pool from '../config/db';
import { ISale } from '../models/sale.model';
import { saleSave } from '../repositories/sale.repository';

vi.mocked('../config/db');
describe('SaleRepository', () => {
  //   it('should save sale with code 1', async () => {
  //     const mockData: ISale = {
  //       id: 1,
  //       clientId: 1,
  //       payCondition: 'efectivo',
  //       total: 10,
  //     };
  //     pool.query = vi.fn().mockResolvedValue({
  //       rows: [mockData],
  //     });
  //     const sale = await saleSave(1, 10, 1);
  //     expect(sale.id).toEqual(mockData.id);
  //     expect(sale).toEqual(mockData);
  //   });
});
