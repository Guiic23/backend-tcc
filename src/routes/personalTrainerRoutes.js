import express from "express";
const router = express.Router();

import {
  listarPersonalTrainers,
  criarPersonalTrainer,
  atualizarPersonalTrainer,
  removerPersonalTrainer
} from "../controllers/personalTrainerController.js";

// Rotas de personal trainers
router.get("/personal-trainers", listarPersonalTrainers);
router.post("/personal-trainers", criarPersonalTrainer);
router.patch("/personal-trainers/:id", atualizarPersonalTrainer);
router.delete("/personal-trainers/:id", removerPersonalTrainer);

export default router;