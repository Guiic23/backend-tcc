/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('myprogression', function(table) {
    table.increments('id').primary();
    table.date('data_progression').notNullable();
    table.decimal('peso', 5, 2).notNullable();
    table.decimal('percentual_gordura', 5, 2).notNullable();
    table.text('observacoes');
    table.text('metas_alcancadas');
    table.string('foto_body');
    table.decimal('imc_recente', 5, 2).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('myprogression');
};