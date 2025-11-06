import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const match = users.find(
            (u) => u.email === data.email && u.password === data.password
        );
        if (match) {
            localStorage.setItem("loggedInUser", JSON.stringify(match));
            alert("Welcome back, " + match.name + "!");
            navigate("/Recipeform");
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="text-center mb-4 text-white">Login to Your Library</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                        <input
                            className="form-control auth-input"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <small className="text-danger">Email required</small>}
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            className="form-control auth-input"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <small className="text-danger">Password required</small>}
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