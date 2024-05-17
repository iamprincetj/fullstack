import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()

        const data = {
            title,
            author,
            url,
        }
        createBlog(data)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <Form onSubmit={handleCreateBlog}>
                <h2>create new</h2>
                <Form.Group>
                    <Form.Label>title: </Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        data-testid="title"
                        value={title}
                        placeholder="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>author: </Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        data-testid="author"
                        placeholder="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>url: </Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        data-testid="url"
                        placeholder="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    create
                </Button>
            </Form>
        </>
    )
}

export default BlogForm
