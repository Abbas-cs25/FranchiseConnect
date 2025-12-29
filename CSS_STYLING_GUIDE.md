# FranchiseConnect - CSS Styling Guide

This guide will help you create the CSS files for a complete, professional-looking application.

## File Structure

Create these CSS files in the `frontend/src/` directory:

```
frontend/src/
├── App.css                 # Global styles
├── index.css              # Base styles (already exists)
├── Dashboard.css          # Dashboard page
├── pages/
│   ├── Home.css
│   ├── Login.css
│   ├── Registration.css
│   ├── ForgotPassword.css
│   ├── Profile.css
│   ├── UploadBrand.css
│   ├── BrandDetail.css
│   └── Favorites.css
└── components/
    ├── Navbar.css
    ├── Card.css
    └── Footer.css
```

---

## Global Styles (App.css)

```css
/* App.css - Global Application Styles */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --success-color: #16a34a;
  --danger-color: #dc2626;
  --warning-color: #f59e0b;
  --info-color: #0891b2;
  
  --light-bg: #f8fafc;
  --white: #ffffff;
  --dark-text: #1e293b;
  --light-text: #64748b;
  --border-color: #e2e8f0;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Font Sizes */
  --font-xs: 12px;
  --font-sm: 14px;
  --font-base: 16px;
  --font-lg: 18px;
  --font-xl: 20px;
  --font-2xl: 24px;
  --font-3xl: 32px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--light-bg);
  color: var(--dark-text);
  font-size: var(--font-base);
  line-height: 1.6;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

h1 { font-size: var(--font-3xl); }
h2 { font-size: var(--font-2xl); }
h3 { font-size: var(--font-xl); }
h4 { font-size: var(--font-lg); }
h5 { font-size: var(--font-base); }
h6 { font-size: var(--font-sm); }

p {
  margin-bottom: var(--spacing-md);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--secondary-color);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Buttons */
.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

.btn-secondary {
  background-color: var(--light-bg);
  color: var(--dark-text);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-success {
  background-color: var(--success-color);
  color: var(--white);
}

.btn-danger {
  background-color: var(--danger-color);
  color: var(--white);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-sm);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-lg);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Forms */
.form-group {
  margin-bottom: var(--spacing-lg);
}

label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--dark-text);
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="number"],
input[type="tel"],
select,
textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-base);
  font-family: inherit;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
input[type="tel"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

/* Cards */
.card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-header {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--border-color);
}

.card-body {
  margin-bottom: var(--spacing-md);
}

.card-footer {
  padding-top: var(--spacing-md);
  border-top: 2px solid var(--border-color);
}

/* Grid */
.grid {
  display: grid;
  gap: var(--spacing-lg);
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }

.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }
.mt-4 { margin-top: var(--spacing-xl); }

.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }
.mb-4 { margin-bottom: var(--spacing-xl); }

.p-1 { padding: var(--spacing-sm); }
.p-2 { padding: var(--spacing-md); }
.p-3 { padding: var(--spacing-lg); }
.p-4 { padding: var(--spacing-xl); }

.hidden { display: none; }
.visible { display: block; }

.text-muted { color: var(--light-text); }
.text-success { color: var(--success-color); }
.text-danger { color: var(--danger-color); }
.text-info { color: var(--info-color); }

.bg-light { background-color: var(--light-bg); }
.bg-white { background-color: var(--white); }

/* Alerts */
.alert {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.alert-success {
  background-color: #dcfce7;
  color: #166534;
  border-left: 4px solid var(--success-color);
}

.alert-danger {
  background-color: #fee2e2;
  color: #991b1b;
  border-left: 4px solid var(--danger-color);
}

.alert-warning {
  background-color: #fef3c7;
  color: #92400e;
  border-left: 4px solid var(--warning-color);
}

.alert-info {
  background-color: #cffafe;
  color: #164e63;
  border-left: 4px solid var(--info-color);
}

/* Loading Spinner */
.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  
  h1 { font-size: var(--font-2xl); }
  h2 { font-size: var(--font-xl); }
}

@media (max-width: 480px) {
  .container {
    padding: 0 var(--spacing-sm);
  }
  
  .btn {
    width: 100%;
  }
  
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## Dashboard & Navbar Styles (Dashboard.css)

```css
/* Dashboard.css - Dashboard Page & Navigation Styles */

/* Navigation Bar */
.navbar {
  background-color: var(--white);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-md) 0;
  margin-bottom: var(--spacing-xl);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-size: var(--font-2xl);
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  list-style: none;
}

.navbar-link {
  color: var(--dark-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}

.navbar-link:hover {
  color: var(--primary-color);
  background-color: var(--light-bg);
}

.navbar-btn {
  background-color: var(--primary-color);
  color: var(--white);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.navbar-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

/* Dashboard Page */
.dashboard {
  padding: var(--spacing-xl) 0;
}

.welcome-section {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.welcome-section h1 {
  color: var(--white);
  margin-bottom: var(--spacing-md);
}

.welcome-section p {
  font-size: var(--font-lg);
  opacity: 0.9;
}

/* Search Bar */
.search-bar {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-base);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Filters */
.filters {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  background-color: var(--white);
  color: var(--dark-text);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
}

/* Brand Card */
.brand-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.brand-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.brand-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: var(--light-bg);
}

.brand-content {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: var(--font-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--dark-text);
}

.brand-category {
  color: var(--light-text);
  font-size: var(--font-sm);
  margin-bottom: var(--spacing-sm);
}

.brand-investment {
  color: var(--success-color);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-sm);
}

.brand-about {
  color: var(--light-text);
  font-size: var(--font-sm);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.brand-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: auto;
}

.brand-actions button {
  flex: 1;
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
}

.brand-actions .btn-primary {
  background-color: var(--primary-color);
  color: var(--white);
  flex: 2;
}

.brand-actions .btn-favorite {
  background-color: var(--light-bg);
  border: 2px solid var(--border-color);
  color: var(--dark-text);
}

.brand-actions .btn-favorite.active {
  background-color: var(--danger-color);
  color: var(--white);
  border-color: var(--danger-color);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--light-text);
}

.empty-state svg {
  width: 100px;
  height: 100px;
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }
  
  .navbar-menu {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .search-bar {
    flex-direction: column;
  }
  
  .search-input {
    min-width: 100%;
  }
}
```

---

## Login & Registration Styles (Login.css & Registration.css)

```css
/* Login.css & Registration.css - Authentication Pages */

.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: var(--spacing-xl);
}

.auth-box {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-2xl);
  max-width: 500px;
  width: 100%;
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.auth-header h1 {
  font-size: var(--font-2xl);
  color: var(--dark-text);
  margin-bottom: var(--spacing-md);
}

.auth-header p {
  color: var(--light-text);
  font-size: var(--font-sm);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--dark-text);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-base);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.password-toggle {
  position: relative;
}

.password-toggle button {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--light-text);
  padding: var(--spacing-sm);
}

.form-error {
  color: var(--danger-color);
  font-size: var(--font-sm);
  margin-top: var(--spacing-xs);
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: var(--spacing-lg);
}

.submit-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.auth-footer {
  text-align: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--border-color);
}

.auth-footer p {
  color: var(--light-text);
  margin: 0;
}

.auth-footer a {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* User Type Selection */
.user-type-selector {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.type-option {
  flex: 1;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-option:hover {
  border-color: var(--primary-color);
  background-color: var(--light-bg);
}

.type-option.selected {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
}

.type-option input[type="radio"] {
  display: none;
}

/* Photo Upload */
.photo-upload {
  margin-bottom: var(--spacing-lg);
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: var(--primary-color);
  background-color: var(--light-bg);
}

.upload-area.drag-active {
  border-color: var(--primary-color);
  background-color: rgba(37, 99, 235, 0.05);
}

.upload-input {
  display: none;
}

.photo-preview {
  margin-top: var(--spacing-md);
  display: flex;
  justify-content: center;
}

.photo-preview img {
  max-width: 150px;
  max-height: 150px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

/* Responsive */
@media (max-width: 480px) {
  .auth-box {
    padding: var(--spacing-lg);
  }
  
  .auth-header h1 {
    font-size: var(--font-xl);
  }
}
```

---

## Profile & Brand Upload Styles (Profile.css & UploadBrand.css)

```css
/* Profile.css - User Profile Page */

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
  flex-shrink: 0;
}

.profile-info h1 {
  font-size: var(--font-2xl);
  margin-bottom: var(--spacing-sm);
}

.profile-type {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: var(--radius-full);
  font-size: var(--font-sm);
  font-weight: 500;
}

.profile-details {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.detail-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.detail-item {
  padding: var(--spacing-md);
  background-color: var(--light-bg);
  border-radius: var(--radius-md);
}

.detail-item strong {
  display: block;
  color: var(--light-text);
  font-size: var(--font-sm);
  margin-bottom: var(--spacing-xs);
}

.detail-item span {
  color: var(--dark-text);
  font-size: var(--font-base);
  font-weight: 500;
}

.edit-mode {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.edit-mode .form-group {
  margin-bottom: var(--spacing-lg);
}

.my-brands {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.my-brands h2 {
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-xl);
}

.brand-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.brand-item {
  padding: var(--spacing-md);
  background-color: var(--light-bg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
}

.brand-item h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--dark-text);
}

.brand-item p {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--light-text);
  font-size: var(--font-sm);
}

.brand-item-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.brand-item-actions button {
  flex: 1;
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-sm);
  font-weight: 500;
}

/* UploadBrand.css - Brand Upload Page */

.upload-container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.upload-form {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
}

.form-section {
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 2px solid var(--border-color);
}

.form-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.form-section h2 {
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-xl);
  color: var(--dark-text);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.form-row.full {
  grid-template-columns: 1fr;
}

.investment-range {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

/* File Upload Preview */
.file-upload-group {
  margin-bottom: var(--spacing-lg);
}

.file-upload-label {
  display: block;
  margin-bottom: var(--spacing-md);
  font-weight: 500;
  color: var(--dark-text);
}

.file-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.file-input {
  display: none;
}

.file-upload-btn {
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.file-upload-btn:hover {
  background-color: var(--secondary-color);
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.preview-item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.preview-item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.preview-remove {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  background-color: var(--danger-color);
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: var(--font-base);
  font-weight: 600;
  transition: all 0.3s ease;
}

.preview-remove:hover {
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .detail-row {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .investment-range {
    grid-template-columns: 1fr;
  }
}
```

---

## Brand Detail & Favorites Styles (BrandDetail.css & Favorites.css)

```css
/* BrandDetail.css - Brand Detail Page */

.brand-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.brand-detail-main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.brand-detail-content {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
}

.brand-gallery {
  margin-bottom: var(--spacing-xl);
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-md);
}

.thumbnail-gallery {
  display: flex;
  gap: var(--spacing-md);
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-md);
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: var(--primary-color);
}

.brand-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
}

.info-item {
  padding: var(--spacing-md);
  background-color: var(--light-bg);
  border-radius: var(--radius-md);
}

.info-label {
  color: var(--light-text);
  font-size: var(--font-sm);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.info-value {
  color: var(--dark-text);
  font-size: var(--font-base);
  font-weight: 600;
}

.brand-description {
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-md);
  background-color: var(--light-bg);
  border-radius: var(--radius-md);
  line-height: 1.6;
  color: var(--dark-text);
}

.owner-card {
  background: var(--light-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.owner-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.owner-name {
  font-weight: 600;
  color: var(--dark-text);
  margin-bottom: var(--spacing-xs);
}

.owner-contact {
  font-size: var(--font-sm);
  color: var(--light-text);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--dark-text);
  font-size: var(--font-sm);
}

/* Interest Form */
.interest-form {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
}

.interest-form h3 {
  margin-bottom: var(--spacing-lg);
}

.interest-form .form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.form-group-row .form-group {
  margin-bottom: 0;
}

/* Favorites.css - Favorites Page */

.favorites-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.favorites-header {
  margin-bottom: var(--spacing-xl);
}

.favorites-header h1 {
  font-size: var(--font-2xl);
  margin-bottom: var(--spacing-md);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.favorite-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.favorite-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.favorite-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: var(--light-bg);
}

.favorite-content {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.favorite-name {
  font-size: var(--font-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.favorite-category {
  color: var(--light-text);
  font-size: var(--font-sm);
  margin-bottom: var(--spacing-md);
}

.favorite-investment {
  color: var(--success-color);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.favorite-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: auto;
}

.favorite-actions button {
  flex: 1;
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: var(--font-sm);
}

.empty-favorites {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--light-text);
}

.empty-favorites h2 {
  margin-bottom: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .brand-detail-main {
    grid-template-columns: 1fr;
  }
  
  .brand-info {
    grid-template-columns: 1fr;
  }
  
  .form-group-row {
    grid-template-columns: 1fr;
  }
  
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
```

---

## How to Use These Styles

1. **Copy the global styles** (App.css section) into `frontend/src/App.css`
2. **Copy Dashboard styles** into `frontend/src/Dashboard.css`
3. **Copy Login/Registration styles** into their respective component CSS files
4. **Copy other page styles** into their respective component CSS files

### Importing in Components

```javascript
// In your component files, add:
import './Dashboard.css';
import './Profile.css';
// etc.
```

Or import globally in `App.jsx`:

```javascript
import './App.css';
import './Dashboard.css';
import './Login.css';
import './Registration.css';
import './ForgotPassword.css';
import './Profile.css';
import './UploadBrand.css';
import './BrandDetail.css';
import './Favorites.css';
```

---

## Color Customization

To change the color scheme, modify the CSS variables in `App.css`:

```css
:root {
  --primary-color: #2563eb;  /* Change this */
  --secondary-color: #1e40af;  /* And this */
  /* ... rest of colors ... */
}
```

Common color options:
- Blue: `#2563eb`
- Purple: `#7c3aed`
- Green: `#16a34a`
- Red: `#dc2626`
- Orange: `#ea580c`

---

## Dark Mode (Optional Enhancement)

Add to your CSS for dark mode support:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --light-bg: #1e293b;
    --white: #0f172a;
    --dark-text: #f1f5f9;
    --light-text: #cbd5e1;
  }
}
```

---

That's it! Your FranchiseConnect application should now look professional and polished.

Happy coding! 🚀
