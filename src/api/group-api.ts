import request from 'superagent'
import { ICreateGroupFormData } from '../components/modal-create-group/modal-create-group'
import { api } from './api'
import { IGroup, IGroupMinimal } from './data/group'

export const groupApi = {
  create: async (data: ICreateGroupFormData) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.post(`${api.url}/group/create`).send(data))

      const result = response.body as IGroup
      result.messages = []
      result.typingUsers = []
      result.isLoaded = true
      result.hasMore = false

      await api.messaging.updateRooms()

      return result
    })
  },
  getAll: async () => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/group/all`))

      const result = response.body.groups as IGroupMinimal[]
      return result
    })
  },
  join: async (data: IGroupMinimal) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.post(`${api.url}/group/${data.id}/join`))

      await api.messaging.updateRooms()

      const result = response.body.group as IGroup
      const messages = await api.messaging.loadMessages(result, 0)

      result.messages = messages.messages
      result.isLoaded = true
      result.hasMore = messages.messages.length === api.messageLimit
      result.typingUsers = []

      return result
    })
  },
  leave: async (data: IGroupMinimal) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.post(`${api.url}/group/${data.id}/leave`))

      await api.messaging.updateRooms()

      const result = response.body.group as IGroup
      return result
    })
  },
}