import { z } from "zod";
import { criar, buscarTodos, remover, atualizar } from "../models/treinosModel.js";

// Esquema de validação com Zod para Treinos
const treinoSchema = z.object({
  user_id: z.coerce.number().int().positive("ID do usuário é obrigatório"),
  data: z.string().min(1, { message: "Data é obrigatória" }), // timestamp em string ISO
  exercicio: z.string().min(1, { message: "Exercício é obrigatório" }),
  carga: z.coerce.number().nonnegative({ message: "Carga deve ser positiva" }),
  repeticiones: z.coerce.number().int().positive({ message: "Repetições obrigatórias" }),
  series: z.coerce.number().int().positive({ message: "Séries obrigatórias" }),
  observacoes: z.string().optional().nullable()
});

// Buscar todos os treinos
export const listarTreinos = async (req, res) => {
  try {
    const treinos = await buscarTodos();
    res.status(200).json(treinos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar treinos" });
  }
};

// Criar novo treino
export const criarTreino = async (req, res) => {
  try {
    const dados = treinoSchema.parse(req.body);
    const resultado = await criar(dados);
    res.status(201).json({
      mensagem: "Treino criado com sucesso",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao criar treino", erro: error.message });
  }
};

// Atualizar treino
export const atualizarTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = treinoSchema.parse(req.body);
    const resultado = await atualizar(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Treino não encontrado" });
    }

    res.status(200).json({ mensagem: "Treino atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar treino", erro: error.message });
  }
};

// Remover treino
export const removerTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await remover(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Treino não encontrado" });
    }

    res.status(200).json({ mensagem: "Treino removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover treino" });
  }
};