import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => action.payload,
        removeNotification: (state) => '',
    },
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const createNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
}

export default notificationSlice.reducer
