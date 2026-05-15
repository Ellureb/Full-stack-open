import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
    const blog = {
        title: 'This is a test to render blog title',
        author: 'Testi Tes',
        url: 'www.test.fi'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText(/This is a test to render blog title/)

    expect(element).toBeDefined()
})

test('after clicking the button, url, likes and user is showed', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Testi',
        url: 'www.test.fi',
        likes: 5,
        user: {
            name: 'Test User'
        }
    }
    
    const user = userEvent.setup()

    render(<Blog blog={blog} />)

    const button = screen.getByText('show more')
    await user.click(button)

    expect(screen.getByText('url: www.test.fi')).toBeVisible()
    expect(screen.getByText('likes: 5')).toBeVisible()
    expect(screen.getByText('added by: Test User')).toBeVisible()
})

test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Testi',
        url: 'www.test.fi',
        likes: 5,
        user: {
            name: 'Test User'
        }
    }

    const mockHandler = vi.fn()

    render(
        <Blog blog={blog} handleLikeClick={mockHandler} />
    )

    const user = userEvent.setup()

    const showButton = screen.getByText('show more')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})