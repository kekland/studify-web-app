import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'

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
  },
})

export const { setGroups } = mainSlice.actions
export default mainSlice.reducer