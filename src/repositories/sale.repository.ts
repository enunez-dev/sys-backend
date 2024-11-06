import { ISale } from '../models/sale.model';
import pool from '../config/db';

export const saleSave = async (clientId: number, total: number, payConditionId: number): Promise<ISale> => {
  const result = await pool.query(
    `INSERT INTO sales (client_id, total, pay_condition_id) VALUES ($1, $2, $3)
            RETURNING *`,
    [clientId, total, payConditionId]
  );
  return result.rows[0];
};
