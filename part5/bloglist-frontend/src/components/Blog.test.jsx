import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


describe('<Blog />', () => {
    let container
    let blog
    let updateBlog
    let user

    beforeEach(() => {
        blog = {
            title: 'hello',
            author: 'Justin',
            url: 'https://google.com',
            likes: 0,
            user: {
                username: 'Justin'
            }
        }

        user = {
            username: 'Justin'
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user))

        updateBlog = vi.fn()

        container = render(<Blog
            blog={blog}
            updateBlog={updateBlog}
        />).container
    })

    test('does not render its URL or number of likes by default', () => {
        const element = container.querySelector('.hidden')
        const checkBlog = screen.getByText('hello Justin')
        const checkUrl = screen.getByText('https://google.com')
        const checkLikes = screen.getByText(`likes ${blog.likes}`)
        expect(checkBlog).toBeVisible()
        expect(checkUrl).not.toBeVisible()
        expect(checkLikes).not.toBeVisible()
        expect(element).toHaveStyle('display: none')
    })

    test('renders URL and number of likes when `view` button clicked', async () => {
        const element = container.querySelector('.hidden')
        const user = userEvent.setup()
        const viewBtn = screen.getByRole('button', { name: 'view' })

        await user.click(viewBtn)

        expect(element).not.toHaveStyle('display: none')
    })

    test('when like button is clicked twice', async () => {
        const viewBtn = screen.getByRole('button', { name: 'view' })
        const user = userEvent.setup()

        await user.click(viewBtn)
        const likeBtn = screen.getByRole('button', { name: 'like' })
        await user.dblClick(likeBtn)

        expect(updateBlog.mock.calls).toHaveLength(2)
    })
})

describe('<BlogForm />', () => {
    let container
    let createBlog
    beforeEach(() => {
        createBlog = vi.fn()
        container = render(<BlogForm createBlog={createBlog}/>).container
    })
    test('calls the eventHandler', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('create')
        const title = await screen.findByPlaceholderText('title')
        const url = await screen.findByPlaceholderText('url')
        const author = await screen.findByPlaceholderText('author')

        await user.type(title, 'hi there')
        await user.type(url, 'https://animepahe.ru')
        await user.type(author, 'Justin')
        await user.click(button)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toEqual({ title: 'hi there', author: 'Justin', url: 'https://animepahe.ru' })
    })
})