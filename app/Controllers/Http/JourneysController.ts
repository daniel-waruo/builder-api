import { schema } from '@ioc:Adonis/Core/Validator'
import Journey from 'App/Models/Journey'

export default class JourneysController {
  public model = Journey
  public createSchema = schema.create({
    name: schema.string(),
    description: schema.string(),
    zoom: schema.number(),
    flowPosition: schema.object().members({
      x: schema.number(),
      y: schema.number(),
    }),
    nodePosition: schema.object().members({
      x: schema.number(),
      y: schema.number(),
    }),
  })
  public updateSchema = schema.create({
    name: schema.string.optional(),
    description: schema.string.optional(),
    zoom: schema.number.optional(),
    flowPosition: schema.object.optional().members({
      x: schema.number(),
      y: schema.number(),
    }),
    nodePosition: schema.object.optional().members({
      x: schema.number(),
      y: schema.number(),
    }),
  })
}
