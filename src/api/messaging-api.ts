import request from 'superagent'
import { IGroupMinimal, IGroup } from './data/group'
import { api } from './api'
import { IMessageSocket, ISendMessageFormData, ISentMessage } from './data/message'
import { IUserMinimal } from './data/user'
import { uuid } from 'uuidv4'
import { IPaginatedQuery } from './data/utils'

export const messagingApi = {
  /* @deprecated */
  loadMessages: async (group: IGroupMinimal, query: IPaginatedQuery) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/group/${group.id}/messages`).query(api.normalizeQuery(query)))

      const messages = response.body.messages as IMessageSocket[]
      return { id: group.id, messages: messages.reverse() }
    })
  },
  attach: async (
    callbacks: {
      onNewGroupMessage: (message: IMessageSocket) => void,
      onMessageSent: (message: ISentMessage) => void,
      onUserTypingStatusUpdated: (data: { user: IUserMinimal, status: boolean, groupId: string }) => void,
      onGroupChange: (data: IGroupMinimal) => void,
    }) => {
    api.socket = io(api.socketUrl, { query: { token: api.getToken() } })

    api.socket.on('onNewGroupMessage', (data: { message: IMessageSocket }) => {
      callbacks.onNewGroupMessage(data.message)
    })

    api.socket.on('onMessageSent', (data: { message: IMessageSocket, idempotencyId: string }) => {
      let message = { ...data.message, idempotencyId: data.idempotencyId, loading: false } as ISentMessage
      callbacks.onMessageSent(message)
    })

    api.socket.on('onUserTypingStatusUpdated', callbacks.onUserTypingStatusUpdated)
    api.socket.on('onGroupChange', callbacks.onGroupChange)

    api.socket.connect()
  },
  updateRooms: async () => {
    api.socket?.emit('updateRooms')
  },
  sendMessage: async (groupId: string, data: ISendMessageFormData) => {
    const user = api.getUser()
    if (!user) throw Error('No user login')

    const idempotencyId = uuid()

    api.socket?.emit('sendMessage', { ...data, groupId, idempotencyId })
    return {
      id: idempotencyId,
      groupId: groupId,
      body: data.body,
      attachments: data.attachments,
      created: new Date().toISOString(),
      idempotencyId,
      loading: true,
      user,
    } as ISentMessage
  },
  updateTypingStatus: async (group: IGroup, status: boolean) => {
    api.socket?.emit('updateTypingStatus', { room: group.id, status })
  },
}
