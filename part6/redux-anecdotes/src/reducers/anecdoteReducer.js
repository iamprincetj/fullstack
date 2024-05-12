import { createSlice } from "@reduxjs/toolkit"
import anecdotes from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        updateAnec(state, action) {
            const anecdote = action.payload
            const id = anecdote.id
            return state.map(anec => anec.id != id ? anec : anecdote)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})


export const { setAnecdotes, appendAnecdote, updateAnec } = anecdoteSlice.actions

export const initialAnecdotes = () => {
    return async dispatch => {
        const request = await anecdotes.getAll()
        dispatch(setAnecdotes(request))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const request = await anecdotes.createNew(content)
        dispatch(appendAnecdote(request))
    }
}

export const voteAnecdote = (anec) => {
    return async dispatch => {
        const request = await anecdotes.updateAnecdote(anec)
        dispatch(updateAnec(request))
    }
}

export default anecdoteSlice.reducer