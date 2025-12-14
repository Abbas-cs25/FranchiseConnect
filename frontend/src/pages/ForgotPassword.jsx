import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    gender: "",
    dob: "",
    state: "",
    city: "",
    pincode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verifyAnswers = () => {
    if (
      form.email &&
      form.gender &&
      form.dob &&
      form.state &&
      form.city &&
      form.pincode
    ) {
      setIsVerified(true);
    }
  };

  const handleSave = () => {
    navigate("/login");
  };

  return (
    <div className="fp-page">
      <div className="fp-container">
        <h2 className="fp-title">Reset Password</h2>

        {/* USER VERIFICATION FIELDS */}
        {!isVerified ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter Registered Email"
              onChange={handleChange}
            />

            <select name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              name="dob"
              onChange={handleChange}
            />

            <input
              type="text"
              name="state"
              placeholder="Enter State"
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="Enter City"
              onChange={handleChange}
            />

            <input
              type="number"
              name="pincode"
              placeholder="Enter Pincode"
              onChange={handleChange}
            />

            <button
              className="fp-btn"
              onClick={verifyAnswers}
              disabled={
                !form.email ||
                !form.gender ||
                !form.dob ||
                !form.state ||
                !form.city ||
                !form.pincode
              }
            >
              Verify Details
            </button>
          </>
        ) : (
          <>
            {/* NEW PASSWORD FIELDS */}
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <button
              className="fp-btn"
              onClick={handleSave}
              disabled={
                form.newPassword.length < 6 ||
                form.confirmPassword.length < 6 ||
                form.newPassword !== form.confirmPassword
              }
            >
              Save
            </button>
          </>
        )}

        <div className="fp-back">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
