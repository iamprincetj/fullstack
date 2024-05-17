import { useContext, useState } from 'react'
import login from '../services/login'
import NotifyContext from '../NotifyContext'
import { useUserContextDispatch } from '../UserContext'
import {
    useStatusContextDispatch,
    useStatusContextValue,
} from '../StatusContext'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, dispatch] = useContext(NotifyContext)
    const userDispatch = useUserContextDispatch()
    const dispatchStatus = useStatusContextDispatch()
    const status = useStatusContextValue()
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        const credential = {
            username,
            password,
        }

        try {
            const request = await login.loginPerson(credential)
            window.localStorage.setItem('loggedInUser', JSON.stringify(request))
            userDispatch({ type: 'SET_USER', payload: request })
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: `logged in as ${request.username}`,
            })
            dispatchStatus({ type: 'SET_STATUS', payload: 'success' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
                dispatchStatus({ type: 'CLEAR_STATUS' })
            }, 5000)
            navigate('/')
        } catch (exception) {
            const error = exception.response.data.error
            dispatch({ type: 'SET_NOTIFICATION', payload: error })
            dispatchStatus({ type: 'SET_STATUS', payload: 'error' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
                dispatchStatus({ type: 'CLEAR_STATUS' })
            }, 5000)
        }
        setUsername('')
        setPassword('')
    }

    const style = {
        display: notification ? '' : 'none',
    }

    return (
        <>
            <h2 className="text-primary">Log in to Application</h2>
            <Alert
                style={style}
                variant={status === 'success' ? 'success' : 'danger'}
            >
                {' '}
                {notification}{' '}
            </Alert>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username </Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        data-testid="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        data-testid="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button
                    style={{ margin: '5px 0' }}
                    variant="primary"
                    type="submit"
                >
                    login
                </Button>
            </Form>
        </>
    )
}

export default LoginForm
