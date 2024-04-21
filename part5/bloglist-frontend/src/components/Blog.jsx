import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        padding: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
    }

    const hideWhenVisible = { display: visible? 'none': '' }
    const showWhenVisible = { display: visible? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const user = JSON.parse(window.localStorage.getItem('loggedInUser'))

    const currentUser = user.username
    const blogUser = blog.user.username


    const blogVisiblity = { display:  blogUser === currentUser? '': 'none' }

    return (
        <>
            <div style={{ ...blogStyle, ...hideWhenVisible }} className='blog'>
                {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
            </div>
            <div style={{ ...showWhenVisible, ...blogStyle }} className='hidden'>
                <div>
                    {blog.title} <button onClick={toggleVisibility}>hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes} <button onClick={() => updateBlog(blog.id, blog, blog.user)}>like</button>
                </div>
                <div>
                    {blog.author}
                </div>
                <button style={blogVisiblity} onClick={() => deleteBlog(blog.id)} >
                    remove
                </button>
            </div>
        </>
    )
}

export default Blog