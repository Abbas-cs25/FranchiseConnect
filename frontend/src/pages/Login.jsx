import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Dummy validation (replace with backend later)
    if (email !== "abbas@gmail.com" || password !== "Abbas@123") {
      setError("Invalid email or password");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      {/* ------------ Container ------------- */}
      <div className="login-box">

        {/* Logo + Name */}
        <div className="login-header">
          <img src="/logo.png" className="login-logo" alt="logo" />
          <h2>FranchiseConnect</h2>
        </div>

        {/* Error message */}
        {error && <p className="error-text">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <label>Email *</label>
          <input type="email" name="email" placeholder="Enter Email" required />

          {/* Password */}
          <label>Password *</label>
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Forgot Password */}
          <p className="forgot-link" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>

          {/* Login Btn */}
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="register-text">
          New User? <Link to="/register">Register</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
