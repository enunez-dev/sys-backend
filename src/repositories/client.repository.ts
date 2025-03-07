import pool from '../config/db';
import { IClient } from '../models/client.model';

export const clientList = async (): Promise<any> => {
  const res = await pool.query(`select * from clients`, []);
  return res.rows.length > 0 ? res.rows : null;
};

export const clientSave = async (client: IClient): Promise<any> => {
  const { name, ciNit, documentType, email } = client;

  const result = await pool.query(
    `INSERT INTO clients (name, ci_nit, document_type, email) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
    [name, ciNit, documentType, email]
  );

  const savedClient = result.rows[0];
  return savedClient;
};

export const clientFindByCiNit = async (cinit: string): Promise<IClient | null> => {
  const res = await pool.query(`select * from clients where ci_nit = $1`, [cinit]);
  return res.rows.length > 0 ? res.rows[0] : null;
};

export const clientFindById = async (id: number): Promise<IClient | null> => {
  const res = await pool.query(`select * from clients where id = $1`, [id]);
  return res.rows.length > 0 ? res.rows[0] : null;
};
