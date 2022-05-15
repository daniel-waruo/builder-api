import ProjectNode from 'App/Models/ProjectNode'
import Session from 'App/Models/Session'
import ProjectEdge from 'App/Models/ProjectEdge'
import Logger from '@ioc:Adonis/Core/Logger'

async function getNextNode(node: ProjectNode, userInput: string) {
  let nextNode: ProjectNode | null = null
  let processEnd: boolean = true
  // check if it is a starting node
  if (node.type === 'start') {
    Logger.info('This is a Trigger node')
    // this is the first node as its the trigger
    const edge = await ProjectEdge.query().where('source_id', node.id).firstOrFail()
    // get the target node
    nextNode = await ProjectNode.query().where('id', edge.targetId).firstOrFail()
  } else {
    // if its any other type of node deal with it here
    // get all the edges connected to the node
    // TODO: change edge design to make sure keyWord is a field
    // TODO: to avoid me having to load all edges
    const nodeEdges = await ProjectEdge.query()
      .select(['data', 'target_id', 'type'])
      .where('source_id', node.id)
    if (nodeEdges.length) {
      Logger.info('There are nodes connected to this')
      // set process end
      processEnd = false
      console.log(nodeEdges)
      // this is the edge that corresponds to user input
      const currentEdge = nodeEdges.find(({ data }) => {
        return data['keyWord'] === userInput.trim().toLowerCase()
      })
      if (currentEdge) {
        Logger.info('We have found Current Edge')
        // this means the user input corresponds to a node
        nextNode = await ProjectNode.findOrFail(currentEdge.targetId)
      }
    } else {
      Logger.info('There are no nodes added')
    }
  }
  return {
    nextNode,
    processEnd,
  }
}

async function resetSession(session: Session) {
  await session.merge({
    nodeId: undefined,
    state: {},
  })
  await session.save()
  return session
}
async function setNextNode(node: ProjectNode, session: Session) {
  await session.merge({
    nodeId: node.id,
    state: {},
  })
  await session.save()
  return session
}
export { getNextNode, setNextNode, resetSession }
