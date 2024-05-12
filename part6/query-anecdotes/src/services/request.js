import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

export const createNew = async (data) => {
     const request = await axios.post(baseUrl, data)
     return request.data
}

export const updateAnecdote = async (data) => {
     const request = await axios.put(`${baseUrl}/${data.id}`, data)
     return request.data
}