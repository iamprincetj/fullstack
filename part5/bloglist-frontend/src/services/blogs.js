import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const userFromToken = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
    return user
}

const createBlog = async (data) => {
    const user = userFromToken()
    const token = `Bearer ${user.token}`
    const config = {
        headers: {
            Authorization: token
        }
    }

    const request = await axios.post(baseUrl, data, config)
    return request.data
}

const updateBlog = async (id, data) => {
    const request = await axios.put(`${baseUrl}/${id}`, data)
    return request.data
}

const deleteBlog = async (id) => {
    const user = userFromToken()
    const token = `Bearer ${user.token}`
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, createBlog, updateBlog, deleteBlog }