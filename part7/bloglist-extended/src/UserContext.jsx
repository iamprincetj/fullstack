import { createContext, useContext, useReducer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'DEL_USER':
            return null
        default:
            return state
    }
}

export const useUserContextValue = () => {
    const user = useContext(UserContext)
    return user[0]
}

export const useUserContextDispatch = () => {
    const user = useContext(UserContext)
    return user[1]
}

export const UserContextProvider = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
