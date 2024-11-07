import { Request, Response } from 'express';
import { registerSaleService } from '../services/sale.service';

export const registerSaleController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await registerSaleService(data);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
