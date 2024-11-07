import { describe, it, vi, expect } from 'vitest';
import { registerSaleService } from '../services/sale.service';

vi.mock('../services/sale.service');

describe('SaleService', () => {
  it('should return error when clientId not fount', async () => {
    const data: any = {
      client: {
        id: 222,
        name: 'User Demo',
      },
      payCondition: {
        id: 1,
        name: 'Efectivo',
      },
      total: 10,
      productsItem: [
        {
          id: 1,
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    };
    const mockRegisterSaleService = vi.fn().mockRejectedValue(new Error('Client witch id 222 not found'));
    expect(() => mockRegisterSaleService(data)).rejects.toThrowError('Client witch id 222 not found');
  });
  it('should return error when productId not fount', () => {
    const data: any = {
      client: {
        id: 1,
        name: 'User Demo',
      },
      payCondition: {
        id: 1,
        name: 'Efectivo',
      },
      total: 10,
      productsItem: [
        {
          id: 11111,
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    };
    const mockRegisterSaleService = vi.fn().mockRejectedValue(new Error('Product with id 11111 not found'));
    expect(() => mockRegisterSaleService(data)).rejects.toThrowError('Product with id 11111 not found');
  });
  it('should return sale id when save sale', async () => {
    const data: any = {
      client: {
        id: 1,
        name: 'User Demo',
      },
      payCondition: {
        id: 1,
        name: 'Efectivo',
      },
      total: 10,
      productsItem: [
        {
          id: 1,
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    };
    const mockRegisterSaleService = vi.mocked(registerSaleService);
    mockRegisterSaleService.mockResolvedValue({
      success: true,
      message: 'Guardado correctamente',
      data: {
        id: 1,
        ...data,
      },
    });
    const result = await mockRegisterSaleService(data);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Guardado correctamente');
    expect(result.data).toEqual({
      id: 1,
      ...data,
    });
  });
});
