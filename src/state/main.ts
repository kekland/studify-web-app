import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'
import { IUserMinimal } from '../api/data/user'

export interface IMainSliceState {
  selectedGroupId?: string;
  isDrawerOpen: boolean,
  selectedUser?: IUserMinimal;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    selectedGroupId: undefined,
    isDrawerOpen: (window.screen.width < 768),
  } as IMainSliceState,
  reducers: {
    selectGroup(state, action: PayloadAction<IGroup>) {
      state.selectedGroupId = action.payload.id
    },
    setDrawer(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload
    },
    setSelectedUser(state, action: PayloadAction<IUserMinimal | undefined>) {
      state.selectedUser = action.payload
    }
  },
})

export const {
  selectGroup,
  setDrawer,
  setSelectedUser,
} = mainSlice.actions
export default mainSlice.reducer