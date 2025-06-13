/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('progressao_carga', function (table) {
    table.increments('id').primary(); // ID único e autoincrementável
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('treino_id').notNullable().references('id').inTable('treinos');
    table.decimal('carga', 5, 2).notNullable();
    table.timestamp('data').notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('progressao_carga');
}
