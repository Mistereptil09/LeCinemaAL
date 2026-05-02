import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ticket_uses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('ticket_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tickets')
        .onDelete('CASCADE')
      table
        .integer('screening_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('screenings')
        .onDelete('CASCADE')
      table.timestamp('used_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
