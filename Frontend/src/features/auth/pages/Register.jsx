import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const success = await handleRegister({ username, email, password })
        if (success) navigate("/")
        else setError("Registration failed. Username or email may already be taken.")
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Create account</h1>

                {error && (
                    <p style={{ color: '#ff6b6b', fontSize: '0.85rem', background: 'rgba(255,107,107,0.08)', padding: '0.6rem 0.9rem', borderRadius: '0.5rem', border: '1px solid rgba(255,107,107,0.2)' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='your_username' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='you@example.com' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='••••••••' required />
                    </div>
                    <button className='button primary-button' type="submit">Create Account</button>
                </form>

                <p>Already have an account? <Link to={"/login"}>Sign In</Link></p>
            </div>
        </main>
    )
}

export default Register