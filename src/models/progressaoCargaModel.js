import database from "../../db/connection.js";

// Buscar todas as progressões de carga
export async function buscarTodos() {
  try {
    const query = "SELECT * FROM progressao_carga;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar progressões de carga");
  }
}

// Criar nova progressão de carga
export async function criar(dados) {
  try {
    const query = `
      INSERT INTO progressao_carga (
        user_id, treino_id, carga, data
      ) VALUES (?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.treino_id,
      dados.carga,
      dados.data
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar progressão de carga");
  }
}

// Atualizar progressão de carga
export async function atualizar(id, dados) {
  try {
    const query = `
      UPDATE progressao_carga SET 
        user_id = ?, 
        treino_id = ?, 
        carga = ?, 
        data = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.treino_id,
      dados.carga,
      dados.data,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar progressão de carga");
  }
}

// Remover progressão de carga
export async function remover(id) {
  try {
    const query = "DELETE FROM progressao_carga WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover progressão de carga");
  }
}