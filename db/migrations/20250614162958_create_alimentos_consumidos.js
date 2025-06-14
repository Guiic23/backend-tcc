// migration: create_alimentos_consumidos

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  await knex.schema.createTable('alimentos_consumidos', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('alimento_id')
      .notNullable()
      .references('id')
      .inTable('alimentos')
      .onDelete('CASCADE');
    table.date('data_consumo').notNullable();
    table.decimal('quantidade_gramas', 6, 2).notNullable();
    table.string('refeicao');
    table.text('observacoes');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('alimentos_consumidos');
}