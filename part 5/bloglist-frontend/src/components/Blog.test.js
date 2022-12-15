import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"
import BlogForm from "./BlogForm";


describe('<Blog />', () => {
    const blog = {
        title: 'testing testing',
        author: 'agustin',
        url: 'agus.monc',
        likes: 0,
    }

    const mockHandler = jest.fn()

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog} updateLike={mockHandler}/>).container
    })

    test('renders title', () => {
        const title = screen.getByText('testing testing')
        expect(title).toBeDefined()
    })

    test('does not render toggable', () => {
        const div = container.querySelector('.toggle')
        expect(div).toHaveStyle('display: none')
    })

    test('clicked buttton shows url and #', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.toggle')

        expect(div).not.toHaveStyle('display: none')
    })

    test('clicks the like button twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')
        
        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
    
})

describe('<BlogForm />', () => {
    test('updates with the right details', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()
        
        render(<BlogForm createBlog={createBlog} />)

        const title = screen.getByPlaceholderText('write title here..')
        const author = screen.getByPlaceholderText('write author here..')
        const url = screen.getByPlaceholderText('write the url here..')
        
        const createButton = screen.getByText('create')

        await user.type(title, 'titulo goes here')
        await user.type(author, 'author goes here')
        await user.type(url, 'url goes here')

        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)

        expect(createBlog.mock.calls[0][0].title).toBe('titulo goes here')
        expect(createBlog.mock.calls[0][0].author).toBe('author goes here')
        expect(createBlog.mock.calls[0][0].url).toBe('url goes here')
    })
})



