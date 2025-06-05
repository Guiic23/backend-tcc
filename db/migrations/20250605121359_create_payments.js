/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('payments', (table) => {
      table.increments('id').primary(); // id integer [primary key, increment]
      table.integer('user_id').notNullable().comment('quem realizou o pagamento'); // user_id integer [not null]
      table.integer('user_control').comment('usuário que criou o registro'); // user_control integer
      table.float('value').notNullable(); // value real [not null]
      table.text('receipt').notNullable(); // receipt text [not null]
      table.text('obs'); // obs text
      table.timestamp('paymentdate').notNullable(); // paymentdate timestamp [not null]
      table.boolean('verified').defaultTo(false).comment('verificado'); // verified boolean [default: false]
      table.text('photo').comment('link para foto comprovante'); // photo text
      table.timestamp('created_at').defaultTo(knex.fn.now()); // created_at timestamp [default: CURRENT_TIMESTAMP]
      table.timestamp('updated_at'); // updated_at timestamp
  
      // Índices
      table.index(['paymentdate'], 'all_payment_of_date');
      table.index(['value'], 'range_of_value');
      table.index(['paymentdate', 'value'], 'all_payment_between_date_and_value');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTable('payments');
  }
  