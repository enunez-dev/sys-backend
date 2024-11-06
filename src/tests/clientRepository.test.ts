import { describe, it, expect, vi } from 'vitest';
import pool from '../config/db';
import { clientSave } from '../repositories/client.repository';
import { IClient } from '../models/client.model';

// Simulamos la base de datos
vi.mock('../config/db');

describe('ClientRepository', () => {
  // it('debería guardar un cliente en la base de datos', async () => {
  //   // Mock del cliente a guardar
  //   const mockClient: IClient = { id: 1, name: 'Juan Pérez', ciNit: '12345678', documentType: 'CI', email: 'juanperez@mail.com' };
  //   // Simula la consulta a la base de datos
  //   pool.query = vi.fn().mockResolvedValue({
  //     rows: [mockClient],
  //   });
  //   // Llamamos al repositorio para guardar el cliente
  //   const savedClient = await clientSave(mockClient);
  //   // Verificamos que el cliente retornado sea el mismo que se envió
  //   expect(savedClient).toEqual(mockClient);
  //   expect(pool.query).toHaveBeenCalledWith(
  //     `INSERT INTO clientes (name, ci_nit, document_type, email)
  //      VALUES ($1, $2, $3, $4)
  //      RETURNING *`,
  //     [mockClient.name, mockClient.ciNit, mockClient.documentType, mockClient.email]
  //   );
  // });
});
