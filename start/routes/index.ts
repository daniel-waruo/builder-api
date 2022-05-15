import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * PROJECTS URLS
   */
  Route.group(() => {
    Route.get('/', 'ProjectsController.index')
    Route.post('/', 'ProjectsController.store')
    Route.get('/:id', 'ProjectsController.show')
    Route.put('/:id', 'ProjectsController.update')
    Route.delete('/:id', 'ProjectsController.destroy')

    /**
     * PROJECT FLOW URLS
     */
    Route.group(() => {
      Route.get('/', 'ProjectsController.fetchFlow')
      Route.put('/', 'ProjectsController.updateFlow')
      Route.get('/elements', 'ProjectsController.fetchFlowElements')
    }).prefix('/:id/flow')

    /**
     * WHATSAPP BOT CALLBACK
     */
    Route.post('/:id/bot', 'BotsController.webHook')
  }).prefix('projects')

  /**
   * NODE URLS
   */
  Route.group(() => {
    Route.get('/', 'ProjectNodesController.index')
    Route.post('/', 'ProjectNodesController.store')
    Route.get('/:id', 'ProjectNodesController.show')
    Route.put('/:id', 'ProjectNodesController.update')
    Route.delete('/:id', 'ProjectNodesController.destroy')
  }).prefix('nodes')

  /**
   * EDGES URLS
   */
  Route.group(() => {
    Route.get('/', 'ProjectEdgesController.index')
    Route.post('/', 'ProjectEdgesController.store')
    Route.get('/:id', 'ProjectEdgesController.show')
    Route.put('/:id', 'ProjectEdgesController.update')
    Route.delete('/:id', 'ProjectEdgesController.destroy')
  }).prefix('edges')
}).prefix('/api/v1')
