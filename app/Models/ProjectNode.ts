import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProjectNode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column({ serializeAs: 'projectId' })
  public projectId: number

  @column()
  public position: { x: number; y: number }

  @column()
  public data: {}

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
