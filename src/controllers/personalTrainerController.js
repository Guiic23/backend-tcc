import { z } from "zod";
import {
  buscarTodos,
  criar,
  atualizar,
  remover,
} from "../models/personalTrainerModel.js";

// Esquema de validação com Zod
const personalTrainerSchema = z.object({
  user_id: z.coerce.number().int().positive({ message: "user_id deve ser inteiro positivo" }),
  especialidade: z.string().min(1, "Especialidade é obrigatória"),
  anos_experiencia: z.coerce.number().int().nonnegative(),
  certificacao: z.string().optional(),
  disponibilidade: z.string().optional(),
  bio: z.string().optional(),
  foto_avatar: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional()
});

// Buscar todos os personal trainers
export const listarPersonalTrainers = async (req, res) => {
  try {
    const personalTrainers = await buscarTodos();
    res.status(200).json(personalTrainers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar personal trainers" });
  }
};

// Criar new personal trainer
export const criarPersonalTrainer = async (req, res) => {
  try {
    const dados = personalTrainerSchema.parse(req.body);
    const resultado = await criar(dados);
    res.status(201).json({
      mensagem: "Personal trainer criado com sucesso",
      id: resultado.lastInsertRowid
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao criar personal trainer", erro: error.message });
  }
};

// Atualizar personal trainer
export const atualizarPersonalTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = personalTrainerSchema.parse(req.body);
    const resultado = await atualizar(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Personal trainer não encontrado" });
    }

    res.status(200).json({ mensagem: "Personal trainer atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar personal trainer", erro: error.message });
  }
};

// Remover personal trainer
export const removerPersonalTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await remover(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Personal trainer não encontrado" });
    }

    res.status(200).json({ mensagem: "Personal trainer removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover personal trainer" });
  }
};