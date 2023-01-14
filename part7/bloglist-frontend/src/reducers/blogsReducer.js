import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        filter(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            const newState = state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
            return newState
        }
    }
})

export const { setBlogs, appendBlog, filter, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const allBlogs = await blogs.getAll()
        dispatch(setBlogs(allBlogs))
    }
}

export const createNewBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogs.create(blog)
        dispatch(appendBlog(newBlog))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogs.remove(blog)
        dispatch(filter(blog))
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogs.update(blog)
        dispatch(updateBlog(updatedBlog))
    }
}

export default blogSlice.reducer