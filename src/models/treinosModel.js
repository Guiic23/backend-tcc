import database from "../../db/connection.js";

// Buscar todos os treinos
export async function buscarTodos() {
  try {
    const query = "SELECT * FROM treinos;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar treinos");
  }
}

// Criar novo treino
export async function criar(dados) {
  try {
    const query = `
      INSERT INTO treinos (
        user_id, data, exercicio, carga, repeticiones, series, observacoes
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.data,
      dados.exercicio,
      dados.carga,
      dados.repeticiones,
      dados.series,
      dados.observacoes
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar treino");
  }
}

// Atualizar treino
export async function atualizar(id, dados) {
  try {
    const query = `
      UPDATE treinos SET 
        user_id = ?, 
        data = ?, 
        exercicio = ?, 
        carga = ?, 
        repeticiones = ?, 
        series = ?, 
        observacoes = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.data,
      dados.exercicio,
      dados.carga,
      dados.repeticiones,
      dados.series,
      dados.observacoes,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar treino");
  }
}

// Remover treino
export async function remover(id) {
  try {
    const query = "DELETE FROM treinos WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover treino");
  }
}