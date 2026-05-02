import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'screenings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('movie_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('movies')
        .onDelete('CASCADE')
      table
        .integer('room_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('rooms')
        .onDelete('CASCADE')
      table.timestamp('start_at').notNullable()
      table.timestamp('end_at').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
