import database from "../../db/connection.js";

// Buscar todos os personal trainers
export async function buscarTodos() {
  try {
    const query = "SELECT * FROM personal_trainers;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar personal trainers");
  }
}

// Criar novo personal trainer
export async function criar(dados) {
  try {
    const query = `
      INSERT INTO personal_trainers (
        user_id, especialidade, anos_experiencia, certificacao, disponibilidade, bio, foto_avatar, rating
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.especialidade,
      dados.anos_experiencia,
      dados.certificacao,
      dados.disponibilidade,
      dados.bio,
      dados.foto_avatar,
      dados.rating
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar personal trainer");
  }
}

// Atualizar personal trainer
export async function atualizar(id, dados) {
  try {
    const query = `
      UPDATE personal_trainers SET 
        user_id = ?, 
        especialidade = ?, 
        anos_experiencia = ?, 
        certificacao = ?, 
        disponibilidade = ?, 
        bio = ?, 
        foto_avatar = ?, 
        rating = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.user_id,
      dados.especialidade,
      dados.anos_experiencia,
      dados.certificacao,
      dados.disponibilidade,
      dados.bio,
      dados.foto_avatar,
      dados.rating,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar personal trainer");
  }
}

// Remover personal trainer
export async function remover(id) {
  try {
    const query = "DELETE FROM personal_trainers WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover personal trainer");
  }
}