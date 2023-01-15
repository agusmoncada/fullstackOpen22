import { useState } from "react"
import PropTypes from 'prop-types'
import { Button, Form } from "react-bootstrap"

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAturhor] = useState('')
    const [url, setUrl] = useState('')
    
    const handleAuthor = (event) => {
        setAturhor(event.target.value)
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })

        setAturhor('')
        setTitle('')
        setUrl('')
    }

    return (
        <Form onSubmit={addBlog}>
            <Form.Group>
            <Form.Label>Title: </Form.Label>
            <Form.Control
                id="title"
                type="text"
                value={title}
                onChange={handleTitle}
                placeholder={'write title here..'}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label>Author: </Form.Label>
            <Form.Control
                id="author"
                type="text"
                value={author}
                onChange={handleAuthor}
                placeholder={'write author here..'}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label>URL: </Form.Label>
            <Form.Control
                id="url"
                type="text"
                value={url}
                onChange={handleUrl}
                placeholder={'write the url here..'}
            />
            </Form.Group>
            <Button type='submit'>create</Button>
        </Form>
    )
    
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm