import { Button, Form, Table } from 'react-bootstrap'
import { useNotifyContextDispatch } from '../NotifyContext'
import { useStatusContextDispatch } from '../StatusContext'
import { useUserContextValue } from '../UserContext'
import { useNavigate } from 'react-router-dom'

const Blog = ({
    blog,
    handleUpdateBlog,
    blogMutationComment,
    blogMutationDelete,
}) => {
    const notifyDispatch = useNotifyContextDispatch()
    const dispatchStatus = useStatusContextDispatch()
    const comments = blog.comments
    const currentUser = useUserContextValue()
    const navigate = useNavigate()

    const check = blog.user.username === currentUser.username

    const deleteBtnStyle = {
        display: check ? '' : 'none',
    }

    const handleUpdateBlogComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        if (comment !== '') {
            const data = { comment: comment, id: blog.id }
            blogMutationComment.mutate(data)
        } else {
            notifyDispatch({
                type: 'SET_NOTIFICATION',
                payload: 'comment cannot be empty',
            })
            dispatchStatus({ type: 'SET_STATUS', payload: 'error' })
            setTimeout(() => {
                notifyDispatch({ type: 'CLEAR_NOTIFICATION' })
                dispatchStatus({ type: 'CLEAR_STATUS' })
            }, 5000)
        }
    }

    const handleDeleteBlog = async (id) => {
        if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
            try {
                blogMutationDelete.mutate(id)
                notifyDispatch({
                    type: 'SET_NOTIFICATION',
                    payload: `blog ${blog.title} by ${blog.author} successfully removed`,
                })
                dispatchStatus({ type: 'SET_STATUS', payload: 'success' })
                setTimeout(
                    () => notifyDispatch({ type: 'CLEAR_NOTIFICATION' }),
                    5000,
                )
                navigate('/', { replace: true })
            } catch (exception) {
                const error = exception.response.data.error
                notifyDispatch({ type: 'SET_NOTIFICATION', payload: error })
                dispatchStatus({ type: 'SET_STATUS', payload: 'error' })
                setTimeout(() => {
                    notifyDispatch({ type: 'CLEAR_NOTIFICATION' })
                }, 5000)
            }
        }
    }

    const style = { fontSize: '1.1rem' }

    return (
        <div>
            <h4 style={{ textTransform: 'capitalize' }}> {blog.title} </h4>
            <a
                href={
                    blog.url.startsWith('http')
                        ? blog.url
                        : `https://${blog.url}`
                }
            >
                {blog.url}
            </a>
            <p style={style}>
                {' '}
                {blog.likes} likes{' '}
                <Button
                    variant="primary"
                    onClick={() => handleUpdateBlog(blog)}
                >
                    {' '}
                    like{' '}
                </Button>
            </p>
            <Button
                style={deleteBtnStyle}
                variant="danger"
                onClick={() => handleDeleteBlog(blog.id)}
            >
                DELETE
            </Button>
            <p style={style}> Added by {blog.author} </p>

            <h3 className="text-primary"> comments </h3>
            <Form onSubmit={handleUpdateBlogComment}>
                <Form.Group>
                    <Form.Control type="text" name="comment" />
                </Form.Group>
                <Button
                    style={{ margin: '5px 0' }}
                    variant="primary"
                    type="submit"
                >
                    add comment
                </Button>
            </Form>

            <Table style={{ marginTop: 30 }} striped bordered hover>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                            <td>{comment}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Blog
