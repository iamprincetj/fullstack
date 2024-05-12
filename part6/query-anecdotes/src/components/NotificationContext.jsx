import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'DEL_NOTIFICATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [ notification, notifyReducer ] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[ notification, notifyReducer ]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useContextValue = () => {
    const context = useContext(NotificationContext)
    return context[0]
}

export const useContextDispatch = () => {
    const context = useContext(NotificationContext)
    return context[1]
}

export default NotificationContext