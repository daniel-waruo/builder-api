import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'

export default class ProjectFlow extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public zoom: number

  @column()
  public position: { x: number; y: number }

  @column({ serializeAs: 'projectId' })
  public projectId: number

  @hasOne(() => Project)
  public project: HasOne<typeof Project>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
