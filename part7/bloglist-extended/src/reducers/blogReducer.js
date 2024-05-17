import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        addBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            const id = action.payload.id
            console.log(action.payload)
            return state.map((blog) => (blog.id === id ? action.payload : blog))
        },
        deleteBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
    },
})

export const { appendBlog, addBlogs, updateBlog, deleteBlog } =
    blogSlice.actions

export const addBlogsThunk = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(addBlogs(blogs))
    }
}

export const createBlog = (data) => {
    return async (dispatch) => {
        const blog = await blogService.createBlog(data)
        dispatch(appendBlog(blog))
    }
}

export const updateBlogThunk = (id, data) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.updateBlog(id, data)
        dispatch(updateBlog({ ...updatedBlog, user: data.user }))
    }
}

export const deleteBlogThunk = (id) => {
    return async (dispatch) => {
        await blogService.deleteBlog(id)
        dispatch(deleteBlog(id))
    }
}

export default blogSlice.reducer
