import express from 'express'
const router = express.Router();

import userRoutes from './paymentRoutes'
import paymentRoutes from './paymentRoutes'

router.use('/users', userRoutes);

