import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProjectFlows extends BaseSchema {
  protected tableName = 'project_flows'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('zoom')
      table.json('position')
      table.integer('project_id').references('projects.id').onDelete('cascade').unique()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
