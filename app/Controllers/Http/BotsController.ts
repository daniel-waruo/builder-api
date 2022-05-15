import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import ProjectNode from 'App/Models/ProjectNode'
import Session from 'App/Models/Session'
import { getHookData, getMessageFromNode, sendMessage } from 'App/Helpers/messages'
import { getNextNode, resetSession, setNextNode } from 'App/Helpers/session'
import Logger from '@ioc:Adonis/Core/Logger'

export default class BotsController {
  public async webHook({ params, response, request }: HttpContextContract) {
    try {
      const data = await request.all()
      const { sessionId, text, phoneNumber } = getHookData(data)
      sendMessage(phoneNumber, 'processing...')
      Project.query()
        .select('id')
        .where('id', params.id)
        .first()
        .then(async (project) => {
          if (!project) {
            return response.status(200).json({
              success: false,
              message: 'Project not Found',
              data: null,
            })
          }
          // get or create a session
          const session = await Session.firstOrCreate(
            {
              id: sessionId,
              projectId: project.id,
            },
            {
              id: sessionId,
              projectId: project.id,
            }
          )
          const triggers = ['hi', 'aar']
          // reset session if necessary
          if (triggers.find((trigger) => trigger === text.toLowerCase().trim())) {
            Logger.info('reset the session if ')
            await resetSession(session)
          }
          let currentNode: ProjectNode
          // if the session has no current node start all over
          if (!session.nodeId) {
            Logger.info('New Session Started')
            // TODO: use joins to fasten query
            // make sure there is a starting node
            currentNode = await ProjectNode.firstOrCreate(
              { projectId: project.id, type: 'start' },
              {
                type: 'start',
                data: {},
                position: { x: 600, y: 75 },
                projectId: project.id,
              }
            )
          } else {
            Logger.info('Use saved session')
            // get current node
            currentNode = await ProjectNode.query().where('id', session.nodeId).firstOrFail()
          }
          // the previous node has already been rendered
          // render the current node
          let { nextNode, processEnd } = await getNextNode(currentNode, text)
          if (nextNode) {
            Logger.info('We have a new node')
            // set the current node as the next one
            await setNextNode(nextNode, session)
          } else if (!processEnd) {
            // if the user has used an invalid input
            sendMessage(phoneNumber, 'Invalid Input')
            nextNode = currentNode
          } else {
            // this meands the session has ended
            await resetSession(session)
          }
          const message = getMessageFromNode(nextNode)
          if (!message) {
            await resetSession(session)
          }
          sendMessage(phoneNumber, message)
        })
        .catch((error) => {
          console.log(error)
        })
      // get the node connected and set it to state
      return response.status(200).json({
        success: true,
        message: 'Success',
        data: {},
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
