import { useState } from 'react'
import login from '../services/login'

const LoginForm = ({
    setNotification,
    setStatus,
    setUser,
    style,
    notification
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(event) => {
        event.preventDefault()
        const credential = {
            username,
            password
        }

        try {
            const request = await login.loginPerson(credential)
            window.localStorage.setItem('loggedInUser', JSON.stringify(request))
            setUser(request)
            setNotification('Successfully logged in')
            setStatus('success')
            setTimeout(() => {
                setNotification('')
            }, 5000)
        } catch (exception) {
            const error = exception.response.data.error
            setNotification(error)
            setStatus('error')
            setTimeout(() => {
                setNotification('')
            }, 5000)
        }
        setUsername('')
        setPassword('')
    }


    return (
        <>
            <div className='notify' style={style}> {notification} </div>
            <form onSubmit={handleLogin}>
                <div>
          username <input
                        type='text'
                        name='username'
                        data-testid='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
          password <input
                        type='text'
                        name='password'
                        data-testid='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </>
    )
}

export default LoginForm
