import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { authAPI } from "../services/api";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("verify"); // verify or reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [form, setForm] = useState({
    email: "",
    gender: "",
    dob: "",
    state: "",
    city: "",
    pinCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const verifyDetails = async () => {
    if (!form.email || !form.gender || !form.dob || !form.state || !form.city || !form.pinCode) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyForgotPassword({
        email: form.email,
        gender: form.gender,
        dob: form.dob,
        state: form.state,
        city: form.city,
        pinCode: form.pinCode,
      });
      setResetToken(response.data.resetToken);
      setStep("reset");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!form.newPassword || !form.confirmPassword) {
      setError("Both password fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword(resetToken, form.newPassword, form.confirmPassword);
      alert("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-container">
        <h2 className="fp-title">Reset Password</h2>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        {step === "verify" ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter Registered Email"
              value={form.email}
              onChange={handleChange}
            />

            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />

            <select name="state" value={form.state} onChange={handleChange}>
              <option value="">Select State</option>
              {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={form.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pinCode"
              placeholder="Enter Pincode"
              value={form.pinCode}
              onChange={handleChange}
            />

            <button
              className="fp-btn"
              onClick={verifyDetails}
              disabled={loading || !form.email || !form.gender || !form.dob || !form.state || !form.city || !form.pinCode}
            >
              {loading ? "Verifying..." : "Verify Details"}
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button
              className="fp-btn"
              onClick={handlePasswordReset}
              disabled={loading || form.newPassword.length < 8 || form.confirmPassword.length < 8 || form.newPassword !== form.confirmPassword}
            >
              {loading ? "Resetting..." : "Reset Password"}
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
