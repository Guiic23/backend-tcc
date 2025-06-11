import express from 'express'
const router = express.Router();

import userRoutes from './userRoutes.js'
import paymentRoutes from './paymentRoutes.js'
import alimentosRoutes from './alimentosRoutes.js'
import avaliacoesRoutes from './avaliacoesRoutes.js'
import treinosRoutes from './treinosRoutes.js'
import progressionRoutes from './progressionRoutes.js'

router.use('/', userRoutes);
router.use('/', paymentRoutes);
router.use('/', alimentosRoutes);
router.use('/', avaliacoesRoutes);
router.use('/', treinosRoutes);
router.use('/', progressionRoutes);

export default router;
