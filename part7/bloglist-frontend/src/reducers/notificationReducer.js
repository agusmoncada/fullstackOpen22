import { createSlice } from "@reduxjs/toolkit";

let timeout

const notificacionSlice = createSlice({
    name:'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            return message
        }
    }
})

export const { setNotification } = notificacionSlice.actions

export const alert = (notification, duration) => {
    return dispatch => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(setNotification(null))
        }, duration * 1000)

        dispatch(setNotification(notification))
    }
}

export default notificacionSlice.reducer