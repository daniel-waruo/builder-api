import BaseController from 'App/Controllers/Http/BaseController'
import ProjectEdge from 'App/Models/ProjectEdge'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProjectEdgesController extends BaseController {
  public model = ProjectEdge
  public createSchema = schema.create({
    type: schema.string(),
    sourceId: schema.number(),
    targetId: schema.number(),
    projectId: schema.number(),
    data: schema.object().anyMembers(),
  })
  public updateSchema = schema.create({
    type: schema.string.optional(),
    sourceId: schema.string.optional(),
    targetId: schema.string.optional(),
    projectId: schema.number.optional(),
    data: schema.object.optional().anyMembers(),
  })
}
