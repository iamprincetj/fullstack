import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState('')
    const [status, setStatus] = useState('')


    const getBlogs = async () => {
        const request = await blogService.getAll()
        setBlogs(request)
    }
    useEffect(() => {
        getBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])



    let style = {
        display: notification ? '' : 'none',
        border: status === 'success'
            ? '2px solid green'
            : '2px solid red',
        color: status === 'success'
            ? 'green'
            : 'red'
    }


    const blogFormRef = useRef()

    const handleCreateBlog = async ( data ) => {
        blogFormRef.current.toggleVisibility()
        try {
            const request = await blogService.createBlog(data)
            getBlogs()
            setNotification(`a new blog ${request.title} by ${request.author} added`)
            setStatus('success')
            setTimeout(() => {
                setNotification('')
            }, 5000)
        } catch (exception) {
            const error = exception.response.data.error
            setNotification(error)
            setTimeout(() => {
                setNotification('')
            }, 5000)
        }
    }


    const handleUpdateBlog = async (id, data, user) => {
        const dataToSend = {
            ...data,
            likes: data.likes + 1
        }

        const request = await blogService.updateBlog(id, dataToSend)
        setBlogs(blogs.map(blog => blog.id === id ? { ...request, user: user } : blog))
    }

    const handleDeleteBlog = async (id) => {
        const blog = blogs.find(blog => blog.id === id)
        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            try {
                const request = await blogService.deleteBlog(id)
                setBlogs(blogs.filter(blog => blog.id !== id))
                setNotification('successfully deleted')
                setStatus('success')
                setTimeout(() => setNotification(''), 5000)
            } catch (exception) {
                const error = exception.response.data.error
                setNotification(error)
                setStatus('error')
                setTimeout(() => {
                    setNotification('')
                }, 5000)
            }
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
        setNotification('Successfully Logged Out')
        setStatus('success')
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }


    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    const visibleElement = () => {
        if (user) {
            return (
                <>
                    <h2>blogs</h2>
                    <div className='notify' style={style}>{notification}</div>
                    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                        <BlogForm
                            createBlog={handleCreateBlog}
                        />
                    </Togglable>
                    {sortedBlogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            updateBlog={handleUpdateBlog}
                            deleteBlog={handleDeleteBlog}
                        />
                    )}
                </>
            )
        }
        return (
            <>
                <h2>log in to application</h2>
                <LoginForm
                    setNotification={setNotification}
                    setStatus={setStatus}
                    setUser={setUser}
                    style={style}
                    notification={notification}
                />
            </>
        )
    }

    return (
        <div>
            {visibleElement()}
        </div>
    )
}

export default App