import { Table } from 'react-bootstrap'

const User = ({ user }) => {
    if (!user) {
        return null
    }
    const blogs = user.blogs
    return (
        <div>
            <h2>{user.name}</h2>
            {blogs.length > 0 ? (
                <Table striped hover>
                    <thead>
                        <tr>
                            <td>
                                <h4>added blogs</h4>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p> No blog yet </p>
            )}
        </div>
    )
}

export default User
