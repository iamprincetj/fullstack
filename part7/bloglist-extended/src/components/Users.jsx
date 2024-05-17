import { useQuery } from '@tanstack/react-query'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
    const { data, isLoading } = useQuery({ queryKey: ['users'] })

    if (isLoading) {
        return <div>Loading...</div>
    }

    const users = data
    return (
        <>
            <div>
                <div>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <td>
                                    <h2>Users</h2>
                                </td>
                                <td>
                                    <h4>blogs created</h4>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/users/${user.id}`}>
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td> {user.blogs.length} </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Users
