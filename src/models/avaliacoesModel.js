import database from "../../db/connection.js";

// Buscar todas as avaliações
export async function buscarTodos() {
  try {
    const query = "SELECT * FROM avaliacoes;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar avaliações");
  }
}

// Criar nova avaliação
export async function criar(dados) {
  try {
    const query = `
      INSERT INTO avaliacoes (
        user_id, trainer_id, data, tipo, nota, comentarios, peso, percentual_gordura, imc, treino_id, observacoes_trainer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.trainer_id,
      dados.data,
      dados.tipo,
      dados.nota, // pode ser undefined/null
      dados.comentarios,
      dados.peso,
      dados.percentual_gordura,
      dados.imc,
      dados.treino_id,
      dados.observacoes_trainer
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar avaliação");
  }
}

// Atualizar avaliação
export async function atualizar(id, dados) {
  try {
    const query = `
      UPDATE avaliacoes SET 
        user_id = ?, 
        trainer_id = ?, 
        data = ?, 
        tipo = ?, 
        nota = ?, 
        comentarios = ?, 
        peso = ?, 
        percentual_gordura = ?, 
        imc = ?, 
        treino_id = ?, 
        observacoes_trainer = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.trainer_id,
      dados.data,
      dados.tipo,
      dados.nota,
      dados.comentarios,
      dados.peso,
      dados.percentual_gordura,
      dados.imc,
      dados.treino_id,
      dados.observacoes_trainer,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar avaliação");
  }
}

// Remover avaliação
export async function remover(id) {
  try {
    const query = "DELETE FROM avaliacoes WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover avaliação");
  }
}