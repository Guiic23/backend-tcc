import express from "express";
const router = express.Router();

import {
  listarConsumos,
  criarConsumoController,
  atualizarConsumoController,
  removerConsumoController
} from "../controllers/alimentosConsumidosController.js";

// Rotas de alimentos consumidos
router.get("/alimentos-consumidos", listarConsumos);
router.post("/alimentos-consumidos", criarConsumoController);
router.patch("/alimentos-consumidos/:id", atualizarConsumoController);
router.delete("/alimentos-consumidos/:id", removerConsumoController);

export default router;