import Env from '@ioc:Adonis/Core/Env'
import ProjectNode from 'App/Models/ProjectNode'

const accountSid = Env.get('TWILIO_ACCOUNT_SID')
const authToken = Env.get('TWILIO_AUTH_TOKEN')
const twilioNumber = Env.get('TWILIO_NUMBER')

const client = require('twilio')(accountSid, authToken)

export const sendMessage = (to, message) => {
  // dont send if there is no message
  if (!message) return
  client.messages
    .create({
      from: `whatsapp:${twilioNumber}`,
      body: message,
      to: `whatsapp:${to}`,
    })
    .then((message) => console.log(message.sid))
}

export const getMessageFromNode: (node: ProjectNode | null) => string = (node: ProjectNode) => {
  if (!node) return ''
  return node.data['text'] || ''
}

export const getHookData = (data) => {
  // get bot message
  const text = data['Body']
  // get phone number
  const phoneNumber = data['WaId']
  // get channel
  const channel = 'whatsapp'
  return {
    text,
    phoneNumber,
    channel,
    sessionId: `${channel}:${phoneNumber}`,
  }
}
