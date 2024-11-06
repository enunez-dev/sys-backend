import { describe, it, expect, vi } from 'vitest';
import pool from '../config/db';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../models/client.model';

// Simulamos la base de datos
vi.mock('../config/db');

describe('ClientRepository', () => {
  it('debería guardar un cliente en la base de datos', async () => {
    const clientRepository = new ClientRepository();

    // Mock del cliente a guardar
    const mockClient = new Client('1', 'Juan Pérez', '12345678', 'CI', 'juanperez@mail.com');

    // Simula la consulta a la base de datos
    pool.query = vi.fn().mockResolvedValue({
      rows: [mockClient],
    });

    // Llamamos al repositorio para guardar el cliente
    const savedClient = await clientRepository.save(mockClient);

    // Verificamos que el cliente retornado sea el mismo que se envió
    expect(savedClient).toEqual(mockClient);
    expect(pool.query).toHaveBeenCalledWith(
      `INSERT INTO clientes (code, name, cinit, documenttype, email) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [mockClient.code, mockClient.name, mockClient.cinit, mockClient.documenttype, mockClient.email]
    );
  });
});
