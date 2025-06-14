import { z } from "zod";
import {
  criarConsumo,
  buscarTodosConsumos,
  atualizarConsumo,
  removerConsumo,
} from "../models/alimentosConsumidosModel.js";

// Esquema de validação Zod para alimentos_consumidos
const consumoSchema = z.object({
  user_id: z.coerce.number().int().positive({ message: "user_id é obrigatório" }),
  alimento_id: z.coerce.number().int().positive({ message: "alimento_id é obrigatório" }),
  data_consumo: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "data_consumo deve ser uma data válida (yyyy-mm-dd)",
  }),
  quantidade_gramas: z.coerce.number().positive({ message: "Quantidade (g) obrigatória" }),
  refeicao: z.string().min(1, { message: "Refeição é obrigatória" }),
  observacoes: z.string().optional(),
});

// Buscar todos os alimentos consumidos
export const listarConsumos = async (req, res) => {
  try {
    const consumos = await buscarTodosConsumos();
    res.status(200).json(consumos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar alimentos consumidos" });
  }
};

// Criar registro de alimento consumido
export const criarConsumoController = async (req, res) => {
  try {
    const dados = consumoSchema.parse(req.body);
    const resultado = await criarConsumo(dados);
    res.status(201).json({
      mensagem: "Consumo registrado com sucesso",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao registrar consumo", erro: error.message });
  }
};

// Atualizar registro de alimento consumido
export const atualizarConsumoController = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = consumoSchema.parse(req.body);
    const resultado = await atualizarConsumo(id, dados);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Registro de consumo não encontrado" });
    }

    res.status(200).json({ mensagem: "Consumo atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensagem: "Erro ao atualizar consumo", erro: error.message });
  }
};

// Remover registro de alimento consumido
export const removerConsumoController = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await removerConsumo(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ mensagem: "Registro de consumo não encontrado" });
    }

    res.status(200).json({ mensagem: "Registro de consumo removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao remover consumo" });
  }
};