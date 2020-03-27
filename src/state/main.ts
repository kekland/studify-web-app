import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'
import { IMessageSocket } from '../api/data/message'

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

      if(!group) return
      group.messages = action.payload.messages
      group.isLoaded = true
    },
  },
})

export const { setGroups, addGroup, selectGroup } = mainSlice.actions
export default mainSlice.reducer