import { Router } from 'express';
import { validateShema } from '../validators/validator';
import { registerSaleController } from '../controllers/sale.controller';

const router = Router();

router.post('/', validateShema, registerSaleController);

export default router;
