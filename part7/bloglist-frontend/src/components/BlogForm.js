import { useState } from "react"
import PropTypes from 'prop-types'

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
        <form onSubmit={addBlog}>
            <div>
            title:
            <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitle}
                placeholder={'write title here..'}
            />
            </div>
            <div>
            author:
            <input
                id="author"
                type="text"
                value={author}
                onChange={handleAuthor}
                placeholder={'write author here..'}
            />
            </div>
            <div>
            url:
            <input
                id="url"
                type="text"
                value={url}
                onChange={handleUrl}
                placeholder={'write the url here..'}
            />
            </div>
            <button type='submit'>create</button>
        </form>
    )
    
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm