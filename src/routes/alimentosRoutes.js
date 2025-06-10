import express from "express";
const router = express.Router();

import {
  listarAlimentos,
  criarAlimento,
  atualizarAlimento,
  removerAlimento
} from "../controllers/alimentosController.js";

// Rotas de alimentos
router.get("/alimentos", listarAlimentos);
router.post("/alimentos", criarAlimento);
router.patch("/alimentos/:id", atualizarAlimento); // <-- adicione esta linha
router.delete("/alimentos/:id", removerAlimento);

export default router;