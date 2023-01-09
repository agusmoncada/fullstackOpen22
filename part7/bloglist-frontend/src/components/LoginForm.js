import { useState } from "react"

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
        <form onSubmit={handleLogin}>
            <div>
            username
            <input
                id="username"
                type='text'
                value={username}
                name="Username"
                onChange={handleUserNameChange}
            />
            </div>
            <div>
            password
            <input
                id="password"
                type='password'
                value={password}
                name="Password"
                onChange={handlePassworChange}
            />
            </div>
            <button id="login-button" type='submit'>login</button>
        </form>
    )
}

export default LoginForm