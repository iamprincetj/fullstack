import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

const NotifyContext = createContext()

export const NotifyProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <NotifyContext.Provider value={[notification, dispatch]}>
            {children}
        </NotifyContext.Provider>
    )
}

export const useNotifyContextValue = () => {
    const notification = useContext(NotifyContext)
    return notification[0]
}

export const useNotifyContextDispatch = () => {
    const notification = useContext(NotifyContext)
    return notification[1]
}

export default NotifyContext
