import { z } from "zod";
import { criar, buscarTodos, remover, atualizar } from "../models/alimentosModel.js";

// Esquema de validação com Zod
const alimentoSchema = z.object({
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  categoria: z.string().optional(),
  calorias: z.coerce.number().nonnegative(),
  proteinas: z.coerce.number().nonnegative(),
  carboidratos: z.coerce.number().nonnegative(),
  gorduras: z.coerce.number().nonnegative(),
  fibra: z.coerce.number().nonnegative().optional(),
  imagem: z.string().url().optional(),
});

// Buscar todos os alimentos
export const listarAlimentos = async (req, res) => {
  try {
    const alimentos = await buscarTodos();
    res.status(200).json(alimentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar alimentos" });
  }
};

// Criar novo alimento
export const criarAlimento = async (req, res) => {
  try {
    const dados = alimentoSchema.parse(req.body);
    const resultado = await criar(dados);
    res.status(201).json({
      mensagem: "Alimento criado com sucesso",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao criar alimento", erro: error.message });
  }
};

// Atualizar alimento
export const atualizarAlimento = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = alimentoSchema.parse(req.body);
    const resultado = await atualizar(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Alimento não encontrado" });
    }

    res.status(200).json({ mensagem: "Alimento atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar alimento", erro: error.message });
  }
};

// Remover alimento
export const removerAlimento = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await remover(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Alimento não encontrado" });
    }

    res.status(200).json({ mensagem: "Alimento removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover alimento" });
  }
};
