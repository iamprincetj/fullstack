import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const request = axios.get(baseUrl)
    return (await request).data
}

const createNew = async (content) => {
    const data = {content, votes: 0}
    const request = await axios.post(baseUrl, data)
    return request.data
}

const updateAnecdote = async (anecdote) => {
    const id = anecdote.id
    const data = { ...anecdote, votes: anecdote.votes + 1 }
    const request = await axios.put(`${baseUrl}/${id}`, data)
    return request.data
}


export default { getAll, createNew, updateAnecdote }