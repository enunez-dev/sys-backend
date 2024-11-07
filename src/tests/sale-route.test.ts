import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app';
import { registerSaleService } from '../services/sale.service';

vi.mock('../services/sale.service');

describe('POST /v1/sale', () => {
  it('debería registrar una venta exitosamente', async () => {
    const data = {
      client: {
        id: 1,
        name: 'User Demo',
      },
      total: 10.0,
      payCondition: {
        id: 1,
        name: 'Efectivo',
      },
      productsItem: [
        {
          id: 1,
          name: 'Producto 1',
          quantity: 2,
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
    const response = await request(app).post('/v1/sale').send(data);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Guardado correctamente');
    expect(response.body.data).toEqual({
      id: 1,
      ...data,
    });
  });
});
