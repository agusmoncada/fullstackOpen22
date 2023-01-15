import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const LoginForm = ({newLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handlePassworChange = (event) => {
        setPassword(event.target.value)
    }

    const handleUserNameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()

        newLogin({
            username: username,
            password: password
        })
        setPassword('')
        setUsername('')
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
                id="username"
                type='text'
                value={username}
                name="Username"
                onChange={handleUserNameChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
                id="password"
                type='password'
                value={password}
                name="Password"
                onChange={handlePassworChange}
            />
            </Form.Group>
            <Button id="login-button" type='submit'>login</Button>
        </Form>
    )
}

export default LoginForm