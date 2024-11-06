import { describe, it, expect, vi } from 'vitest';
import { registerClientService } from '../services/client.service';

vi.mock('../services/client.service');

describe('registerClientService', () => {
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

    const result = await mockRegisterClientService(data);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Cliente registrado correctamente');
    expect(result.data).toEqual({
      id: 1,
      ...data,
    });
  });
});
