import database from "../../db/connection.js";

// Buscar todos os alimentos consumidos
export async function buscarTodosConsumos() {
  try {
    const query = "SELECT * FROM alimentos_consumidos;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar alimentos consumidos");
  }
}

// Criar novo alimento consumido
export async function criarConsumo(dados) {
  try {
    const query = `
      INSERT INTO alimentos_consumidos (
        user_id, alimento_id, data_consumo, quantidade_gramas, refeicao, observacoes
      ) VALUES (?, ?, ?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.alimento_id,
      dados.data_consumo,
      dados.quantidade_gramas,
      dados.refeicao,
      dados.observacoes
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar registro de consumo de alimento");
  }
}

// Atualizar alimento consumido
export async function atualizarConsumo(id, dados) {
  try {
    const query = `
      UPDATE alimentos_consumidos SET
        user_id = ?,
        alimento_id = ?,
        data_consumo = ?,
        quantidade_gramas = ?,
        refeicao = ?,
        observacoes = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.alimento_id,
      dados.data_consumo,
      dados.quantidade_gramas,
      dados.refeicao,
      dados.observacoes,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar registro de consumo de alimento");
  }
}

// Remover registro de alimento consumido
export async function removerConsumo(id) {
  try {
    const query = "DELETE FROM alimentos_consumidos WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover registro de consumo de alimento");
  }
}