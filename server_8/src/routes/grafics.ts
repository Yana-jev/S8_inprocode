import { Router } from 'express';
import { getSalesData } from '../controllers/grafic';

const router = Router();


router.get('/', getSalesData);

export default router;
