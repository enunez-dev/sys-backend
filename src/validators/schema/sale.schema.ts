// src/validators/orderSchema.ts
import { z } from 'zod';

const clientSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const payConditionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const productItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  subTotal: z.number().positive(),
});

export const saleSchema = z.object({
  client: clientSchema,
  payCondition: payConditionSchema,
  total: z.number().positive(),
  productsItem: z.array(productItemSchema),
});
