import request from 'superagent'
import { ICreateGroupData } from '../components/modal-create-group/modal-create-group'
import { api } from './api'
import { IGroup, IGroupMinimal, IGroupExtended } from './data/group'
import { IMessageSocket } from './data/message'
import { DateOrString, IPaginatedQuery } from './data/utils'
import { IUserMinimal } from './data/user'

interface IGroupLoadDataResponse {
  group: IGroup,
  lastMessages: IMessageSocket[],
  unreadMessages: number,
  mutedUntil: DateOrString
}

export const groupApi = {
  initializeGroup: (group: IGroup,
    data?: {
      lastMessages?: IMessageSocket[],
      isLoaded?: boolean,
      hasMore?: boolean,
      unreadMessages?: number,
    }): IGroupExtended => {
    return {
      data: group,
      messages: data?.lastMessages ?? [],
      typingUsers: {},
      isLoaded: data?.isLoaded ?? true,
      hasMore: data?.hasMore ?? api.hasMore(data?.lastMessages),
      unreadMessages: data?.unreadMessages ?? 0,
    } as IGroupExtended
  },
  create: async (data: ICreateGroupData) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.post(`${api.url}/group/create`).send(data))

      const result = groupApi.initializeGroup(response.body as IGroup, { hasMore: false, isLoaded: true })
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
      const initData = await groupApi.loadData(result)

      return groupApi.initializeGroup(result, { ...initData, isLoaded: true })
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
  loadAllData: async () => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/group/loadAllData`))
      const result = response.body.data as IGroupLoadDataResponse[]
      result.forEach(group => group.lastMessages = group.lastMessages.reverse())
      return result
    })
  },
  loadData: async (group: IGroupMinimal) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/group/${group.id}/loadData`))
      const result = response.body as IGroupLoadDataResponse
      result.lastMessages = result.lastMessages.reverse()
      return result
    })
  },
  getUsers: async (group: IGroupMinimal, query: IPaginatedQuery) => {
    return api.requestWrapper(async () => {
      const response = await api.setHeader(request.get(`${api.url}/group/${group.id}/users`).query(api.normalizeQuery(query)))

      const result = response.body.users as IUserMinimal[]
      return result
    })
  },
  setAsRead: async (groupId: string) => {
    return api.requestWrapper(async () => {
      await api.setHeader(request.post(`${api.url}/group/${groupId}/setAsRead`))
    })
  }
}