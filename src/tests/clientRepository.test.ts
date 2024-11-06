import { describe, it, expect, vi } from 'vitest';
import pool from '../config/db';
import { clientSave } from '../repositories/client.repository';
import { IClient } from '../models/client.model';

vi.mock('../config/db');

describe('ClientRepository', () => {
  it('debería guardar un cliente en la base de datos', async () => {
    const mockClient: IClient = { id: 1, name: 'Juan Pérez', ciNit: '12345678', documentType: 'CI', email: 'juanperez@mail.com' };

    pool.query = vi.fn().mockResolvedValue({
      rows: [mockClient],
    });
    const savedClient = await clientSave(mockClient);
    expect(savedClient).toEqual(mockClient);
  });
});
