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
            console.log(state.map(blog => blog))
            const newState = state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
            console.log('newState', newState)
            return newState
        },
        updateComment(state, action) {
            const id = action.payload.blogId
            const comment = action.payload.comment
            const newState = state.map( blog => blog.id === id ? {...blog, comments:[...blog.comments, comment]} : blog)
            return newState
        }
    }
})

export const { setBlogs, appendBlog, filter, updateBlog, updateComment } = blogSlice.actions

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

export const commentBlog = (blogId, comment) => {
    return async dispatch => {
        const response = await blogs.comment(blogId, comment)
        const data = {
            comment: {
                content: response.content,
                id: response.id
            },
            blogId
        }
        dispatch(updateComment(data))
    }
}

export default blogSlice.reducer