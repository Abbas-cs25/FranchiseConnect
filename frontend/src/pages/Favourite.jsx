import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { favoriteAPI } from "../services/api";
import "./Favourite.css";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await favoriteAPI.getFavorites();
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (brandId) => {
    try {
      await favoriteAPI.removeFavorite(brandId);
      setFavorites(favorites.filter(b => b._id !== brandId));
      alert("Brand removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="favorites-page">
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" alt="FranchiseConnect Logo" className="nav-logo" onClick={() => navigate("/")} title="Go to Home" />
          <h2>FranchiseConnect - Favourite</h2>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate("/dashboard")} className="nav-btn nav-btn-primary">Dashboard</button>
          <button onClick={() => navigate("/profile")} className="nav-btn nav-btn-primary">Profile</button>
          <button onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }} className="nav-btn nav-btn-logout">Logout</button>
        </div>
      </nav>

      <div className="favorites-container">
        {loading ? (
          <p>Loading favorites...</p>
        ) : favorites.length === 0 ? (
          <div className="empty-state">
            <p>No favorite brands yet</p>
            <button onClick={() => navigate("/dashboard")} className="btn-primary">Browse Brands</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(brand => (
              <div key={brand._id} className="favorite-card">
                {brand.logo && (
                  <img src={brand.logo} alt={brand.brandName} className="fav-logo" />
                )}
                <h3>{brand.brandName}</h3>
                <p><strong>Category:</strong> {brand.category}</p>
                <p><strong>Investment:</strong> ₹{brand.investmentRange.min} - ₹{brand.investmentRange.max}</p>
                <p className="about">{brand.aboutBrand.substring(0, 80)}...</p>
                <div className="fav-actions">
                  <button onClick={() => navigate(`/brand/${brand._id}`)} className="btn-primary">
                    View Details
                  </button>
                  <button onClick={() => handleRemoveFavorite(brand._id)} className="btn-danger">
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
