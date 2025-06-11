// avaliacoesController.js
import { z } from "zod";
import { criar, buscarTodos, remover, atualizar } from "../models/avaliacoesModel.js";

// Esquema de validação com Zod
const avaliacaoSchema = z.object({
  user_id: z.coerce.number().int().positive({ message: "ID do usuário é obrigatório" }),
  trainer_id: z.coerce.number().int().positive({ message: "ID do personal trainer é obrigatório" }),
  data: z.string().min(1, { message: "Data é obrigatória" }), // timestamp em string ISO
  tipo: z.string().min(1, { message: "Tipo é obrigatório" }),
  nota: z.coerce.number().int().min(1).max(5).optional(),
  comentarios: z.string().optional().nullable(),
  peso: z.coerce.number().nonnegative().optional().nullable(),
  percentual_gordura: z.coerce.number().nonnegative().optional().nullable(),
  imc: z.coerce.number().nonnegative().optional().nullable(),
  treino_id: z.coerce.number().int().positive().optional().nullable(),
  observacoes_trainer: z.string().optional().nullable()
});

// Buscar todas as avaliações
export const listarAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await buscarTodos();
    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar avaliações" });
  }
};

// Criar nova avaliação
export const criarAvaliacao = async (req, res) => {
  try {
    const dados = avaliacaoSchema.parse(req.body);
    const resultado = await criar(dados);
    res.status(201).json({
      mensagem: "Avaliação criada com sucesso",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao criar avaliação", erro: error.message });
  }
};

// Atualizar avaliação
export const atualizarAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = avaliacaoSchema.parse(req.body);
    const resultado = await atualizar(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Avaliação não encontrada" });
    }

    res.status(200).json({ mensagem: "Avaliação atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar avaliação", erro: error.message });
  }
};

// Remover avaliação
export const removerAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await remover(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Avaliação não encontrada" });
    }

    res.status(200).json({ mensagem: "Avaliação removida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover avaliação" });
  }
};