import { Request, Response } from 'express';
import { getProductService, getProductListService } from '../services/product.service';

export async function getProductListController(req: Request, res: Response) {
  try {
    const result = await getProductListService();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await getProductService(id);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
