import express from 'express'
const router = express.Router();

import userRoutes from './userRoutes.js'
import paymentRoutes from './paymentRoutes.js'
import alimentosRoutes from './alimentosRoutes.js'
import avaliacoesRoutes from './avaliacoesRoutes.js'
import treinosRoutes from './treinosRoutes.js'
import progressionRoutes from './progressionRoutes.js'
import progressaoCargaRoutes from './progressaoCargaRoutes.js'
import personalTrainerRoutes from './personalTrainerRoutes.js'
import alimentosConsumidosRoutes from './alimentosConsumidosRoutes.js'

router.use('/', userRoutes);
router.use('/', paymentRoutes);
router.use('/', alimentosRoutes);
router.use('/', avaliacoesRoutes);
router.use('/', treinosRoutes);
router.use('/', progressionRoutes);
router.use('/', progressaoCargaRoutes);
router.use('/', personalTrainerRoutes);
router.use('/', alimentosConsumidosRoutes);


export default router;
