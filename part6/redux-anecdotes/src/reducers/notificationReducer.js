import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            const notification = action.payload
            return notification
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const  { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return dispatch => {
        dispatch(createNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, timeout)
    }
}

export default notificationSlice.reducer