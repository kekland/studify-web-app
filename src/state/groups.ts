import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroup, IGroupExtended, IGroupMinimal } from "../api/data/group";
import { IMessageSocket, ISentMessage } from "../api/data/message";
import { IUserMinimal } from "../api/data/user";

export type MappedGroups = { [key: string]: IGroupExtended }
export type GroupPayload<T> = { id: string, data: T }
const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: {} as MappedGroups,
  },
  reducers: {
    setGroups: (state, action: PayloadAction<MappedGroups>) => {
      state.groups = action.payload
    },
    pushGroup: (state, action: PayloadAction<IGroupExtended>) => {
      state.groups[action.payload.data.id] = action.payload
    },
    removeGroup: (state, action: PayloadAction<IGroup>) => {
      delete state.groups[action.payload.id]
    },
    setGroup: (state, action: PayloadAction<GroupPayload<IGroupMinimal>>) => {
      const group = state.groups[action.payload.id]
      const newGroup = action.payload.data

      group.data = { ...group.data, ...newGroup }
    },
    pushGroupMessages: (state, action: PayloadAction<GroupPayload<IMessageSocket[]>>) => {
      const group = state.groups[action.payload.id]

      group.messages = [...action.payload.data, ...group.messages]
    },
    pushNewGroupMessage: (state, action: PayloadAction<GroupPayload<IMessageSocket>>) => {
      const group = state.groups[action.payload.id]

      group.messages.push(action.payload.data)
    },
    replaceGroupMessageById: (state, action: PayloadAction<GroupPayload<IMessageSocket>>) => {
      const group = state.groups[action.payload.id]

      const index = group.messages.findIndex(m => m.id === action.payload.data.id)
      if (index !== -1)
        group.messages[index] = action.payload.data
    },
    replaceGroupMessageByIdempotency: (state, action: PayloadAction<GroupPayload<ISentMessage>>) => {
      const group = state.groups[action.payload.id]

      const index = group.messages.findIndex(m => (m as any).idempotencyId === action.payload.data.idempotencyId)
      if (index !== -1)
        group.messages[index] = action.payload.data
    },
    setUserTyping: (state, action: PayloadAction<GroupPayload<{ status: boolean, user: IUserMinimal }>>) => {
      const group = state.groups[action.payload.id]

      if (action.payload.data.status)
        group.typingUsers[action.payload.data.user.id] = action.payload.data.user
      else
        delete group.typingUsers[action.payload.data.user.id]
    },
    incrementNotificationCount: (state, action: PayloadAction<GroupPayload<undefined>>) => {
      const group = state.groups[action.payload.id]
      group.unreadMessages += 1
    },
    clearNotifications: (state, action: PayloadAction<GroupPayload<undefined>>) => {
      const group = state.groups[action.payload.id]
      group.unreadMessages = 0
    },
    markAsNoMore: (state, action: PayloadAction<GroupPayload<undefined>>) => {
      const group = state.groups[action.payload.id]
      group.hasMore = false
    }
  }
})

export const { setGroups, pushGroup, removeGroup, pushGroupMessages,
  pushNewGroupMessage, replaceGroupMessageById, replaceGroupMessageByIdempotency,
  setUserTyping, setGroup, incrementNotificationCount, clearNotifications, markAsNoMore } = groupsSlice.actions
export default groupsSlice.reducer