import express from 'express'
const router = express.Router();

import userRoutes from './userRoutes.js'
import paymentRoutes from './paymentRoutes.js'
import alimentosRoutes from './alimentosRoutes.js'

router.use('/', userRoutes);
router.use('/', paymentRoutes);
router.use('/', alimentosRoutes);

export default router;


