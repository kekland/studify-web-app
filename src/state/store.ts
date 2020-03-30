import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth'
import main from './main'
import groups from './groups'
import notifications from './notifications'
import preferences from './preferences'
import messaging from './messaging'

const rootReducer = combineReducers({ auth, main, groups, notifications, preferences, messaging })

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export { store }