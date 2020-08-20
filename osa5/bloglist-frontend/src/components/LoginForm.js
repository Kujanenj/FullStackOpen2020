import React, { useState } from 'react'
import loginService from '../services/login'
const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            console.log("Repsonse,")
            console.log(user)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
            console.log("Incorrect")
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}
export default LoginForm