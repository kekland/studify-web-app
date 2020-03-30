import request from 'superagent'
import { IGroupMinimal, IGroup } from './data/group'
import { api } from './api'
import { IMessageSocket, ISendMessageFormData, ISentMessage } from './data/message'
import { IUserMinimal, IUserOwner } from './data/user'
import { uuid } from 'uuidv4'
import { IPaginatedQuery } from './data/utils'
import io from 'socket.io-client'

export const messagingApi = {
  /* @deprecated */
  loadMessages: async (group: IGroupMinimal, query: IPaginatedQuery) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/group/${group.id}/messages`).query(api.normalizeQuery(query)))

      const messages = response.body.messages as IMessageSocket[]
      return { id: group.id, messages }
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
  closeSocket: async () => {
    if (api.socket)
      api.socket.disconnect()
    api.socket = undefined
  },
  updateRooms: async () => {
    api.socket?.emit('updateRooms')
  },
  sendMessage: async (groupId: string, data: ISendMessageFormData, user: IUserOwner, onPreview: (data: ISentMessage) => void) => {
    return api.requestWrapper(async () => {
      const idempotencyId = uuid()

      let req = request.post(`${api.url}/messaging/send`)
        .field('groupId', groupId)
        .field('body', data.body)
        .field('idempotencyId', idempotencyId)

      data.attachments.files.forEach((file, i) => req = req.field(`file-${i}`, file))

      onPreview({
        id: idempotencyId,
        loading: true,
        idempotencyId,
        attachments: data.attachments.files.map((file) => ({ type: 'file', rel: 'loading', additional: { name: file.name } })),
        user,
        body: data.body,
        created: Date(),
        groupId,
      })

      const response = await api.setHeader(req)
      return { ...response.body.message, idempotencyId: response.body.idempotencyId } as IMessageSocket
    })
  },
  updateTypingStatus: async (group: IGroup, status: boolean) => {
    api.socket?.emit('updateTypingStatus', { room: group.id, status })
  },
}
