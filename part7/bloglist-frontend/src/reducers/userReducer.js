import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"
import loginService from "../services/login"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
        if (user) {
            dispatch(setUser(user))
            blogs.setToken(user.token)
        }
    }
}

export const loginUSer = (newUser) => {
    return async dispatch => {
        try {
            const user = await loginService.login(newUser)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogs.setToken(user.token)
            dispatch(setUser(user))
        } catch (exception) {
            return exception
        }        
    }
}

export const logOutUser = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedBlogAppUser')
        if (!window.localStorage.getItem('loggedBlogAppUser')) {
            dispatch(setUser(null))
        }
    }
}

export default userSlice.reducer