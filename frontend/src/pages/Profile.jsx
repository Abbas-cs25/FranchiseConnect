import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI, brandAPI } from "../services/api";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [deletingBrandId, setDeletingBrandId] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data.user);
      setFormData(response.data.user);
      
      const brandsResponse = await userAPI.getUserBrands();
      setBrands(brandsResponse.data.brands);
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await userAPI.updateProfile(formData);
      setUser(response.data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleDeleteBrand = async (brandId) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        setDeletingBrandId(brandId);
        await brandAPI.deleteBrand(brandId);
        setBrands(brands.filter(b => b._id !== brandId));
        alert("Brand deleted successfully!");
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete brand");
      } finally {
        setDeletingBrandId(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="profile-page">
      {/* Navigation Bar */}
      <nav className="profile-navbar">
        <div className="profile-nav-left">
          <img src="/logo.png" alt="Logo" className="profile-nav-logo" />
          <h2 onClick={() => navigate("/")} className="profile-nav-title">FranchiseConnect</h2>
        </div>
        <div className="profile-nav-right">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="profile-nav-btn edit-btn"
          >
            Edit Profile
          </button>
          <button 
            onClick={() => navigate("/upload-brand")} 
            className="profile-nav-btn upload-btn"
          >
            +Upload New Brand
          </button>
          <button 
            onClick={() => navigate("/dashboard")} 
            className="profile-nav-btn dashboard-btn"
          >
            Dashboard
          </button>
          <button 
            onClick={handleLogout} 
            className="profile-nav-btn logout-btn"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="profile-main-container">
        {/* Profile Section */}
        <div className="profile-card-container">
          <div className="profile-header">
            {user?.profilePhoto && (
              <img src={user.profilePhoto} alt="Profile" className="profile-photo" />
            )}
            {!user?.profilePhoto && (
              <div className="profile-photo-placeholder">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            )}
            <div className="profile-header-info">
              <h2>{user?.firstName} {user?.lastName}</h2>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <div className="profile-info-display">
              <div className="info-grid">
                <div className="info-item">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="info-item">
                  <label>Mobile</label>
                  <p>{user?.mobile || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p>{user?.gender || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Date of Birth</label>
                  <p>{user?.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>State</label>
                  <p>{user?.state || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>City</label>
                  <p>{user?.city || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Pincode</label>
                  <p>{user?.pinCode || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Address</label>
                  <p>{user?.address || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Qualification</label>
                  <p>{user?.qualification || "Not provided"}</p>
                </div>
                <div className="info-item">
                  <label>Occupation</label>
                  <p>{user?.occupation || "Not provided"}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text"
                    value={formData.firstName || ""} 
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text"
                    value={formData.lastName || ""} 
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email"
                    value={formData.email || ""} 
                    disabled
                    className="form-input-disabled"
                  />
                  <p className="form-hint">Email cannot be changed</p>
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input 
                    type="tel"
                    value={formData.mobile || ""} 
                    disabled
                    className="form-input-disabled"
                  />
                  <p className="form-hint">Mobile number cannot be changed</p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    value={formData.gender || ""} 
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date"
                    value={formData.dob ? formData.dob.split('T')[0] : ""} 
                    onChange={(e) => setFormData({...formData, dob: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text"
                    value={formData.state || ""} 
                    onChange={(e) => setFormData({...formData, state: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text"
                    value={formData.city || ""} 
                    onChange={(e) => setFormData({...formData, city: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pincode</label>
                  <input 
                    type="text"
                    value={formData.pinCode || ""} 
                    onChange={(e) => setFormData({...formData, pinCode: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Qualification</label>
                  <input 
                    type="text"
                    value={formData.qualification || ""} 
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea 
                    value={formData.address || ""} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Occupation</label>
                  <input 
                    type="text"
                    value={formData.occupation || ""} 
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})} 
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save-changes">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* My Brands Section */}
        <div className="my-brands-container">
          <div className="brands-header">
            <h3>My Brands</h3>
            <button 
              onClick={() => navigate("/upload-brand")} 
              className="btn-add-brand"
            >
              +Upload New Brand
            </button>
          </div>

          {brands.length === 0 ? (
            <div className="no-brands-message">
              <p>You haven't uploaded any brands yet. Start by creating your first brand!</p>
              <button 
                onClick={() => navigate("/upload-brand")} 
                className="btn-add-brand"
              >
                +Upload New Brand
              </button>
            </div>
          ) : (
            <div className="brands-grid">
              {brands.map(brand => (
                <div key={brand._id} className="brand-card">
                  {brand.logo && (
                    <img src={brand.logo} alt={brand.brandName} className="brand-logo" />
                  )}
                  {!brand.logo && (
                    <div className="brand-logo-placeholder">
                      {brand.brandName?.[0]}
                    </div>
                  )}
                  <div className="brand-info">
                    <h4>{brand.brandName}</h4>
                    <p className="brand-category">{brand.category}</p>
                    {brand.description && (
                      <p className="brand-description">{brand.description.substring(0, 80)}...</p>
                    )}
                  </div>
                  <div className="brand-actions">
                    <button 
                      onClick={() => navigate(`/brand/${brand._id}`)} 
                      className="btn-view-details"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => navigate(`/edit-brand/${brand._id}`)} 
                      className="btn-edit-brand"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteBrand(brand._id)}
                      disabled={deletingBrandId === brand._id}
                      className="btn-delete-brand"
                    >
                      {deletingBrandId === brand._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
