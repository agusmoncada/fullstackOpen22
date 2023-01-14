import BlogForm from './BlogForm'
import Toglabble from './Toglabble'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { alert } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    
    const createBlog = async (newBlog) => {
        dispatch(createNewBlog(newBlog))
        dispatch(alert(`a new blog ${newBlog.title} by ${newBlog.author} added!`, 5))
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

    if (!blogs) {
        return null
    }
    
    return (
        <>
        <h3>Create New</h3>
        <Toglabble buttonLabel={'new blog'}>
            <BlogForm createBlog={createBlog} />
        </Toglabble>
        
        {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes )
        .map(blog => <p key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></p> )}
        </>
    )
}

export default Home