import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app';
import { registerClientService } from '../services/client.service';

vi.mock('../services/client.service');

describe('POST /v1/clientes', () => {
  it('debería registrar un cliente exitosamente', async () => {
    const data = {
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'juanperez@mail.com',
    };
    const mockRegisterClientService = vi.mocked(registerClientService);
    mockRegisterClientService.mockResolvedValue({
      success: true,
      message: 'Cliente registrado correctamente',
      data: {
        id: 1,
        ...data,
      },
    });

    const response = await request(app).post('/v1/client').send(data);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Cliente registrado correctamente');
    expect(response.body.data).toEqual({
      id: 1,
      ...data,
    });
  });
  it('debería retornar un error si el email es inválido', async () => {
    const mockRegisterClientService = vi.mocked(registerClientService);

    mockRegisterClientService.mockRejectedValue(new Error('El formato del email es inválido'));
    const response = await request(app).post('/v1/client').send({
      id: 1,
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'email-invalido',
    });

    expect(response.status).toBe(400);
    expect(response.body.error[0].message).toBe('El formato del email es inválido');
  });
});
