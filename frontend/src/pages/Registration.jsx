import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import { authAPI } from "../services/api";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"
];

const citiesByState = {
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli",],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  "Delhi": ["New Delhi"],
};

export default function Registration() {
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [occupation, setOccupation] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
  const validateMobile = (v) => /^\d{10}$/.test(v);
  const validatePincode = (v) => /^\d{6}$/.test(v);
  const passwordStrong = (pw) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);

  const onProfileClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const onProfileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setProfileFile(null);
      setProfilePreview(null);
      return;
    }
    setProfileFile(f);
    setProfilePreview(URL.createObjectURL(f));
    setErrors(prev => ({ ...prev, profile: "" }));
  };

  const onMobileChange = (e) => {
    const v = e.target.value.replace(/\D/g, "");
    if (v.length <= 10) setMobile(v);
  };

  const onPincodeChange = (e) => {
    const v = e.target.value.replace(/\D/g, "");
    if (v.length <= 6) setPincode(v);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const onStateChange = (e) => {
    setStateName(e.target.value);
    setCity("");
    setErrors(prev => ({ ...prev, state: "" }));
  };

  const checkField = (name) => {
    let err = "";
    switch (name) {
      case "profile":
        if (!profileFile) err = "";  // Profile photo is optional
        break;
      case "firstName":
        if (!firstName.trim()) err = "First name is required.";
        break;
      case "lastName":
        if (!lastName.trim()) err = "Last name is required.";
        break;
      case "gender":
        if (!gender) err = "Select gender.";
        break;
      case "dob":
        if (!dob) err = "Date of birth is required.";
        break;
      case "state":
        if (!stateName) err = "Select state.";
        break;
      case "city":
        if (!city.trim()) err = "City is required.";
        break;
      case "pincode":
        if (!validatePincode(pincode)) err = "Pincode must be 6 digits.";
        break;
      case "address":
        if (!address.trim() || address.trim().length < 10) err = "Address must be at least 10 characters.";
        break;
      case "qualification":
        if (!qualification) err = "Select qualification.";
        break;
      case "occupation":
        if (!occupation.trim()) err = "Occupation is required.";
        break;
      case "mobile":
        if (!validateMobile(mobile)) err = "Mobile must be exactly 10 digits.";
        break;
      case "email":
        if (!validateEmail(email)) err = "Invalid email address.";
        break;
      case "password":
        if (!passwordStrong(password)) err = "Password must be 8+ chars with upper, lower, number & special.";
        break;
      case "confirmPassword":
        if (confirmPassword !== password) err = "Passwords do not match.";
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: err }));
    return err === "";
  };

  const validateAll = () => {
    const keys = ["firstName","lastName","gender","dob","state","city","pincode","address","qualification","occupation","mobile","email","password","confirmPassword"];
    let ok = true;
    keys.forEach(k => {
      const res = checkField(k);
      if (!res) ok = false;
    });
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePhoto", profileFile);
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("state", stateName);
      formData.append("city", city);
      formData.append("pinCode", pincode);
      formData.append("address", address);
      formData.append("qualification", qualification);
      formData.append("occupation", occupation);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const response = await authAPI.register(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Registration successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      setErrors(prev => ({ ...prev, submit: error.response?.data?.message }));
    } finally {
      setLoading(false);
    }
  };

  const qualifications = ["SSLC","PUC","Diploma","B.Sc","B.Com","B.E/B.Tech","BCA","BBA","M.Sc","M.Com","M.E/M.Tech","MCA","MBA","PhD"];

  return (
    <div className="registration-page">
      <div className="left-panel">
        <div className="top-header">
          <img src="/logo.png" alt="FranchiseConnect Logo" className="site-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }} title="Go to Home" />
          <div className="site-title">FranchiseConnect</div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          {/* PROFILE PHOTO */}
          <div className={`field-row center`}>
            <div className="profile-wrapper">
              <div
                className={`profile-circle ${errors.profile ? "error-border" : ""}`}
                onClick={onProfileClick}
                title="Click to choose profile photo"
              >
                {profilePreview ? (
                  <img src={profilePreview} alt="preview" className="profile-img" />
                ) : (
                  <div className="profile-placeholder">Upload</div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/jpeg" style={{ display: "none" }} onChange={onProfileChange} />
              <label className="field-label muted">Profile Photo (JPG)</label>
              {errors.profile && <div className="error-text">{errors.profile}</div>}
            </div>
          </div>

          {/* NAME ROW */}
          <div className="field-row">
            <div className={`field ${errors.firstName ? "error-border" : ""}`}>
              <label>First Name <span className="req">*</span></label>
              <input value={firstName} onChange={e=>setFirstName(e.target.value)} onBlur={()=>checkField("firstName")} />
              {errors.firstName && <div className="error-text">{errors.firstName}</div>}
            </div>

            <div className="field">
              <label>Middle Name</label>
              <input value={middleName} onChange={e=>setMiddleName(e.target.value)} />
            </div>

            <div className={`field ${errors.lastName ? "error-border" : ""}`}>
              <label>Last Name <span className="req">*</span></label>
              <input value={lastName} onChange={e=>setLastName(e.target.value)} onBlur={()=>checkField("lastName")} />
              {errors.lastName && <div className="error-text">{errors.lastName}</div>}
            </div>
          </div>

          {/* GENDER */}
          <div className="field-row">
            <div className={`field ${errors.gender ? "error-border" : ""}`}>
              <label>Gender <span className="req">*</span></label>
              <div className="radio-row">
                <label className="radio"><input type="radio" name="gender" value="Male" checked={gender==="Male"} onChange={e=>{setGender(e.target.value); setErrors(prev=>({...prev, gender: ""}));}}/> Male</label>
                <label className="radio"><input type="radio" name="gender" value="Female" checked={gender==="Female"} onChange={e=>{setGender(e.target.value); setErrors(prev=>({...prev, gender: ""}));}}/> Female</label>
                <label className="radio"><input type="radio" name="gender" value="Other" checked={gender==="Other"} onChange={e=>{setGender(e.target.value); setErrors(prev=>({...prev, gender: ""}));}}/> Other</label>
              </div>
              {errors.gender && <div className="error-text">{errors.gender}</div>}
            </div>
          </div>

          {/* DOB / STATE / CITY */}
          <div className="field-row">
            <div className={`field ${errors.dob ? "error-border" : ""}`}>
              <label>Date of Birth <span className="req">*</span></label>
              <input type="date" value={dob} onChange={e=>setDob(e.target.value)} onBlur={()=>checkField("dob")} />
              {errors.dob && <div className="error-text">{errors.dob}</div>}
            </div>

            <div className={`field ${errors.state ? "error-border" : ""}`}>
              <label>State <span className="req">*</span></label>
              <select value={stateName} onChange={onStateChange} onBlur={()=>checkField("state")}>
                <option value="">Select State</option>
                {indianStates.map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <div className="error-text">{errors.state}</div>}
            </div>

            <div className={`field ${errors.city ? "error-border" : ""}`}>
              <label>City <span className="req">*</span></label>
              {citiesByState[stateName] ? (
                <select value={city} onChange={e=>setCity(e.target.value)} onBlur={()=>checkField("city")}>
                  <option value="">Select City</option>
                  {citiesByState[stateName].map(c=> <option key={c}>{c}</option>)}
                </select>
              ) : (
                <input value={city} onChange={e=>setCity(e.target.value)} onBlur={()=>checkField("city")} placeholder="Type city" />
              )}
              {errors.city && <div className="error-text">{errors.city}</div>}
            </div>
          </div>

          {/* PINCODE / ADDRESS */}
          <div className="field-row">
            <div className={`field ${errors.pincode ? "error-border" : ""}`}>
              <label>Pincode <span className="req">*</span></label>
              <input value={pincode} onChange={onPincodeChange} onBlur={()=>checkField("pincode")} placeholder="6-digit pincode" />
              {errors.pincode && <div className="error-text">{errors.pincode}</div>}
            </div>

            <div className={`field stretch ${errors.address ? "error-border" : ""}`}>
              <label>Address <span className="req">*</span></label>
              <textarea value={address} onChange={e=>setAddress(e.target.value)} onBlur={()=>checkField("address")} rows="2" />
              {errors.address && <div className="error-text">{errors.address}</div>}
            </div>
          </div>

          {/* QUALIFICATION / OCCUPATION */}
          <div className="field-row">
            <div className={`field ${errors.qualification ? "error-border" : ""}`}>
              <label>Qualification <span className="req">*</span></label>
              <select value={qualification} onChange={e=>setQualification(e.target.value)} onBlur={()=>checkField("qualification")}>
                <option value="">Select Qualification</option>
                {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              {errors.qualification && <div className="error-text">{errors.qualification}</div>}
            </div>

            <div className={`field ${errors.occupation ? "error-border" : ""}`}>
              <label>Occupation <span className="req">*</span></label>
              <input value={occupation} onChange={e=>setOccupation(e.target.value)} onBlur={()=>checkField("occupation")} />
              {errors.occupation && <div className="error-text">{errors.occupation}</div>}
            </div>
          </div>

          {/* MOBILE / EMAIL */}
          <div className="field-row">
            <div className={`field ${errors.mobile ? "error-border" : ""}`}>
              <label>Mobile Number <span className="req">*</span></label>
              <input value={mobile} onChange={onMobileChange} onBlur={()=>checkField("mobile")} placeholder="10 digits" />
              {errors.mobile && <div className="error-text">{errors.mobile}</div>}
            </div>

            <div className={`field ${errors.email ? "error-border" : ""}`}>
              <label>Email <span className="req">*</span></label>
              <input value={email} onChange={onEmailChange} onBlur={()=>checkField("email")} placeholder="example@email.com" />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
          </div>

          {/* PASSWORD / CONFIRM */}
          <div className="field-row">
            <div className={`field ${errors.password ? "error-border" : ""}`}>
              <label>Password <span className="req">*</span></label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onBlur={()=>checkField("password")} placeholder="8+ chars, upper/lower/number/special" />
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <div className={`field ${errors.confirmPassword ? "error-border" : ""}`}>
              <label>Confirm Password <span className="req">*</span></label>
              <div className="password-wrapper">
                <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} onBlur={()=>checkField("confirmPassword")} />
                <button type="button" className="eye-btn" onClick={()=>setShowConfirm(s=>!s)} aria-label="toggle confirm visibility">
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
            </div>
          </div>

          {errors.submit && <div className="error-text">{errors.submit}</div>}

          {/* BUTTONS */}
          <div className="field-row">
            <div className="buttons">
              <button type="submit" className="btn primary" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
              <button type="button" className="btn secondary" onClick={()=>{
                setProfileFile(null); setProfilePreview(null);
                setFirstName(""); setMiddleName(""); setLastName("");
                setGender(""); setDob(""); setStateName(""); setCity(""); setPincode("");
                setAddress(""); setQualification(""); setOccupation(""); setMobile("");
                setEmail(""); setPassword(""); setConfirmPassword(""); setErrors({});
              }}>Clear</button>
              <button type="button" className="btn secondary" onClick={()=>navigate("/login")}>Login</button>
            </div>
          </div>
        </form>
      </div>

      <div className="right-panel">
        <img src="/registration.png" alt="Registration Illustration" className="illustration" />
      </div>
    </div>
  );
}
