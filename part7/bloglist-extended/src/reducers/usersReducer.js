import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUsers(state, action) {
            return action.payload
        },
    },
})

export const { addUsers } = usersSlice.actions

export const getUsers = () => {
    return async (dispatch) => {
        const request = await getAll()
        dispatch(addUsers(request))
    }
}

export default usersSlice.reducer
