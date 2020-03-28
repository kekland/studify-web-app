import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth'
import main from './main'
import notifications from './notifications'

const rootReducer = combineReducers({ auth, main, notifications })

const store = configureStore({
  reducer: rootReducer,
})


store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof rootReducer>
export { store }