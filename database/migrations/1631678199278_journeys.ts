import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Journeys extends BaseSchema {
  protected tableName = 'journeys'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description')
      table.float('zoom')
      table.json('flow_position').notNullable()
      table.json('node_position').notNullable()
      table.integer('project_id').references('projects.id').notNullable().onDelete('cascade')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
