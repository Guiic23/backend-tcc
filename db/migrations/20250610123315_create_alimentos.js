/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('alimentos', function(table) {
    table.increments('id').primary(); // ID único do alimento
    table.string('nome').notNullable().unique(); // Nome do alimento único
    table.string('categoria'); // Categoria (opcional)
    table.decimal('calorias', 6, 2); // Calorias por 100g
    table.decimal('proteinas', 5, 2); // Proteínas por 100g
    table.decimal('carboidratos', 5, 2); // Carboidratos por 100g
    table.decimal('gorduras', 5, 2); // Gorduras por 100g
    table.decimal('fibra', 5, 2); // Fibras por 100g (opcional)
    table.string('imagem'); // Link para imagem (opcional)
  });
};

export async function down(knex) {
  return knex.schema.dropTable('alimentos');
};