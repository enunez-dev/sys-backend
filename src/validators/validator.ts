import { Request, Response, NextFunction } from 'express';
import { saleSchema } from './schema/sale.schema';
import { clientSchema } from './schema/client.schema';

export const validateShema = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { baseUrl } = req;
    const valid: any = {
      '/v1/sale': saleSchema,
      '/v1/client': clientSchema,
    };

    const schema = valid[baseUrl] || null;
    if (!schema) {
      res.status(400).json({ error: 'schema not found' });
      return;
    }
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
