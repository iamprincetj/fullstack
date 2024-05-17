import { createContext, useContext, useReducer } from 'react'

const statusReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STATUS':
            return action.payload
        case 'CLEAR_STATUS':
            return null
        default:
            return state
    }
}

const StatusContext = createContext()

export const StatusContextProvider = ({ children }) => {
    const [status, dispatchStatus] = useReducer(statusReducer, null)

    return (
        <StatusContext.Provider value={[status, dispatchStatus]}>
            {children}
        </StatusContext.Provider>
    )
}

export const useStatusContextValue = () => {
    const status = useContext(StatusContext)
    return status[0]
}

export const useStatusContextDispatch = () => {
    const status = useContext(StatusContext)
    return status[1]
}

export default StatusContext
