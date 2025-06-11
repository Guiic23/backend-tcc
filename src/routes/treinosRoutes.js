import express from "express";
const router = express.Router();

import {
  listarTreinos,
  criarTreino,
  atualizarTreino,
  removerTreino
} from "../controllers/treinosController.js";

// Rotas de treinos
router.get("/treinos", listarTreinos);
router.post("/treinos", criarTreino);
router.patch("/treinos/:id", atualizarTreino);
router.delete("/treinos/:id", removerTreino);

export default router;