// models/progressionModel.js
import database from "../../db/connection.js";

// Buscar todos os progressos
export async function buscarTodos() {
  try {
    const query = "SELECT * FROM myprogression;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar progressos");
  }
}

// Criar novo progresso
export async function criar(dados) {
  try {
    const query = `
      INSERT INTO myprogression (
        data_progression,
        peso,
        percentual_gordura,
        observacoes,
        metas_alcancadas,
        foto_body,
        imc_recente
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.data_progression,
      dados.peso,
      dados.percentual_gordura,
      dados.observacoes,
      dados.metas_alcancadas,
      dados.foto_body,
      dados.imc_recente,
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar progresso");
  }
}

// Atualizar progresso
export async function atualizar(id, dados) {
  try {
    const query = `
      UPDATE myprogression SET 
        data_progression = ?, 
        peso = ?, 
        percentual_gordura = ?, 
        observacoes = ?, 
        metas_alcancadas = ?, 
        foto_body = ?, 
        imc_recente = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.data_progression,
      dados.peso,
      dados.percentual_gordura,
      dados.observacoes,
      dados.metas_alcancadas,
      dados.foto_body,
      dados.imc_recente,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar progresso");
  }
}

// Remover progresso
export async function remover(id) {
  try {
    const query = "DELETE FROM myprogression WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover progresso");
  }
}