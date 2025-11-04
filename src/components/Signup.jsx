import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.name || !input.email || !input.password) {
            setError('All fields are required');
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(u => u.email === input.email);

        if (userExists) {
            alert("Already registered! Please login.");
            navigate("/login");
        } else {
            users.push(input);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Account created! You can login now.");
            navigate("/login");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="text-center mb-4 text-white">Create Recipe Account</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            name="name"
                            type="text"
                            value={input.name}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="form-control auth-input"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <p className="text-center mt-3 text-white fw-bolder">
                    Already a member?{" "}
                    <span className="link-text" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;