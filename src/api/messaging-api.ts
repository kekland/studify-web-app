import request from 'superagent'
import { IGroupMinimal, IGroup } from './data/group'
import { api } from './api'
import { IMessageSocket, ISendMessageFormData } from './data/message'
import { IUserMinimal, IUserOwner } from './data/user'
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
      onMessageSent: (message: IMessageSocket) => void,
      onUserTypingStatusUpdated: (data: { user: IUserMinimal, status: boolean, groupId: string }) => void,
      onGroupChange: (data: IGroupMinimal) => void,
    }) => {
    api.socket = io(api.socketUrl, { query: { token: api.getToken() } })

    api.socket.on('onNewGroupMessage', (data: { message: IMessageSocket }) => {
      callbacks.onNewGroupMessage(data.message)
    })

    api.socket.on('onMessageSent', (data: { message: IMessageSocket, idempotencyId: string }) => {
      let message = { ...data.message, idempotencyId: data.idempotencyId, loading: false }
      callbacks.onMessageSent(message)
    })

    api.socket.on('onUserTypingStatusUpdated', callbacks.onUserTypingStatusUpdated)
    api.socket.on('onGroupChange', callbacks.onGroupChange)

    api.socket.connect()
  },
  updateRooms: async () => {
    api.socket?.emit('updateRooms')
  },
  sendMessage: async (user: IUserOwner, data: ISendMessageFormData) => {
    const idempotencyId = uuid()

    api.socket?.emit('sendMessage', { ...data, idempotencyId })
    return {
      id: idempotencyId,
      groupId: data.groupId,
      body: data.body,
      attachments: data.attachments,
      created: new Date().toISOString(),
      idempotencyId,
      loading: true,
      user,
    } as IMessageSocket
  },
  updateTypingStatus: async (group: IGroup, status: boolean) => {
    api.socket?.emit('updateTypingStatus', { room: group.id, status })
  },
}
