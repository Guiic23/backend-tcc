/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("avaliacoes", function(table) {
    table.increments("id").primary(); // ID único da avaliação
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.integer("trainer_id").notNullable().references("id").inTable("users");
    table.timestamp("data").notNullable();
    table.string("tipo").notNullable(); // Tipo de avaliação: "Desempenho", etc.
    table.integer("nota"); // Nota de 1 a 5 dada pelo personal trainer
    table.text("comentarios"); // Comentários gerais
    table.decimal("peso", 5, 2); // Peso do usuário (opcional)
    table.decimal("percentual_gordura", 5, 2); // Percentual de gordura (opcional)
    table.decimal("imc", 5, 2); // IMC (opcional)
    table.integer("treino_id").references("id").inTable("treinos"); // treino específico (opcional)
    table.text("observacoes_trainer"); // Observações do treinador
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("avaliacoes");
};