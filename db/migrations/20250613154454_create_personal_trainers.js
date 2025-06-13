/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex){
  return knex.schema.createTable('personal_trainers', function(table) {
    table.increments('id').primary();                // ID único
    table.integer('user_id').notNullable().unique(); // Relacionamento 1-1 com users
    table.string('especialidade');                   // Ex: musculação, yoga
    table.integer('anos_experiencia');               // Anos de experiência
    table.string('certificacao');                    // Certificação
    table.string('disponibilidade');                 // Horários
    table.text('bio');                              // Descrição do Personal
    table.string('foto_avatar');                     // Link do avatar
    table.decimal('rating', 3, 2);                   // Ex: 4.75

    // Se existir tabela users, você pode descomentar a foreign key abaixo:
    // table.foreign('user_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('personal_trainers');
};
