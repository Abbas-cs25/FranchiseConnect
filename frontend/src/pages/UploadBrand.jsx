import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandAPI } from "../services/api";
import "./uploadbrand.css";

const UploadBrand = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [formData, setFormData] = useState({
    brandName: "",
    category: "",
    subCategory: "",
    investmentRange: { min: 100000, max: 1000000000 },
    areaRequired: "",
    franchiseOutlets: "",
    locations: [],
    establishedYear: "",
    aboutBrand: "",
    operationCommencedOn: "",
    franchiseCommencedOn: "",
    brandFee: "",
    anticipatedReturn: "",
    paybackPeriod: "",
    otherInvestmentRequirements: "",
    expansionPlans: "",
    propertyTypeRequired: "",
    headOfficeLocation: "",
    transferPeriod: "",
    isTermRenewable: true,
  });

  const categories = [
    "Food & Beverages",
    "Retail & Fashion",
    "Health & Wellness",
    "Education",
    "Beauty & Salon",
    "Automobiles",
    "Electronics",
    "Real Estate",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("investmentRange.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        investmentRange: {
          ...formData.investmentRange,
          [field]: parseFloat(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setFormData({ ...formData, photos: files });
    setPhotoPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await brandAPI.createBrand(formData);
      alert("Brand uploaded successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-brand-page">
      <nav className="upload-navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="FranchiseConnect Logo" className="nav-logo" onClick={() => navigate("/")} title="Go to Home" />
          <h2>FranchiseConnect</h2>
        </div>
        <div className="upload-nav-right">
          <button onClick={() => navigate("/dashboard")} className="upload-nav-btn">Dashboard</button>
          <button onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }} className="upload-nav-btn upload-logout-btn">Logout</button>
        </div>
      </nav>

      <div className="upload-container">
        <h2>Upload Your Brand</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-form-section">
            <h3>Basic Information</h3>
            <div className="upload-form-group">
              <label>Brand Name *</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="upload-form-group">
              <label>Sub Category *</label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>About Brand *</label>
              <textarea
                name="aboutBrand"
                value={formData.aboutBrand}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
          </div>

          <div className="upload-form-section">
            <h3>Investment Details</h3>
            <div className="upload-form-row">
              <div className="upload-form-group">
                <label>Min Investment (₹) *</label>
                <input
                  type="number"
                  name="investmentRange.min"
                  value={formData.investmentRange.min}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="upload-form-group">
                <label>Max Investment (₹) *</label>
                <input
                  type="number"
                  name="investmentRange.max"
                  value={formData.investmentRange.max}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="upload-form-group">
              <label>Brand Fee (₹) *</label>
              <input
                type="number"
                name="brandFee"
                value={formData.brandFee}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Anticipated Return (%) *</label>
              <input
                type="number"
                name="anticipatedReturn"
                value={formData.anticipatedReturn}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Payback Period *</label>
              <input
                type="text"
                name="paybackPeriod"
                placeholder="e.g., 2-3 years"
                value={formData.paybackPeriod}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="upload-form-section">
            <h3>Operational Details</h3>
            <div className="upload-form-group">
              <label>Area Required *</label>
              <input
                type="text"
                name="areaRequired"
                value={formData.areaRequired}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Number of Franchise Outlets *</label>
              <input
                type="number"
                name="franchiseOutlets"
                value={formData.franchiseOutlets}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Established Year *</label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Operation Commenced On *</label>
              <input
                type="date"
                name="operationCommencedOn"
                value={formData.operationCommencedOn}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Franchise Commenced On *</label>
              <input
                type="date"
                name="franchiseCommencedOn"
                value={formData.franchiseCommencedOn}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Property Type Required *</label>
              <input
                type="text"
                name="propertyTypeRequired"
                value={formData.propertyTypeRequired}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Head Office Location *</label>
              <input
                type="text"
                name="headOfficeLocation"
                value={formData.headOfficeLocation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>Transfer Period *</label>
              <input
                type="text"
                name="transferPeriod"
                placeholder="e.g., 5 years"
                value={formData.transferPeriod}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="upload-form-group">
              <label>
                <input
                  type="checkbox"
                  name="isTermRenewable"
                  checked={formData.isTermRenewable}
                  onChange={handleInputChange}
                />
                Is Term Renewable
              </label>
            </div>
          </div>

          <div className="upload-form-section">
            <h3>Media Files (JPG Only)</h3>
            <div className="upload-form-group">
              <label>Brand Logo *</label>
              <input
                type="file"
                accept="image/jpeg"
                onChange={handleLogoChange}
                required
              />
              {logoPreview && <img src={logoPreview} alt="Logo" className="upload-preview-img" />}
            </div>

            <div className="upload-form-group">
              <label>Brand Photos (Up to 5) *</label>
              <input
                type="file"
                accept="image/jpeg"
                multiple
                onChange={handlePhotosChange}
                required
              />
              <div className="upload-photos-preview">
                {photoPreviews.map((src, idx) => (
                  <img key={idx} src={src} alt={`Photo ${idx + 1}`} className="upload-preview-img" />
                ))}
              </div>
            </div>
          </div>

          <div className="upload-form-actions">
            <button type="submit" className="upload-btn-primary" disabled={loading}>
              {loading ? "Uploading..." : "Upload Brand"}
            </button>
            <button type="button" onClick={() => navigate("/dashboard")} className="upload-btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBrand;
