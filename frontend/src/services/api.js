import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // If sending FormData, delete Content-Type to let axios set it with boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

// AUTH ENDPOINTS
export const authAPI = {
  register: (data) => {
    // If data is already FormData, use it directly without explicit Content-Type
    if (data instanceof FormData) {
      return apiClient.post("/auth/register", data);
    }
    // Otherwise, create FormData from object
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "profilePhoto" && data[key]) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    return apiClient.post("/auth/register", formData);
  },
  login: (email, password) => apiClient.post("/auth/login", { email, password }),
  verifyForgotPassword: (data) => apiClient.post("/auth/forgot-password/verify", data),
  resetPassword: (resetToken, newPassword, confirmPassword) =>
    apiClient.post("/auth/reset-password", { resetToken, newPassword, confirmPassword }),
};

// USER ENDPOINTS
export const userAPI = {
  getProfile: () => apiClient.get("/users/profile"),
  updateProfile: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "profilePhoto" && data[key]) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    return apiClient.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getUserBrands: () => apiClient.get("/users/brands"),
  getProfilePhoto: (userId) => apiClient.get(`/users/profile-photo/${userId}`),
};

// BRAND ENDPOINTS
export const brandAPI = {
  getAllBrands: () => apiClient.get("/brands"),
  searchBrands: (params) => apiClient.get("/brands/search", { params }),
  getBrandById: (id) => apiClient.get(`/brands/${id}`),
  createBrand: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "photos" && Array.isArray(data[key])) {
        data[key].forEach((photo) => {
          formData.append("photos", photo);
        });
      } else if (key === "logo" && data[key]) {
        formData.append("logo", data[key]);
      } else if (key === "investmentRange" && typeof data[key] === "object") {
        // Properly append nested investmentRange object
        formData.append("investmentRange[min]", data[key].min);
        formData.append("investmentRange[max]", data[key].max);
      } else if (key !== "photos") {
        formData.append(key, data[key]);
      }
    });
    return apiClient.post("/brands", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateBrand: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "photos" && Array.isArray(data[key])) {
        data[key].forEach((photo) => {
          if (photo instanceof File) {
            formData.append("photos", photo);
          }
        });
      } else if (key === "logo" && data[key]) {
        if (data[key] instanceof File) {
          formData.append("logo", data[key]);
        }
      } else if (key === "investmentRange" && typeof data[key] === "object") {
        // Properly append nested investmentRange object
        formData.append("investmentRange[min]", data[key].min);
        formData.append("investmentRange[max]", data[key].max);
      } else if (key !== "photos") {
        formData.append(key, data[key]);
      }
    });
    return apiClient.put(`/brands/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteBrand: (id) => apiClient.delete(`/brands/${id}`),
};

// FAVORITE ENDPOINTS
export const favoriteAPI = {
  addFavorite: (brandId) => apiClient.post("/favorites", { brandId }),
  getFavorites: () => apiClient.get("/favorites"),
  removeFavorite: (brandId) => apiClient.delete(`/favorites/${brandId}`),
  isFavorited: (brandId) => apiClient.get(`/favorites/${brandId}/check`),
};

// INTEREST ENDPOINTS
export const interestAPI = {
  createInterestRequest: (data) => apiClient.post("/interests", data),
  getBrandInterests: (brandId) => apiClient.get(`/interests/brand/${brandId}`),
  updateInterestStatus: (interestId, status) => apiClient.put(`/interests/${interestId}/status`, { status }),
};

export default apiClient;
