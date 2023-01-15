import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { Button, Nav, Navbar, Container } from 'react-bootstrap'
import LinkContainer from 'react-router-bootstrap/LinkContainer'

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
    <Router className='container'>
      <Notification />
      {user ?
      <Navbar bg='dark' variant='dark'>
        <Container>
        <Nav variant='pills'>
          <Button variant='outline-secondary' onClick={handleLogout}>LOGOUT</Button>
          <Navbar.Text>welcome {user.name.toUpperCase()}</Navbar.Text>
          <LinkContainer to={'/'}><Nav.Link >BLOGS</Nav.Link></LinkContainer>
          <LinkContainer to={'/users'}><Nav.Link >USERS</Nav.Link></LinkContainer>
          
        </Nav>
        </Container>
      </Navbar>
      : null
      }
      
      <h2>Blogs</h2>
      
      <Routes>
        <Route path='/' element={user ? <Home /> : <LoginForm newLogin={newLogin}/>} />
        <Route path='/users' element={user ? <Users /> : <LoginForm newLogin={newLogin}/>} />
        <Route path='/users/:id' element={<User />}/>
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
