import express from "express";
const router = express.Router();

import {
  listarProgressoes,
  criarProgressao,
  atualizarProgressao,
  removerProgressao
} from "../controllers/progressaoCargaController.js";

// Rotas de progressão de carga
router.get("/progressao-carga", listarProgressoes);
router.post("/progressao-carga", criarProgressao);
router.patch("/progressao-carga/:id", atualizarProgressao);
router.delete("/progressao-carga/:id", removerProgressao);

export default router;