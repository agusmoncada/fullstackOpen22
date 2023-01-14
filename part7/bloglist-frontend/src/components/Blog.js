import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {  deleteBlog, addLike } from "../reducers/blogsReducer"
import { alert } from "../reducers/notificationReducer"

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  
  const updateLike = async () => {
    try {
      dispatch(addLike(blog))
      dispatch(alert(`${blog.title} updated`, 5))
    } catch (exception) {
        dispatch(alert('liked couldnt be updated', 5))
    }
  }

  const remove = async () => {
    try {
      if (window.confirm(`remove ${blog.title} ?`)) {
        dispatch(deleteBlog(blog))
        dispatch(alert(`${blog.title} removed`, 5))
      }
    } catch (exception) {
        dispatch(alert(exception.response.data.error, 5))
    }    
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <h1>{blog.title} </h1>
      <div >
        <a href="apple.com">{blog.url}</a><br/>
        {blog.likes}<button className="like" onClick={updateLike}>like</button>
        <p>added by {blog.author}</p>
        <button onClick={remove}>remove</button>
      </div>
    </>  
  )
}
  

export default Blog