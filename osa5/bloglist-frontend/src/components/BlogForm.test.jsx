import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write blog title here')
    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    const inputUrl = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('save')

    await user.type(inputTitle, 'BlogForm test')
    await user.type(inputAuthor, 'Tester Tester')
    await user.type(inputUrl, 'www.blogform.fi')
    await user.click(sendButton)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('BlogForm test')
    expect(createBlog.mock.calls[0][0].author).toBe('Tester Tester')
    expect(createBlog.mock.calls[0][0].url).toBe('www.blogform.fi')
})