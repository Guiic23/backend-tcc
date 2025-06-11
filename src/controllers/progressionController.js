// progressionController.js
import { z } from "zod";
import { criar, buscarTodos, remover, atualizar } from "../models/progressionModel.js";

// Esquema de validação com Zod
const progressionSchema = z.object({
  data_progression: z.string().min(8, { message: "Data de progressão é obrigatória" }), // formato string ISO ou 'YYYY-MM-DD'
  peso: z.coerce.number().nonnegative({ message: "Peso deve ser positivo" }),
  percentual_gordura: z.coerce.number().min(0).max(100),
  observacoes: z.string().optional().nullable(),
  metas_alcancadas: z.string().optional().nullable(),
  foto_body: z.string().optional().nullable(), // se for uma url, pode usar .url().optional()
  imc_recente: z.coerce.number().nonnegative({ message: "IMC deve ser positivo" }),
});

// Listar todos os progressos
export const listarProgressos = async (req, res) => {
  try {
    const progressos = await buscarTodos();
    res.status(200).json(progressos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar progressos" });
  }
};

// Criar novo progresso
export const criarProgresso = async (req, res) => {
  try {
    const dados = progressionSchema.parse(req.body);
    const resultado = await criar(dados);
    res.status(201).json({
      mensagem: "Progresso criado com sucesso",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao criar progresso", erro: error.message });
  }
};

// Atualizar progresso
export const atualizarProgresso = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = progressionSchema.parse(req.body);
    const resultado = await atualizar(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Progresso não encontrado" });
    }

    res.status(200).json({ mensagem: "Progresso atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar progresso", erro: error.message });
  }
};

// Remover progresso
export const removerProgresso = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await remover(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Progresso não encontrado" });
    }

    res.status(200).json({ mensagem: "Progresso removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover progresso" });
  }
};