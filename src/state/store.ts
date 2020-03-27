import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './auth'
import main from './main'

const rootReducer = combineReducers({ auth, main })

const store = configureStore({
  reducer: rootReducer,
})


store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof rootReducer>
export { store }