import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'
import { IMessageSocket } from '../api/data/message'
import { api } from '../api/api'
import { IUserMinimal } from '../api/data/user'

export interface IMainSliceState {
  groups: IGroup[];
  selectedGroupIndex?: number;
  isDrawerOpen: boolean,
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    groups: [],
    selectedGroupIndex: undefined,
    isDrawerOpen: (window.screen.width < 768),
  } as IMainSliceState,
  reducers: {
    setGroups(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload
    },
    addGroup(state, action: PayloadAction<IGroup>) {
      state.groups.push(action.payload)
    },
    selectGroup(state, action: PayloadAction<IGroup>) {
      state.selectedGroupIndex = state.groups.findIndex(g => g.id === action.payload.id)
    },
    setGroupMessages(state, action: PayloadAction<{ id: string, messages: IMessageSocket[] }>) {
      const group = state.groups.find(group => group.id === action.payload.id)

      if (!group) return
      group.messages = action.payload.messages
      group.isLoaded = true
      group.typingUsers = []
      group.hasMore = group.messages.length === api.messageLimit
    },
    addGroupMessages(state, action: PayloadAction<{ id: string, messages: IMessageSocket[] }>) {
      const group = state.groups.find(group => group.id === action.payload.id)

      if (!group) return
      group.messages = [...action.payload.messages, ...group.messages]
      group.hasMore = action.payload.messages.length === api.messageLimit
    },
    addGroupMessage(state, action: PayloadAction<IMessageSocket>) {
      const group = state.groups.find(group => group.id === action.payload.groupId)

      if (!group) return
      group.messages.push(action.payload)
    },
    replaceGroupMessageByIdempotency(state, action: PayloadAction<IMessageSocket>) {
      const group = state.groups.find(group => group.id === action.payload.groupId)

      if (!group) return
      let index = group.messages.findIndex(message => message.idempotencyId === action.payload.idempotencyId)
      if (index === -1) return
      group.messages[index] = action.payload
    },
    joinGroup(state, action: PayloadAction<IGroup>) {
      state.groups.push(action.payload)
    },
    leaveGroup(state, action: PayloadAction<IGroup>) {
      let index = state.groups.findIndex(group => group.id === action.payload.id)
      state.groups.splice(index)
    },
    onUserStartedTyping(state, action: PayloadAction<{ user: IUserMinimal, groupId: string }>) {
      let groupIndex = state.groups.findIndex(group => group.id === action.payload.groupId)

      if (groupIndex === -1) return

      if (!state.groups[groupIndex].typingUsers.some(user => user.id === action.payload.user.id)) {
        state.groups[groupIndex].typingUsers.push(action.payload.user)
      }
    },
    onUserStoppedTyping(state, action: PayloadAction<{ user: IUserMinimal, groupId: string }>) {
      let groupIndex = state.groups.findIndex(group => group.id === action.payload.groupId)

      if (groupIndex === -1) return
      let userIndex = state.groups[groupIndex].typingUsers.findIndex(user => user.id === action.payload.user.id)

      if (userIndex === -1) return
      state.groups[groupIndex].typingUsers.splice(userIndex)
    },
    setDrawer(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload
    }
  },
})

export const {
  setGroups,
  addGroup,
  selectGroup,
  setGroupMessages,
  addGroupMessages,
  addGroupMessage,
  replaceGroupMessageByIdempotency,
  joinGroup,
  leaveGroup,
  onUserStartedTyping,
  onUserStoppedTyping,
  setDrawer,

} = mainSlice.actions
export default mainSlice.reducer