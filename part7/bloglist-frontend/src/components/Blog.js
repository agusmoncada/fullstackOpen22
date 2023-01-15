import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {  deleteBlog, addLike, commentBlog } from "../reducers/blogsReducer"
import { alert } from "../reducers/notificationReducer"
import { Button, ListGroup, Form } from "react-bootstrap"
import { useState } from "react"

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const [comment, setComment] = useState('')

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

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(id, comment))
      setComment('')
      dispatch(alert('comment was added', 3))
    } catch (exception) {
      console.log(exception)
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
        {blog.likes}<Button variant='outline-secondary' className="like" onClick={updateLike}>like</Button>
        <p>added by {blog.author}</p>
        <Button variant="outline-warning" onClick={remove}>remove</Button>
      </div>
      
      <h4>comment</h4>
      <Form onSubmit={addComment}>
        <Form.Control 
            id='comment'
            type='text'
            value={comment}
            onChange={handleChange}
            placeholder={'write comment here..'}
        />
        <Button type='submit'>add comment</Button>
      </Form>
      
      <ListGroup>
      {blog.comments.map(comment => <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>)}
      </ListGroup>
    </>  
  )
}
  

export default Blog