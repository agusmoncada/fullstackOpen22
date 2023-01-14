import { createSlice } from "@reduxjs/toolkit"
import users from "../services/users"

const usersSlice = createSlice({
    name: 'users',
    initialState : [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const allUsers = await users.getAll()
        dispatch(setUsers(allUsers))
    }
}

export default usersSlice.reducer