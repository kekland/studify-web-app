import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroup } from '../api/data/group'

export interface IMainSliceState {
  selectedGroupId?: string;
  isDrawerOpen: boolean,
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
    }
  },
})

export const {
  selectGroup,
  setDrawer,
} = mainSlice.actions
export default mainSlice.reducer