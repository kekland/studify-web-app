import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth'
import main from './main'
import groups from './groups'
import notifications from './notifications'
import preferences from './preferences'

const rootReducer = combineReducers({ auth, main, groups, notifications, preferences })

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export { store }