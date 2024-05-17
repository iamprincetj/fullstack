import { useEffect, useContext } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NotifyContext from './NotifyContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'
import Blog from './components/Blog'
import { getAll } from './services/users'
import StatusContext from './StatusContext'
import User from './components/User'
import { Alert, Button, Nav, Navbar } from 'react-bootstrap'

const App = () => {
    const [user, userDispatch] = useContext(UserContext)
    const [notification, dispatch] = useContext(NotifyContext)
    const [status, dispatchStatus] = useContext(StatusContext)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const blogMatch = useMatch('/blogs/:id')
    const userMatch = useMatch('/users/:id')

    const blogResult = useQuery({
        queryKey: ['blogs'],
        queryFn: () => blogService.getAll(),
        refetchOnWindowFocus: false,
    })

    const blogMutationDelete = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: (blog) => {
            blogResult.refetch()
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.filter((b) => b.id !== blog.id),
            )
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: `blog ${blog.title} by ${blog.author} successfully removed`,
            })
            dispatchStatus({ type: 'SET_STATUS', payload: 'success' })
            setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
            navigate('/')
        },
        onError: (error) => {
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: error.response.data.error,
            })
            dispatchStatus({ type: 'SET_STATUS', payload: 'error' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
            }, 5000)
        },
    })

    const usersResult = useQuery({
        queryKey: ['users'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
    })

    const blogMutationUpdate = useMutation({
        mutationFn: blogService.updateBlog,
        onSuccess: (blog) => {
            const currentUser = usersResult.data.find(
                (usr) => usr.username === user.username,
            )
            const { blogs, ...rest } = currentUser
            const blgs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blgs.map((b) =>
                    b.id === blog.id ? { ...blog, user: rest } : b,
                ),
            )
        },
    })

    const blogMutationComment = useMutation({
        mutationFn: blogService.makeComment,
        onSuccess: (blog) => {
            const currentUser = usersResult.data.find(
                (usr) => usr.username === user.username,
            )
            const { blogs, ...rest } = currentUser
            const blgs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blgs.map((b) =>
                    b.id === blog.id ? { ...blog, user: rest } : b,
                ),
            )
        },
    })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'SET_USER', payload: user })
        }
    }, [userDispatch])

    if (blogResult.isLoading) {
        return <div>Loading...</div>
    }

    const myBlogs = blogResult.data

    let style = {
        display: notification ? '' : 'none',
    }

    if (usersResult.isLoading) {
        return <div>Loading...</div>
    }

    const users = usersResult.data

    const handleUpdateBlog = async (data) => {
        const dataToSend = {
            ...data,
            likes: data.likes + 1,
        }
        blogMutationUpdate.mutate(dataToSend)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        userDispatch({ type: 'DEL_USER' })
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: 'logged out successfully',
        })
        dispatchStatus({ type: 'SET_STATUS', payload: 'success' })
        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
            dispatchStatus({ type: 'CLEAR_STATUS' })
        }, 5000)
    }

    const userProp = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null
    const blogProp = blogMatch
        ? myBlogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    const padding = {
        padding: 5,
        textDecoration: 'none',
    }

    const visibleElement = () => {
        if (user) {
            return (
                <>
                    <Navbar
                        collapseOnSelect
                        expand="lg"
                        bg="dark"
                        variant="dark"
                    >
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link href="#" as="span">
                                    <Link style={padding} to="/">
                                        Blogs
                                    </Link>
                                </Nav.Link>
                                <Nav.Link href="#" as="span">
                                    <Link style={padding} to="/users">
                                        Users
                                    </Link>
                                </Nav.Link>
                                <Nav.Link href="#" as="span">
                                    <span style={padding}>
                                        {user.name} logged in
                                        <Button
                                            style={{
                                                ...padding,
                                                margin: '0 5px',
                                            }}
                                            variant="primary"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <h2 className="text-primary">Blog App</h2>
                    <Alert
                        style={style}
                        variant={status === 'success' ? 'success' : 'danger'}
                    >
                        {notification}
                    </Alert>
                    <Routes>
                        <Route
                            path="/users"
                            element={<Users users={users} />}
                        />
                        <Route
                            path="/blogs/:id"
                            element={
                                <Blog
                                    blog={blogProp}
                                    handleUpdateBlog={handleUpdateBlog}
                                    blogMutationDelete={blogMutationDelete}
                                    blogMutationComment={blogMutationComment}
                                />
                            }
                        />
                        <Route
                            path="/users/:id"
                            element={<User user={userProp} />}
                        />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </>
            )
        }
        return <LoginForm />
    }

    return <div className="container">{visibleElement()}</div>
}

export default App
