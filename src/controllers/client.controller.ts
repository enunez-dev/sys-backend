import { Request, Response } from 'express';
import { registerClientService, getClientService } from '../services/client.service';

export const registerClientController = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    const result = await registerClientService(clientData);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getClientController = async (req: Request, res: Response) => {
  try {
    const { cinit } = req.params;
    const result = await getClientService(cinit);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
