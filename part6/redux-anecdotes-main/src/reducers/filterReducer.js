import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'NOFILTER',
    reducers: {
        activeFilter(state, action) {
            return state = 'FILTER'
        },
        inactiveFilter(state, action) {
            return state = 'NOFILTER'
        }
    }
})

export const { activeFilter, initialState } = filterSlice.actions
export default filterSlice.reducer