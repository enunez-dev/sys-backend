import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app'; // Importa tu aplicación Express
import { registerClientService } from '../services/client.service'; // Importa el servicio

// Mock del servicio `registerClientService`
vi.mock('../services/clientService');

describe('POST /api/clientes', () => {
  // it('debería registrar un cliente exitosamente', async () => {
  //   // Accedemos al mock del servicio simulado usando vi.mocked
  //   const mockRegisterClientService = vi.mocked(registerClientService);
  //   // Simulamos el comportamiento del método `registerClientService`
  //   mockRegisterClientService.mockResolvedValue({
  //     success: true,
  //     message: 'Cliente registrado correctamente',
  //     client: {
  //       code: '1',
  //       name: 'Juan Pérez',
  //       ciNit: '12345678',
  //       documentType: 'CI',
  //       email: 'juanperez@mail.com',
  //     },
  //   });
  //   // Hacemos la solicitud a la ruta con datos de ejemplo
  //   const response = await request(app).post('/api/clientes').send({
  //     code: '1',
  //     name: 'Juan Pérez',
  //     ciNit: '12345678',
  //     documentType: 'CI',
  //     email: 'juanperez@mail.com',
  //   });
  //   // Verificamos que la respuesta sea exitosa y que devuelva los datos simulados
  //   expect(response.status).toBe(200);
  //   expect(response.body.success).toBe(true);
  //   expect(response.body.message).toBe('Cliente registrado correctamente');
  //   expect(response.body.client).toEqual({
  //     code: '1',
  //     name: 'Juan Pérez',
  //     ciNit: '12345678',
  //     documentType: 'CI',
  //     email: 'juanperez@mail.com',
  //   });
  // });
  // it('debería retornar un error si el email es inválido', async () => {
  //   const mockRegisterClientService = vi.mocked(registerClientService);
  //   // Simulamos el comportamiento del método `registerClientService`
  //   mockRegisterClientService.mockRejectedValue(new Error('El formato del email es inválido'));
  //   const response = await request(app).post('/api/clientes').send({
  //     code: '3',
  //     name: 'Juan Pérez',
  //     ciNit: '12345678',
  //     documentType: 'CI',
  //     email: 'email-invalido',
  //   });
  //   // Verificamos que se retorne un error con el mensaje correcto
  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toBe('El formato del email es inválido');
  // });
});
