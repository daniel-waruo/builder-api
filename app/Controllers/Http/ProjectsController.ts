import BaseController from 'App/Controllers/Http/BaseController'
import Project from 'App/Models/Project'
import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProjectFlow from 'App/Models/ProjectFlow'
import Database from '@ioc:Adonis/Lucid/Database'
import ProjectNode from 'App/Models/ProjectNode'

export default class ProjectsController extends BaseController {
  public model = Project

  public createSchema = schema.create({
    name: schema.string(),
    description: schema.string(),
  })

  public updateSchema = schema.create({
    name: schema.string.optional(),
    description: schema.string.optional(),
  })

  public async fetchFlow({ params, response }: HttpContextContract) {
    try {
      const project = await Project.find(params.id)
      if (!project) {
        return response.status(200).json({
          success: false,
          message: 'Project not found',
          data: null,
        })
      }
      const projectFlow = await ProjectFlow.firstOrNew(
        { projectId: project.id },
        { zoom: 1, projectId: project.id, position: { x: 0, y: 0 } }
      )
      return response.status(200).json({
        success: true,
        message: 'Success',
        data: projectFlow,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async updateFlow({ params, response, request }: HttpContextContract) {
    try {
      const updateFlowSchema = schema.create({
        zoom: schema.number(),
        position: schema.object().members({
          x: schema.number(),
          y: schema.number(),
        }),
      })
      const { zoom, position } = await request.validate({ schema: updateFlowSchema })
      const project = await Project.find(params.id)
      if (!project) {
        return response.status(200).json({
          success: false,
          message: 'Project not found',
          data: null,
        })
      }
      const projectFlow = await ProjectFlow.firstOrNew(
        { projectId: project.id },
        { zoom: 1, projectId: project.id }
      )
      // update the project flow and merge it
      await projectFlow.merge({
        zoom,
        position,
      })
      await projectFlow.save()
      return response.status(200).json({
        success: true,
        message: 'Success',
        data: projectFlow,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async fetchFlowElements({ params, response }: HttpContextContract) {
    try {
      const project = await Project.find(params.id)
      if (!project) {
        return response.status(200).json({
          success: false,
          message: 'Project not Found',
          data: null,
        })
      }
      // make sure there is a starting node
      await ProjectNode.firstOrCreate(
        { projectId: project.id },
        {
          type: 'start',
          data: {},
          position: { x: 600, y: 75 },
          projectId: project.id,
        }
      )
      const nodes = await project
        .related('nodes')
        .query()
        .select([Database.raw("CONCAT('node-',id) AS id"), 'type', 'data', 'position'])
      const edges = await Database.from('project_edges')
        .select([
          Database.raw("CONCAT('edge-',id) AS id"),
          'type',
          'data',
          Database.raw("CONCAT('node-',target_id) AS target"),
          Database.raw("CONCAT('node-',source_id) AS source"),
        ])
        .where('project_id', project.id)

      return response.status(200).json({
        success: true,
        message: 'Success',
        data: [...nodes, ...edges],
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
