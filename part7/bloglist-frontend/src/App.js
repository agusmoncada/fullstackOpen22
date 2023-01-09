import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toglabble from './components/Toglabble'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createNewBlog, deleteBlog, addLike } from './reducers/blogsReducer'
import store from './store'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [alertMesage, setAlertMessage] = useState(null)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
    console.log(store.getState())
  }, [dispatch])

  const reduxBlogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newLogin = async (newUser) => {
    try {
      const user = await loginService.login(newUser)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong name or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    if (!window.localStorage.getItem('loggedBlogAppUser')) {
      window.location.reload()
    }
  }

  const createBlog = async (newBlog) => {
   
    dispatch(createNewBlog(newBlog))

    setAlertMessage(`a new blog ${newBlog.title} by ${newBlog.author} added!`)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const removeBlog = async (oldBlog) => {
    try {
      if (window.confirm(`remove ${oldBlog.title} ?`)) {
        dispatch(deleteBlog(oldBlog))

        setAlertMessage(`${oldBlog.title} removed`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000);
      }
    } catch (exception) {
      console.log(exception);
      /*setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);*/
    }
    
  }

  const updateLike = async (newLikedBlog) => {
    try {
      dispatch(addLike(newLikedBlog))

      setAlertMessage(`${newLikedBlog.title} updated`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('liked couldnt be updated')
    }
    
  }

  if (user === null ) {
    return (
      <div>
        <h2>Blogs</h2>
        <ErrorMessage message={errorMessage}/>
        <LoginForm newLogin={newLogin}/>
      </div>
    )
  }

  return (
    <div>
      <ErrorMessage message={errorMessage}/>
      <Notification message={alertMesage}/>
      <h2>Blogs</h2>

      <h4>
        Welcome {user.name.toUpperCase()} 
        <button onClick={handleLogout}>loguot</button>
      </h4>
      

      <h3>Create New</h3>

      <Toglabble buttonLabel={'new blog'}>
        <BlogForm createBlog={createBlog} />
      </Toglabble>
  
      {reduxBlogs
      .slice()
      .sort((a, b) => b.likes - a.likes )
      .map(blog => <Blog key={blog.id} blog={blog}  updateLike={updateLike} removeBlog={removeBlog}/>)
      }
      
    </div>
  )
}

export default App
