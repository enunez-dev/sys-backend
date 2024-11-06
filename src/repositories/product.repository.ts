import pool from '../config/db';
import { IProduct } from '../models/product.model';

export const productList = async (): Promise<any> => {
  const res = await pool.query(`SELECT * from products`);
  return res.rows.length > 0 ? res.rows : null;
};

export const productFindById = async (id: string): Promise<IProduct | null> => {
  const res = await pool.query(`SELECT * from products where id = $1`, [id]);
  return res.rows.length > 0 ? res.rows[0] : null;
};
