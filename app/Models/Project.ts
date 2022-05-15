import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProjectFlow from 'App/Models/ProjectFlow'
import ProjectNode from 'App/Models/ProjectNode'
import ProjectEdge from 'App/Models/ProjectEdge'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @hasOne(() => ProjectFlow)
  public flow: HasOne<typeof ProjectFlow>

  @hasMany(() => ProjectNode)
  public nodes: HasMany<typeof ProjectNode>

  @hasMany(() => ProjectEdge)
  public edges: HasMany<typeof ProjectEdge>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
