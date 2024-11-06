import { Request, Response } from 'express';
import { registerSaleService } from '../services/sale.service';

export const registerSaleController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await registerSaleService(data);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
