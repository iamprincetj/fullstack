import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotifyContextDispatch } from '../NotifyContext'
import { useStatusContextDispatch } from '../StatusContext'
import { Table } from 'react-bootstrap'
import { useUserContextValue } from '../UserContext'

const Home = () => {
    const blogFormRef = useRef()
    const { isLoading, data } = useQuery({
        queryKey: ['blogs'],
    })
    const userResult = useQuery({
        queryKey: ['users'],
    })

    const currentUser = useUserContextValue()

    const user = userResult.data.find(
        (user) => user.username === currentUser.username,
    )

    const { blogs, ...rest } = user

    const dispatch = useNotifyContextDispatch()
    const queryClient = useQueryClient()
    const blogMutation = useMutation({
        mutationFn: blogService.createBlog,
        onSuccess: (blog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                [...blogs, { ...blog, user: rest }],
            )
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: `a new blog ${blog.title} by ${blog.author} added`,
            })
            dispatchStatus({ type: 'SET_STATUS', payload: 'success' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
                dispatchStatus({ type: 'CLEAR_STATUS' })
            }, 5000)
        },
        onError: (error) => {
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: error.response.data.error,
            })
            dispatchStatus({ type: 'SET_STATUS', payload: 'error' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NOTIFICATION' })
                dispatchStatus({ type: 'CLEAR_STATUS' })
            }, 5000)
        },
    })
    const dispatchStatus = useStatusContextDispatch()

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleCreateBlog = async (data) => {
        blogFormRef.current.toggleVisibility()
        blogMutation.mutate(data)
    }

    const myBlogs = data

    return (
        <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            {myBlogs.length > 0 ? (
                <Table striped>
                    <tbody>
                        {myBlogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={`/blogs/${blog.id}`}
                                    >
                                        {' '}
                                        {blog.title}{' '}
                                    </Link>
                                </td>
                                <td>{blog.author}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p> No blogs yet </p>
            )}
        </div>
    )
}

export default Home
