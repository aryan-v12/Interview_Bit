import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const success = await handleLogin({ email, password })
        if (success) navigate('/')
        else setError("Invalid email or password. Please try again.")
    }

    return (
        <main className="auth-page">
            <div className="form-container">
                <h1>Welcome Back</h1>

                {error && (
                    <p style={{ color: '#ff6b6b', fontSize: '0.85rem', background: 'rgba(255,107,107,0.08)', padding: '0.6rem 0.9rem', borderRadius: '0.5rem', border: '1px solid rgba(255,107,107,0.2)' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
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
                    <button className='button primary-button' type="submit">Sign In</button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Create One</Link></p>
            </div>
        </main>
    )
}

export default Login