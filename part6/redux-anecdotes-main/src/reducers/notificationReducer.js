import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        alertVote(state, action) {
            const newState = `you voted ${action.payload}`
            return newState
        },
        alertAnecdote(state, action) {
            const newAnecdote = `you added ${action.payload}`
            return newAnecdote
        },
        removeAlert(state, action) {
            return state = null
        }
    }
})

export const { alertVote, removeAlert, alertAnecdote } = notificationSlice.actions

export default notificationSlice.reducer