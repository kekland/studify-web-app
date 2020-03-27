import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'
import { ILoadable } from '../api/loadableState'

export interface IMainSliceState {
  groups: ILoadable<IGroup[]>;
  selectedGroup?: IGroup;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    groups: {
      loading: false,
      hasNoMore: false,
      items: [],
    },
    selectedGroup: undefined,
  } as IMainSliceState,
  reducers: {
    loadGroups(state, action: Action) {
      state.groups.loading = true
    },
    setGroups(state, action: PayloadAction<IGroup[]>) {
      state.groups.items = action.payload
      state.groups.loading = false
    },
  },
})

export const { loadGroups, setGroups } = mainSlice.actions
export default mainSlice.reducer