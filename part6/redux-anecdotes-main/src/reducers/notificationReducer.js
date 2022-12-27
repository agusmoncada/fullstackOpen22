import { createSlice } from "@reduxjs/toolkit"

let timeOut 

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions

export const alert = (notification, duration) => {
    return dispatch => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            dispatch(setNotification(null))
        }, duration * 1000)
        
        dispatch(setNotification(notification))
    }
}

export default notificationSlice.reducer