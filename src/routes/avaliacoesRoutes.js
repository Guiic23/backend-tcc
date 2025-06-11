import express from "express";
const router = express.Router();

import {
  listarAvaliacoes,
  criarAvaliacao,
  atualizarAvaliacao,
  removerAvaliacao
} from "../controllers/avaliacoesController.js";

// Rotas de avaliações
router.get("/avaliacoes", listarAvaliacoes);
router.post("/avaliacoes", criarAvaliacao);
router.patch("/avaliacoes/:id", atualizarAvaliacao);
router.delete("/avaliacoes/:id", removerAvaliacao);

export default router;