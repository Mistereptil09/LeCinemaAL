import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.integer('capacity').notNullable()
      table.text('description').nullable()
      table.boolean('has_disabled_access').notNullable().defaultTo(false)
      table.boolean('is_under_maintenance').notNullable().defaultTo(false)
      table.jsonb('images').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
