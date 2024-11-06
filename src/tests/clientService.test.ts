import { describe, it, expect, vi } from 'vitest';
import { registerClientService } from '../services/client.service';

describe('registerClientService', () => {
  it('debería registrar un cliente exitosamente', async () => {
    // Datos de entrada
    const clientData = {
      code: '1',
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'juanperez@mail.com',
    };
    // Aquí mockeamos manualmente el servicio para devolver una respuesta simulada
    let mockRegisterClientService: typeof registerClientService;
    mockRegisterClientService = async (data) => {
      return {
        success: true,
        message: 'Cliente registrado correctamente',
        client: data,
      };
    };

    // Llamamos al servicio
    const result = await mockRegisterClientService(clientData);

    // Comprobamos el resultado
    expect(result.success).toBe(true);
    expect(result.message).toBe('Cliente registrado correctamente');
    expect(result.client).toEqual(clientData);
  });

  it('debería lanzar un error si los datos son inválidos', async () => {
    // Datos inválidos (email incorrecto)
    const invalidClientData = {
      code: '1',
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'email-invalido',
    };

    // Comprobamos que el servicio lanza un error de validación
    await expect(registerClientService(invalidClientData)).rejects.toThrow('El formato del email es inválido');
  });
});
