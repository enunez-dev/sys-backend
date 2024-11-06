import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { registerSaleService } from '../services/sale.service';
import app from '../app';

vi.mock('../services/saleService');

describe('POST /api/sales', () => {
  it('debería registrar una venta exitosamente', async () => {
    const mockRegisterSaleService = vi.mocked(registerSaleService);
    mockRegisterSaleService.mockResolvedValue({
      code: 10,
      client: {
        code: '1',
        name: 'Juan Pérez',
      },
      total: 10.0,
      payCondition: 'efectivo',
      productItem: [
        {
          code: '1',
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    });

    const response = await request(app)
      .post('/api/sales')
      .send({
        clientCode: '1',
        payCondition: 'efectivo',
        total: 10,
        productsItem: [
          {
            code: '1',
            name: 'leche',
            amount: 2,
            price: 5,
            subTotal: 10,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
});
