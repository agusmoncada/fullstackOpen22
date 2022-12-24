//import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notificationReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore({ 
    reducer: {
        anecdotes: anecdoteSlice,
        notification: notificationSlice,
        filter: filterSlice
    }
})

export default store