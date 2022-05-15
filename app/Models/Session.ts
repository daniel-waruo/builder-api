import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'nodeId' })
  public nodeId: number

  @column()
  public state: {}

  @column({ serializeAs: 'projectId' })
  public projectId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
