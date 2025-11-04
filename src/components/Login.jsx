import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const match = users.find(
            (u) => u.email === input.email && u.password === input.password
        );

        if (match) {
            localStorage.setItem("loggedInUser", JSON.stringify(match));
            alert("Welcome back, " + match.name + "!");
            navigate("/Recipeform");
        } else {
            setError("Invalid credentials!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="text-center mb-4 text-white">Login to Your Library</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <input
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="form-control auth-input"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <input
                            name="password"
                            type="password"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="form-control auth-input"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3 text-white fw-bolder">
                    New user?{" "}
                    <span className="link-text" onClick={() => navigate("/")}>
                        Create Account
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;