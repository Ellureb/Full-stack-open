import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title', () => {
    const blog = {
        title: 'This is a test to render blog title',
        author: 'Testi Tes',
        url: 'www.test.fi'
    }

    render(<Blog blog={blog} />)

    screen.debug()

    const element = screen.getByText(/This is a test to render blog title/)

    expect(element).toBeDefined()
})