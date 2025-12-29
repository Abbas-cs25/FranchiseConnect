import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { brandAPI, interestAPI } from "../services/api";
import "./Dashboard.css";
import "./BrandDetail.css";

const BrandDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    investmentRange: "",
    locationToPlant: "",
    propertyType: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchBrand();
  }, [id]);

  useEffect(() => {
    // Set default user data
    setFormData(prev => ({
      ...prev,
      userName: user.firstName + " " + user.lastName || "",
      email: user.email || "",
    }));
  }, [user]);

  const fetchBrand = async () => {
    try {
      const response = await brandAPI.getBrandById(id);
      setBrand(response.data.brand);
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearForm = () => {
    setFormData({
      userName: user.firstName + " " + user.lastName || "",
      email: user.email || "",
      investmentRange: "",
      locationToPlant: "",
      propertyType: "",
    });
  };

  const handleSendInterest = () => {
    // Create the email message
    const message = `Dear ${brand.ownerId?.firstName || "Brand Owner"},

I hope this message finds you well.

My name is ${formData.userName}, and I am writing to express my interest in your franchise opportunity listed on the FranchiseConnect platform. I have reviewed your brand details and find the business model and growth potential very appealing.

Here are a few details from my side for your reference:

• **Interested Investment Range:** ${formData.investmentRange || "NA"}
• **Preferred Location:** ${formData.locationToPlant || "NA"}
• **Property Type Available/Preferred:** ${formData.propertyType || "NA"}

I would be glad to discuss this opportunity further and understand the next steps involved in the franchise process. Please feel free to contact me at your convenience.

**Email:** ${formData.email}
**Phone:** ${user.mobile || "NA"}

Looking forward to your response.

Thank you for your time and consideration.

Warm regards,
${formData.userName}
Investor – Franchise Connect`;

    // Create Gmail link with the subject and body
    const subject = `Interested in ${brand.brandName} franchiseconnect`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${brand.ownerId?.email || ""}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    // Open Gmail in new window
    window.open(gmailLink, '_blank');

    // Also save the interest request in the database
    handleSubmitInterest();
  };

  const handleSubmitInterest = async () => {
    try {
      await interestAPI.createInterestRequest({
        brandId: id,
        userName: formData.userName,
        email: formData.email,
        investmentRange: formData.investmentRange,
        locationToPlant: formData.locationToPlant,
        propertyType: formData.propertyType,
      });
    } catch (error) {
      console.error("Error saving interest request:", error);
    }
  };

  const nextPhoto = () => {
    if (brand?.photos && brand.photos.length > 0) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % brand.photos.length);
    }
  };

  const prevPhoto = () => {
    if (brand?.photos && brand.photos.length > 0) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + brand.photos.length) % brand.photos.length);
    }
  };

  const goToPhoto = (index) => {
    setCurrentPhotoIndex(index);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!brand) return <div className="not-found">Brand not found</div>;

  return (
    <div className="brand-detail-page">
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="FranchiseConnect Logo" className="nav-logo" onClick={() => navigate("/")} title="Go to Home" />
          <h2>FranchiseConnect</h2>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate("/dashboard")} className="nav-btn nav-btn-primary">Dashboard</button>
          <button onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }} className="nav-btn nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="brand-detail-container">
        {/* Photo Slider Section */}
        {brand.photos && brand.photos.length > 0 && (
          <div className="photo-slider-section">
            <div className="main-slider">
              <img src={brand.photos[currentPhotoIndex]} alt={`Brand photo ${currentPhotoIndex + 1}`} className="main-photo" />
              <button className="slider-btn slider-btn-prev" onClick={prevPhoto}>❮</button>
              <button className="slider-btn slider-btn-next" onClick={nextPhoto}>❯</button>
              <div className="photo-counter">{currentPhotoIndex + 1} / {brand.photos.length}</div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="thumbnails-container">
              {brand.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${idx === currentPhotoIndex ? "active" : ""}`}
                  onClick={() => goToPhoto(idx)}
                >
                  <img src={photo} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brand Info Container */}
        <div className="brand-info-section">
          <div className="brand-header">
            <div className="brand-title-section">
              <h1 className="brand-name">{brand.brandName}</h1>
              <p className="category">{brand.category} • {brand.subCategory}</p>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div className="key-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Investment Range</span>
              <span className="stat-value">₹{brand.investmentRange?.min?.toLocaleString() || "NA"} - ₹{brand.investmentRange?.max?.toLocaleString() || "NA"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Brand Fee</span>
              <span className="stat-value">₹{brand.brandFee?.toLocaleString() || "NA"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Expected Return</span>
              <span className="stat-value">{brand.anticipatedReturn || "NA"}% p.a.</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Payback Period</span>
              <span className="stat-value">{brand.paybackPeriod || "NA"}</span>
            </div>
          </div>

          {/* About the Brand - Left Aligned */}
          <div className="about-brand-section">
            <h2 className="section-title">About the Brand</h2>
            <p className="about-text">{brand.aboutBrand || "NA"}</p>
          </div>

          {/* Additional Details */}
          <div className="additional-details-grid">
            {brand.expansionPlans && (
              <div className="detail-box">
                <h3 className="detail-title">Expansion Plans</h3>
                <p className="detail-text">{brand.expansionPlans}</p>
              </div>
            )}
            {brand.otherInvestmentRequirements && (
              <div className="detail-box">
                <h3 className="detail-title">Investment Requirements</h3>
                <p className="detail-text">{brand.otherInvestmentRequirements}</p>
              </div>
            )}
          </div>

          {/* Location Details in Table Format */}
          <div className="location-section">
            <h2 className="section-title">Location & Property Details</h2>
            <table className="location-table">
              <tbody>
                <tr>
                  <td className="label">Area Required</td>
                  <td className="value">{brand.areaRequired || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Property Type Required</td>
                  <td className="value">{brand.propertyTypeRequired || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Head Office Location</td>
                  <td className="value">{brand.headOfficeLocation || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Franchise Outlets</td>
                  <td className="value">{brand.franchiseOutlets || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Established Year</td>
                  <td className="value">{brand.establishedYear || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Transfer Period</td>
                  <td className="value">{brand.transferPeriod || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Term Renewable</td>
                  <td className="value">{brand.isTermRenewable ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          

          {/* Brand Owner Details */}
          <div className="owner-section">
            <h2 className="section-title">Contact Information</h2>
            <table className="owner-table">
              <tbody>
                <tr>
                  <td className="label">Contact Person</td>
                  <td className="value">{brand.ownerId?.firstName || "NA"} {brand.ownerId?.lastName || ""}</td>
                </tr>
                <tr>
                  <td className="label">Email</td>
                  <td className="value">{brand.ownerId?.email || "NA"}</td>
                </tr>
                <tr>
                  <td className="label">Mobile</td>
                  <td className="value">{brand.ownerId?.mobile || "NA"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Button */}
          <div className="action-section">
            <button 
              onClick={() => setShowInterestForm(true)} 
              className="btn-send-interest"
            >
              Send Interest Request
            </button>
            <button 
              onClick={() => navigate("/dashboard")} 
              className="btn-back"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Interest Modal */}
      {showInterestForm && (
        <div className="modal-overlay" onClick={() => setShowInterestForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Send Interest Request</h2>
              <button className="close-btn" onClick={() => setShowInterestForm(false)}>×</button>
            </div>

            <div className="modal-body">
              <form className="interest-form">
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    disabled
                    className="input-default"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="input-default"
                  />
                </div>

                <div className="form-group">
                  <label>Investment Range *</label>
                  <input
                    type="text"
                    name="investmentRange"
                    placeholder="e.g., 5-10 Lakhs"
                    value={formData.investmentRange}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location to Plant *</label>
                  <input
                    type="text"
                    name="locationToPlant"
                    placeholder="e.g., Mumbai, Delhi"
                    value={formData.locationToPlant}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Property Type *</label>
                  <input
                    type="text"
                    name="propertyType"
                    placeholder="e.g., Commercial, Retail"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-clear" 
                onClick={handleClearForm}
              >
                Clear
              </button>
              <button 
                className="btn-send" 
                onClick={handleSendInterest}
              >
                Send
              </button>
              <button 
                className="btn-close-modal" 
                onClick={() => setShowInterestForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandDetail;
