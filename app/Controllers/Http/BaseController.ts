import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class BaseController {
  public model = BaseModel
  /* list of lists containing orderBys  {column:'column_name',order:'asc' |'desc'} */
  public orderBy = []
  public createSchema = schema.create({})
  public updateSchema = schema.create({})

  /**
   *  function to be run on every request
   *  */
  public preFunction(_context: HttpContextContract) {
    // console.log(context)
    return
  }

  /**
   * Show a list of all objects in the model
   * GET objects
   *
   * @return {JSON}
   * @param context
   */
  public async index(context: HttpContextContract) {
    const { response, params } = context
    try {
      this.preFunction(context)
      const { page, limit } = params
      const data = await this.model.query().select().orderBy(this.orderBy).paginate(page, limit)
      return response.status(200).json({
        success: true,
        message: 'Success',
        data,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Create/Save a new object
   * POST objects
   *
   * @return {JSON}
   * @param context
   */
  public async store(context: HttpContextContract) {
    const { response, request } = context
    try {
      this.preFunction(context)
      const payload = await request.validate({ schema: this.createSchema })
      const object = await this.model.create(payload)
      return response.status(200).json({
        success: true,
        message: 'Success',
        data: object,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Display a single Object
   * GET objects/:id
   *
   * @return {[type]}    [description]
   * @param context
   */
  public async show(context: HttpContextContract) {
    const { params, response } = context
    try {
      this.preFunction(context)
      const object = await this.model.find(params.id)
      if (!object) {
        return response.status(200).json({
          success: false,
          message: 'Object not found',
          data: null,
        })
      }
      return response.status(200).json({
        success: true,
        message: 'Success',
        data: object,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Query and retrieve an object by it's ID and Update
   *
   * PUT or PATCH objects/:id
   *
   * @return {[type]}    [description]
   * @param context
   */
  public async update(context: HttpContextContract) {
    const { params, request, response } = context
    try {
      this.preFunction(context)
      const payload = await request.validate({ schema: this.updateSchema })
      const object = await this.model.find(params.id)
      if (!object) {
        return response.status(200).json({
          success: false,
          message: 'Object not found',
          data: null,
        })
      }
      object.merge({ id: params.id, ...payload })
      await object.save()

      return response.status(200).json({
        success: true,
        message: 'Successfully updated',
        data: object,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Query, retrieve an object by it's ID and Delete
   *
   * DELETE objects/:id
   *
   * @return {[type]}    [description]
   * @param context
   */
  public async destroy(context: HttpContextContract) {
    const { params, response } = context
    try {
      this.preFunction(context)
      const object = await this.model.find(params.id)
      if (!object) {
        return response.status(404).json({
          success: false,
          message: 'Object not found',
          data: null,
        })
      }
      await object.delete()

      return response.status(200).json({
        success: true,
        message: 'Successfully deleted',
        data: null,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
