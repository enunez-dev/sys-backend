import { ISale } from '../models/sale.model';
import pool from '../config/db';

export const saleSave = async (data: ISale): Promise<any> => {
  const { clientId, total, payConditionId } = data;
  const result = await pool.query(
    `INSERT INTO sales (client_id, total, pay_condition_id) VALUES ($1, $2, $3)
            RETURNING *`,
    [clientId, total, payConditionId]
  );
  return result.rows[0];
};
