import { Router } from 'express';
import { validateShema } from '../validators/validator';
import { registerClientController, getClientController, getClientListController } from '../controllers/client.controller';

const router = Router();

router.post('/', validateShema, registerClientController);
router.get('/list', getClientListController);
router.get('/:cinit', getClientController);

export default router;
