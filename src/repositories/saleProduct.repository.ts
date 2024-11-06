import { ISaleProduct } from '../models/saleProduct.model';
import pool from '../config/db';

export const productSaveDetails = async (product: ISaleProduct) => {
  const result = await pool.query(
    `INSERT INTO sales_products (sale_id, product_id, quantity, price ,sub_total) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
    [product.saleId, product.productId, product.quantity, product.price, product.subtotal]
  );
  return result.rows[0];
};
