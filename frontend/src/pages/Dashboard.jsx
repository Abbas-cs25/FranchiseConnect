// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { brandAPI, favoriteAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentAdvSlide, setCurrentAdvSlide] = useState(0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Advertisement slides
  const advSlides = [
    { id: 1, image: "/ad1.png", url: "https://franchising.bk.com/franchise-fee" },
    { id: 2, image: "/ad2.png", url: "https://www.vrlgroup.in/vrl_investors_desk.aspx" },
    { id: 3, image: "/ad3.png", url: "https://franchise.tealogy.in/" },
    { id: 4, image: "ad4.png", url: "https://www.lakmesalon.in/" },
    { id: 5, image: "/ad5.png", url: "https://www.franchiseindia.com/brands/t-r-autoworks.104371" },
  ];
  
  // Similar websites
  const similarSites = [
    { id: 1, image: "/sim1.png", url: "https://www.entrepreneur.com" },
    { id: 2, image: "/sim2.png", url: "https://www.indianretailer.com" },
    { id: 3, image: "/sim3.png", url:   "https://www.restaurantindia.in/" },
    { id: 4, image: "/sim4.png", url: "https://www.franchisenepal.com/" },
    { id: 5, image: "/sim5.png", url: "https://www.franchisebangladesh.com/" },
    { id: 6, image: "/sim6.png", url: "https://www.indianretailer.com/brandlicense/" },
    { id: 7, image: "/sim7.png", url: "https://www.businessex.com/" },
    { id: 8, image: "/sim8.png", url: "https://www.bradfordlicenseindia.com/" },
    { id: 9, image: "/sim9.png", url:  "https://www.francorp.in/" },
    { id: 10, image: "/sim10.png", url: "https://www.franglobal.com/" },
    { id: 11, image: "/sim11.png", url:"https://www.gauravmarya.com/"},
    { id: 12, image: "/sim12.png", url: "https://www.msme.in/" },
  ];

  // Add error handling for user data
  const getUserName = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      return `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "User";
    } catch (error) {
      console.error("Error parsing user data:", error);
      return "User";
    }
  };

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
    console.log("Dashboard component mounted");
    const token = localStorage.getItem("token");
    console.log("Token:", token ? "present" : "not present");
    if (!token) {
      console.log("No token, redirecting to login");
      navigate("/login");
      return;
    }
    fetchBrands();
  }, [navigate]);

  // Auto-slide advertisement every 5 seconds
  useEffect(() => {
    const advTimer = setInterval(() => {
      setCurrentAdvSlide((prev) => (prev + 1) % advSlides.length);
    }, 5000);
    return () => clearInterval(advTimer);
  }, []);

  const fetchBrands = async () => {
    try {
      console.log("Fetching brands...");
      setLoading(true);
      const response = await brandAPI.getAllBrands();
      console.log("Brands response:", response.data);
      setBrands(response.data.brands);
      setFilteredBrands(response.data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
      console.log("Loading set to false");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      setFilteredBrands(brands);
      return;
    }

    try {
      const response = await brandAPI.searchBrands({ keyword: searchKeyword });
      setFilteredBrands(response.data.brands);
    } catch (error) {
      console.error("Error searching brands:", error);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredBrands(brands);
      return;
    }

    try {
      const response = await brandAPI.searchBrands({ category });
      setFilteredBrands(response.data.brands);
    } catch (error) {
      console.error("Error filtering by category:", error);
    }
  };

  const handleFavorite = async (brandId) => {
    try {
      await favoriteAPI.addFavorite(brandId);
      alert("Brand added to favorites!");
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert(error.response?.data?.message || "Failed to add to favorites");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAdvSlide = (direction) => {
    if (direction === "next") {
      setCurrentAdvSlide((prev) => (prev + 1) % advSlides.length);
    } else {
      setCurrentAdvSlide((prev) => (prev - 1 + advSlides.length) % advSlides.length);
    }
  };

  const handleAdvClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="dashboard-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="FranchiseConnect Logo" className="nav-logo" onClick={() => navigate("/")} title="Go to Home" />
          <h2>FranchiseConnect</h2>
        </div>
        <div className="nav-center">
          <form onSubmit={handleSearch} className="search-bar">
            
              <input
                type="text"
                placeholder="Search brands..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="search-input-top"
              />
              <button type="submit" className="search-btn">
                <img src="/search.png" alt="Search" className="search-icon" />
              </button>
           
          </form>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate("/favorites")} className="nav-btn nav-btn-primary">
            ❤️ Favorites
          </button>
          <button onClick={() => navigate("/upload-brand")} className="nav-btn nav-btn-primary">
            + Upload Brand
          </button>
          <button onClick={() => navigate("/profile")} className="nav-btn nav-btn-primary">
            👤 Profile
          </button>
          <button onClick={handleLogout} className="nav-btn nav-btn-logout" style={{background:"tomato"}}>
            Logout
          </button>
        </div>
      </nav>
      

      {/* WELCOME */}
      <div className="welcome-section">
        <h2>Welcome, {getUserName()}!</h2>
        <p>Browse and explore amazing franchise opportunities</p>
      </div>

      {/* CATEGORIES FILTER */}
      <div className="categories-section">
        <h3>Filter by Category</h3>
        <div className="categories-buttons">
          <button
            className={!selectedCategory ? "category-btn active" : "category-btn"}
            onClick={() => handleCategoryFilter("")}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? "category-btn active" : "category-btn"}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ADVERTISEMENT CAROUSEL */}
      <div className="advertisement-section">
        <div className="carousel">
          <div className="carousel-container">
            <img
              src={advSlides[currentAdvSlide].image}
              alt="Advertisement"
              className="carousel-image"
              onClick={() => handleAdvClick(advSlides[currentAdvSlide].url)}
            />
          </div>
          <button className="carousel-btn carousel-btn-left" onClick={() => handleAdvSlide("prev")}>❮</button>
          <button className="carousel-btn carousel-btn-right" onClick={() => handleAdvSlide("next")}>❯</button>
          <div className="carousel-dots">
            {advSlides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentAdvSlide ? "active" : ""}`}
                onClick={() => setCurrentAdvSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* BRANDS GRID */}
      <div className="brands-container">
        {loading ? (
          <p className="loading">Loading brands...</p>
        ) : filteredBrands.length === 0 ? (
          <p className="no-brands">No brands found</p>
        ) : (
          <div className="brands-grid">
            {filteredBrands.map((brand) => (
              <div key={brand._id} className="brand-card">
                {brand.logo && (
                  <img src={brand.logo} alt={brand.brandName} className="brand-logo" />
                )}
                <h3>{brand.brandName}</h3>
                <p className="category"><strong>{brand.category}</strong></p>
                <p><strong>Investment:</strong> ₹{brand.investmentRange.min.toLocaleString()} - ₹{brand.investmentRange.max.toLocaleString()}</p>
                <p className="brand-desc">{brand.aboutBrand.substring(0, 100)}...</p>
                <div className="brand-actions">
                  <button
                    className="btn-primary"
                    onClick={() => navigate(`/brand/${brand._id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleFavorite(brand._id)}
                  >
                    ❤️ Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SIMILAR WEBSITES SECTION */}
      <div className="similar-websites-section">
        <h2>Explore Similar Websites</h2>
        <div className="similar-grid">
          {similarSites.map((site) => (
            <div key={site.id} className="similar-item">
              <img
                src={site.image}
                alt={`Similar Site ${site.id}`}
                className="similar-image"
                onClick={() => window.open(site.url, "_blank")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <h3>Contact Us</h3>

        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abbaskhan.cs25@bmsce.ac.in`, "_blank")}>abbaskhan.cs25@bmsce.ac.in</a></p>
        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.cs25@bmsce.ac.in`, "_blank")}>abhishek.cs25@bmsce.ac.in</a></p>
        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abhinaya.ec24@bmsce.ac.in`, "_blank")}>abhinaya.ec24@bmsce.ac.in</a></p>
        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abhinayaks.cs25@bmsce.ac.in`, "_blank")}>abhinayaks.cs25@bmsce.ac.in</a></p>
        <br />
        <p>© 2025 FranchiseConnect. All Rights Reserved.</p>
      </footer>

    </div>
  )
};

export default Dashboard;
