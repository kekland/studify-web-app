import { api } from '../api'
import { methods } from './methods'
import { IGroupExtended, IGroupMinimal } from '../data/group'
import { store } from '../../state/store'
import { pushGroupMessages, pushNewGroupMessage, replaceGroupMessageByIdempotency, setUserTyping, setGroup } from '../../state/groups'
import { ISendMessageFormData, ISentMessage, IMessageSocket } from '../data/message'
import { IUserMinimal } from '../data/user'

export const messagingMethods = {
  loadMoreMessages: (group: IGroupExtended) => {
    return methods.methodWrapper(async () => {
      const result = await api.messaging.loadMessages(group.data, { skip: group.messages.length })
      store.dispatch(pushGroupMessages({ id: result.id, data: result.messages }))
    })
  },
  sendMessage: (group: IGroupExtended, data: ISendMessageFormData) => {
    return methods.methodWrapper(async () => {
      const message = await api.messaging.sendMessage(group.data.id, data)
      store.dispatch(pushNewGroupMessage({ id: group.data.id, data: message }))
    })
  },
  onMessageSent: (data: ISentMessage) => {
    store.dispatch(replaceGroupMessageByIdempotency({ id: data.groupId, data: data }))
  },
  onNewGroupMessage: (message: IMessageSocket) => {
    store.dispatch(pushNewGroupMessage({ id: message.groupId, data: message }))
  },
  onUserTypingStatusUpdated: (data: { user: IUserMinimal, status: boolean, groupId: string }) => {
    store.dispatch(setUserTyping({ id: data.groupId, data: data }))
  },
  onGroupChange: (data: IGroupMinimal) => {
    store.dispatch(setGroup({ id: data.id, data }))
  }
}