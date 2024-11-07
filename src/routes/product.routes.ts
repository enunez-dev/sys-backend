import { Router } from 'express';
import { getProductListController, getProductController } from '../controllers/product.controller';

const router = Router();

router.get('/list', getProductListController);
router.get('/:id', getProductController);

export default router;
