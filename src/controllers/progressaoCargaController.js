import { z } from "zod";
import {
  criar,
  buscarTodos,
  atualizar,
  remover,
} from "../models/progressaoCargaModel.js";

// Esquema de validação com Zod
const progressaoCargaSchema = z.object({
  user_id: z.coerce.number().int().positive({ message: "user_id deve ser inteiro positivo" }),
  treino_id: z.coerce.number().int().positive({ message: "treino_id deve ser inteiro positivo" }),
  carga: z.coerce.number().nonnegative({ message: "Carga não pode ser negativa" }),
  data: z.coerce
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Data inválida, use formato ISO." }),
});

// Buscar todas as progressões de carga
export const listarProgressoes = async (req, res) => {
  try {
    const progressoes = await buscarTodos();
    res.status(200).json(progressoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar progressões de carga" });
  }
};

// Criar progressão de carga
export const criarProgressao = async (req, res) => {
  try {
    const dados = progressaoCargaSchema.parse(req.body);
    const resultado = await criar(dados);
    res.status(201).json({
      mensagem: "Progressão de carga criada com sucesso",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao criar progressão de carga", erro: error.message });
  }
};

// Atualizar progressão de carga
export const atualizarProgressao = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = progressaoCargaSchema.parse(req.body);
    const resultado = await atualizar(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Progressão de carga não encontrada" });
    }
    res.status(200).json({ mensagem: "Progressão de carga atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar progressão de carga", erro: error.message });
  }
};

// Remover progressão de carga
export const removerProgressao = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await remover(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Progressão de carga não encontrada" });
    }
    res.status(200).json({ mensagem: "Progressão de carga removida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover progressão de carga" });
  }
};