import { api } from '../api'
import { methods } from './methods'
import { store } from '../../state/store'
import { setGroups, MappedGroups, pushGroup, removeGroup } from '../../state/groups'
import { IGroupMinimal, IGroupExtended } from '../data/group'

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
      const groups = result.map((v) => api.group.initializeGroup(v.group, v))

      store.dispatch(setGroups(groupMethods.convertGroupsToMappedType(groups)))
    })
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
}