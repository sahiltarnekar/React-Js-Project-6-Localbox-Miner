import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(u => u.email === data.email);

        if (userExists) {
            alert("Already registered! Please login.");
            navigate("/login");
        } else {
            users.push(data);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Account created! You can login now.");
            navigate("/login");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="text-center mb-4 text-white">Create Recipe Account</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input
                            className="form-control auth-input"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <small className="text-danger">Name required</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control auth-input"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <small className="text-danger">Email required</small>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control auth-input"
                            placeholder="Password (min 4 characters)"
                            {...register("password", { required: true, minLength: 4 })}
                        />
                        {errors.password && <small className="text-danger">Min 4 chars</small>}
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