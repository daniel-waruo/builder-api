import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProjectNode from 'App/Models/ProjectNode'

export default class ProjectEdge extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column({ serializeAs: 'sourceId' })
  public sourceId: number

  @hasOne(() => ProjectNode, { localKey: 'sourceId' })
  public source: HasOne<typeof ProjectNode>

  @column({ serializeAs: 'targetId' })
  public targetId: number

  @hasOne(() => ProjectNode, { localKey: 'targetId' })
  public target: HasOne<typeof ProjectNode>

  @column({ serializeAs: 'projectId' })
  public projectId: number

  @column()
  public data: {}

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
