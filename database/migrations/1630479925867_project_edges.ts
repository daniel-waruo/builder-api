import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProjectEdges extends BaseSchema {
  protected tableName = 'project_edges'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('type').notNullable()
      table.integer('source_id').notNullable().references('project_nodes.id').onDelete('cascade')
      table.integer('target_id').notNullable().references('project_nodes.id').onDelete('cascade')
      table.integer('project_id').notNullable().references('projects.id').onDelete('cascade')
      table.json('data').notNullable()
      table.unique(['source_id', 'target_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
