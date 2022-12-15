import { useState } from "react"

const Blog = ({ blog, updateLike, removeBlog }) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : ''}

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    const addLike = () => {
      updateLike(blog)
    }

    const remove = () => {
      removeBlog(blog)
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div className='blog' style={blogStyle}>
        {blog.title}  <button className="show" style={showWhenVisible} onClick={toggleVisibility}>cancel</button><button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <div style={showWhenVisible} className='toggle'>
          {blog.url}<br/>
          {blog.likes}<button className="like" onClick={addLike}>like</button><br/>
          {blog.author}<br/>
          <button onClick={remove}>remove</button>
        </div>
      </div>  
    )
}
  

export default Blog