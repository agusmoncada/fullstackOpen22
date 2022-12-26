import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        activeFilter(state, action) {
            return state = action.payload
        }
    }
})

export const { activeFilter, initialState } = filterSlice.actions
export default filterSlice.reducer