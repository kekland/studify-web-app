import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'
import { IMessageSocket } from '../api/data/message'
import { api } from '../api/api'
import { IUserMinimal } from '../api/data/user'

export interface IMainSliceState {
  groups: IGroup[];
  selectedGroup?: IGroup;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    groups: [],
    selectedGroup: undefined,
  } as IMainSliceState,
  reducers: {
    setGroups(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload
    },
    addGroup(state, action: PayloadAction<IGroup>) {
      state.groups.push(action.payload)
    },
    selectGroup(state, action: PayloadAction<IGroup>) {
      state.selectedGroup = action.payload
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

      if (state?.selectedGroup?.id === group.id) {
        state.selectedGroup = group
      }
    },
    addGroupMessage(state, action: PayloadAction<IMessageSocket>) {
      const group = state.groups.find(group => group.id === action.payload.groupId)

      if (!group) return
      group.messages.push(action.payload)

      if (state?.selectedGroup?.id === group.id) {
        state.selectedGroup = group
      }
    },
    replaceGroupMessageByIdempotency(state, action: PayloadAction<IMessageSocket>) {
      const group = state.groups.find(group => group.id === action.payload.groupId)

      if (!group) return
      let index = group.messages.findIndex(message => message.idempotencyId === action.payload.idempotencyId)
      if (index === -1) return
      group.messages[index] = action.payload

      if (state?.selectedGroup?.id === group.id) {
        state.selectedGroup = group
      }
    },
    joinGroup(state, action: PayloadAction<IGroup>) {
      state.groups.push(action.payload)
    },
    leaveGroup(state, action: PayloadAction<IGroup>) {
      let index = state.groups.findIndex(group => group.id === action.payload.id)
      state.groups.splice(index)

      if (state.selectedGroup?.id === action.payload.id) {
        state.selectedGroup = undefined
      }
    },
    onUserStartedTyping(state, action: PayloadAction<{ user: IUserMinimal, groupId: string }>) {
      let groupIndex = state.groups.findIndex(group => group.id === action.payload.groupId)

      if (groupIndex === -1) return

      if (!state.groups[groupIndex].typingUsers.some(user => user.id === action.payload.user.id)) {
        state.groups[groupIndex].typingUsers.push(action.payload.user)
      }

      if (state.selectedGroup?.id === action.payload.groupId) {
        state.selectedGroup.typingUsers = state.groups[groupIndex].typingUsers
      }
    },
    onUserStoppedTyping(state, action: PayloadAction<{ user: IUserMinimal, groupId: string }>) {
      let groupIndex = state.groups.findIndex(group => group.id === action.payload.groupId)

      if (groupIndex === -1) return

      let userIndex = state.groups[groupIndex].typingUsers.findIndex(user => user.id === action.payload.user.id)

      if(userIndex === -1) return

      state.groups[groupIndex].typingUsers.splice(userIndex)

      if (state.selectedGroup?.id === action.payload.groupId) {
        state.selectedGroup.typingUsers = state.groups[groupIndex].typingUsers
      }
    },
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
} = mainSlice.actions
export default mainSlice.reducer