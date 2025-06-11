import express from "express";
const router = express.Router();

import {
  listarProgressos,
  criarProgresso,
  atualizarProgresso,
  removerProgresso
} from "../controllers/progressionController.js";

// Rotas de progression
router.get("/myprogression", listarProgressos);
router.post("/myprogression", criarProgresso);
router.patch("/myprogression/:id", atualizarProgresso);
router.delete("/myprogression/:id", removerProgresso);

export default router;