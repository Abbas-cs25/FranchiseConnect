import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { brandAPI } from "../services/api";
import "./uploadbrand.css";

const EditBrand = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    fetchBrandData();
  }, [brandId]);

  const fetchBrandData = async () => {
    try {
      setLoading(true);
      const response = await brandAPI.getBrandById(brandId);
      const brand = response.data.brand;
      
      setFormData({
        brandName: brand.brandName || "",
        category: brand.category || "",
        subCategory: brand.subCategory || "",
        investmentRange: brand.investmentRange || { min: 100000, max: 1000000000 },
        areaRequired: brand.areaRequired || "",
        franchiseOutlets: brand.franchiseOutlets || "",
        locations: brand.locations || [],
        establishedYear: brand.establishedYear || "",
        aboutBrand: brand.aboutBrand || "",
        operationCommencedOn: brand.operationCommencedOn || "",
        franchiseCommencedOn: brand.franchiseCommencedOn || "",
        brandFee: brand.brandFee || "",
        anticipatedReturn: brand.anticipatedReturn || "",
        paybackPeriod: brand.paybackPeriod || "",
        otherInvestmentRequirements: brand.otherInvestmentRequirements || "",
        expansionPlans: brand.expansionPlans || "",
        propertyTypeRequired: brand.propertyTypeRequired || "",
        headOfficeLocation: brand.headOfficeLocation || "",
        transferPeriod: brand.transferPeriod || "",
        isTermRenewable: brand.isTermRenewable || true,
      });

      if (brand.logo) {
        setLogoPreview(brand.logo);
      }
      if (brand.photos && brand.photos.length > 0) {
        setPhotoPreviews(brand.photos);
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
      alert("Failed to load brand data");
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);

    try {
      const response = await brandAPI.updateBrand(brandId, formData);
      alert("Brand updated successfully!");
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update brand");
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading brand data...</div>
      </div>
    );
  }

  return (
    <div className="upload-brand-page">
      <nav className="upload-navbar">
        <div className="nav-left">
          <img 
            src="/logo.png" 
            alt="FranchiseConnect Logo" 
            className="nav-logo" 
            onClick={() => navigate("/")} 
            title="Go to Home" 
          />
          <h2>Edit Brand</h2>
        </div>
        <div className="upload-nav-right">
          <button 
            onClick={() => navigate("/profile")} 
            className="nav-btn back-btn"
          >
            ← Back to Profile
          </button>
        </div>
      </nav>

      <div className="upload-container">
        <div className="form-header">
          <h1>Edit Brand Details</h1>
          <p>Update your brand information below</p>
        </div>

        <form onSubmit={handleSubmit} className="brand-form">
          {/* Basic Information */}
          <fieldset className="form-section">
            <legend>Basic Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brandName">Brand Name *</label>
                <input
                  id="brandName"
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter brand name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="establishedYear">Established Year *</label>
                <input
                  id="establishedYear"
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 2020"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subCategory">Sub Category *</label>
                <input
                  id="subCategory"
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter sub category"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="aboutBrand">About Brand *</label>
              <textarea
                id="aboutBrand"
                name="aboutBrand"
                value={formData.aboutBrand}
                onChange={handleInputChange}
                required
                placeholder="Describe your brand in detail"
                rows="5"
              />
            </div>
          </fieldset>

          {/* Logo and Photos */}
          <fieldset className="form-section">
            <legend>Logo and Photos</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="logo">Brand Logo</label>
                <input
                  id="logo"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {logoPreview && (
                  <div className="image-preview">
                    <img src={logoPreview} alt="Logo Preview" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="photos">Brand Photos (max 5)</label>
                <input
                  id="photos"
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                />
              </div>
            </div>

            {photoPreviews.length > 0 && (
              <div className="photos-preview">
                {photoPreviews.map((photo, index) => (
                  <div key={index} className="photo-item">
                    <img src={photo} alt={`Preview ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </fieldset>

          {/* Financial Information */}
          <fieldset className="form-section">
            <legend>Financial Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brandFee">Brand Fee</label>
                <input
                  id="brandFee"
                  type="number"
                  name="brandFee"
                  value={formData.brandFee}
                  onChange={handleInputChange}
                  placeholder="Enter brand fee"
                />
              </div>
              <div className="form-group">
                <label htmlFor="anticipatedReturn">Anticipated Return (%)</label>
                <input
                  id="anticipatedReturn"
                  type="number"
                  name="anticipatedReturn"
                  value={formData.anticipatedReturn}
                  onChange={handleInputChange}
                  placeholder="Enter anticipated return"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="investmentRangeMin">Investment Range - Min</label>
                <input
                  id="investmentRangeMin"
                  type="number"
                  name="investmentRange.min"
                  value={formData.investmentRange.min}
                  onChange={handleInputChange}
                  placeholder="Minimum investment"
                />
              </div>
              <div className="form-group">
                <label htmlFor="investmentRangeMax">Investment Range - Max</label>
                <input
                  id="investmentRangeMax"
                  type="number"
                  name="investmentRange.max"
                  value={formData.investmentRange.max}
                  onChange={handleInputChange}
                  placeholder="Maximum investment"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="paybackPeriod">Payback Period (years)</label>
                <input
                  id="paybackPeriod"
                  type="number"
                  name="paybackPeriod"
                  value={formData.paybackPeriod}
                  onChange={handleInputChange}
                  placeholder="Enter payback period"
                />
              </div>
              <div className="form-group">
                <label htmlFor="transferPeriod">Transfer Period (years)</label>
                <input
                  id="transferPeriod"
                  type="number"
                  name="transferPeriod"
                  value={formData.transferPeriod}
                  onChange={handleInputChange}
                  placeholder="Enter transfer period"
                />
              </div>
            </div>
          </fieldset>

          {/* Operational Information */}
          <fieldset className="form-section">
            <legend>Operational Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="areaRequired">Area Required (sq ft)</label>
                <input
                  id="areaRequired"
                  type="number"
                  name="areaRequired"
                  value={formData.areaRequired}
                  onChange={handleInputChange}
                  placeholder="Enter area required"
                />
              </div>
              <div className="form-group">
                <label htmlFor="franchiseOutlets">Franchise Outlets</label>
                <input
                  id="franchiseOutlets"
                  type="number"
                  name="franchiseOutlets"
                  value={formData.franchiseOutlets}
                  onChange={handleInputChange}
                  placeholder="Number of outlets"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="propertyTypeRequired">Property Type Required</label>
                <input
                  id="propertyTypeRequired"
                  type="text"
                  name="propertyTypeRequired"
                  value={formData.propertyTypeRequired}
                  onChange={handleInputChange}
                  placeholder="e.g., Commercial, Mall"
                />
              </div>
              <div className="form-group">
                <label htmlFor="headOfficeLocation">Head Office Location</label>
                <input
                  id="headOfficeLocation"
                  type="text"
                  name="headOfficeLocation"
                  value={formData.headOfficeLocation}
                  onChange={handleInputChange}
                  placeholder="Enter head office location"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="operationCommencedOn">Operation Commenced On</label>
                <input
                  id="operationCommencedOn"
                  type="date"
                  name="operationCommencedOn"
                  value={formData.operationCommencedOn}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="franchiseCommencedOn">Franchise Commenced On</label>
                <input
                  id="franchiseCommencedOn"
                  type="date"
                  name="franchiseCommencedOn"
                  value={formData.franchiseCommencedOn}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Additional Information */}
          <fieldset className="form-section">
            <legend>Additional Information</legend>
            
            <div className="form-group full-width">
              <label htmlFor="otherInvestmentRequirements">Other Investment Requirements</label>
              <textarea
                id="otherInvestmentRequirements"
                name="otherInvestmentRequirements"
                value={formData.otherInvestmentRequirements}
                onChange={handleInputChange}
                placeholder="List any other investment requirements"
                rows="3"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="expansionPlans">Expansion Plans</label>
              <textarea
                id="expansionPlans"
                name="expansionPlans"
                value={formData.expansionPlans}
                onChange={handleInputChange}
                placeholder="Describe your expansion plans"
                rows="3"
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="isTermRenewable">
                <input
                  id="isTermRenewable"
                  type="checkbox"
                  name="isTermRenewable"
                  checked={formData.isTermRenewable}
                  onChange={handleInputChange}
                />
                <span>Term is Renewable</span>
              </label>
            </div>
          </fieldset>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Brand"}
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/profile")}
              className="btn-cancel-edit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
