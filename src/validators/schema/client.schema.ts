// src/validators/orderSchema.ts
import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string(),
  ciNit: z.string().min(7, { message: 'CI/NIT debe tener al menos 7 caracteres' }),
  documentType: z.enum(['CI', 'NIT']),
  email: z.string().email({ message: 'El formato del email es inválido' }),
});
