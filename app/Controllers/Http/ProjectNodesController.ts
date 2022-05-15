import BaseController from 'App/Controllers/Http/BaseController'

import ProjectNode from 'App/Models/ProjectNode'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProjectNodesController extends BaseController {
  public model = ProjectNode

  public createSchema = schema.create({
    type: schema.string(),
    projectId: schema.number(),
    position: schema.object().members({
      x: schema.number(),
      y: schema.number(),
    }),
    data: schema.object().anyMembers(),
  })

  public updateSchema = schema.create({
    type: schema.string.optional(),
    projectId: schema.number.optional(),
    position: schema.object.optional().members({
      x: schema.number(),
      y: schema.number(),
    }),
    data: schema.object.optional().anyMembers(),
  })
}
