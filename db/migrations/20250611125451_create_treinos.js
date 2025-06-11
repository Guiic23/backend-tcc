/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("treinos", function(table) {
    table.increments("id").primary(); // ID único para cada treino
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.timestamp("data").notNullable(); // Data e hora do treino
    table.string("exercicio").notNullable(); // Nome do exercício
    table.decimal("carga", 5, 2).notNullable(); // Peso utilizado (kg)
    table.integer("repeticiones").notNullable(); // Número de repetições feitas
    table.integer("series").notNullable(); // Número de séries realizadas
    table.text("observacoes"); // Observações sobre o treino (opcional)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("treinos");
};