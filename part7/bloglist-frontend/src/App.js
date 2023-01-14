import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { alert } from './reducers/notificationReducer'
import { initializeUser, loginUSer, logOutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const newLogin = async (newUser) => {
    try {
      dispatch(loginUSer(newUser))
    } catch (exception) {
      dispatch(alert('Wrong name or password', 5))
    }
  }

  const handleLogout = () => {
    dispatch(logOutUser())
    dispatch(alert('User Logged out', 5))
  }

  return (
    <Router>
      <Notification />
      {user?
      <div>
      <Link to={'/'}>blogs</Link>
      <Link to={'/users'}>users</Link>
      <>welcome {user.name.toUpperCase()}</>
      <button onClick={handleLogout}>loguot</button>
      </div> 
      : null
      }
      
      <h2>Blogs</h2>
      
      <Routes>
        <Route path='/' element={user ? <Home /> : <LoginForm newLogin={newLogin}/>} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />}/>
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
