import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = event => {
        event.preventDefault()

        const data = {
            title,
            author,
            url
        }
        createBlog(data)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <form onSubmit={handleCreateBlog}>
                <h2>create new</h2>
                <div>
                    title: <input
                        type='text'
                        name='title'
                        data-testid='title'
                        value={title}
                        placeholder='title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author: <input
                        type='text'
                        name='author'
                        data-testid='author'
                        placeholder='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url: <input
                        type='text'
                        name='url'
                        data-testid='url'
                        placeholder='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default BlogForm