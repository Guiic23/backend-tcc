import database from "../../db/connection.js";

// Buscar todos os alimentos
export async function buscarTodos() {
  try {
    const query = "SELECT * FROM alimentos;";
    const statement = database.prepare(query);
    return statement.all();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar alimentos");
  }
}

// Criar novo alimento
export async function criar(dados) {
  try {
    const query = `
      INSERT INTO alimentos (
        nome, categoria, calorias, proteinas, carboidratos, gorduras, fibra, imagem
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.nome,
      dados.categoria,
      dados.calorias,
      dados.proteinas,
      dados.carboidratos,
      dados.gorduras,
      dados.fibra,
      dados.imagem
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar alimento");
  }
}

// Atualizar alimento
export async function atualizar(id, dados) {
  try {
    const query = `
      UPDATE alimentos SET 
        nome = ?, 
        categoria = ?, 
        calorias = ?, 
        proteinas = ?, 
        carboidratos = ?, 
        gorduras = ?, 
        fibra = ?, 
        imagem = ?
      WHERE id = ?;
    `;
    const statement = database.prepare(query);
    return statement.run(
      dados.nome,
      dados.categoria,
      dados.calorias,
      dados.proteinas,
      dados.carboidratos,
      dados.gorduras,
      dados.fibra,
      dados.imagem,
      id
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar alimento");
  }
}

// Remover alimento
export async function remover(id) {
  try {
    const query = "DELETE FROM alimentos WHERE id = ?;";
    const statement = database.prepare(query);
    return statement.run(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover alimento");
  }
}
