import { api } from '../api'
import { methods } from './methods'
import { store } from '../../state/store'
import { setGroups, MappedGroups, pushGroup, removeGroup, pushUsers } from '../../state/groups'
import { IGroupMinimal, IGroupExtended } from '../data/group'
import { ICreateGroupData } from '../../components/modal-create-group/modal-create-group'

export const groupMethods = {
  convertGroupsToMappedType: (groups: IGroupExtended[]) => {
    const obj: MappedGroups = {}
    groups.forEach(group => obj[group.data.id] = group)
    return obj
  },
  setInitializationData: () => {
    return methods.methodWrapper(async () => {
      const user = api.getUser()
      if (user)
        store.dispatch(setGroups(groupMethods.convertGroupsToMappedType(
          user.groups.map(group => api.group.initializeGroup(group))))
        )
    })
  },
  loadDataOnInitialization: () => {
    return methods.methodWrapper(async () => {
      const result = await api.group.loadAllData()
      const groups = result.map((v) => api.group.initializeGroup(v.group, { ...v, isLoaded: true }))

      store.dispatch(setGroups(groupMethods.convertGroupsToMappedType(groups)))
    })
  },
  create: (data: ICreateGroupData, afterMethod?: () => void) => {
    return methods.methodWrapper(async () => {
      const result = await api.group.create(data)

      store.dispatch(pushGroup(result))
    }, afterMethod)
  },
  join: (data: IGroupMinimal) => {
    return methods.methodWrapper(async () => {
      const group = await api.group.join(data)

      store.dispatch(pushGroup(group))
    })
  },
  leave: (data: IGroupMinimal) => {
    return methods.methodWrapper(async () => {
      const group = await api.group.leave(data)

      store.dispatch(removeGroup(group))
    })
  },
  loadMoreUsers: (group: IGroupExtended) => {
    return methods.methodWrapper(async () => {
      const users = await api.group.getUsers(group.data, { skip: group.users.length })

      store.dispatch(pushUsers({ id: group.data.id, data: users }))
    })
  }
}