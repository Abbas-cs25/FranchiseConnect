import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" className="nav-logo" alt="logo"/>
          <h2>FranchiseConnect</h2>
        </div>

        <div className="nav-right">
          <a href="#about">About Us</a>
          <a href="#focus">Focus Areas & Skills</a>
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-left">
          <h1>Connecting Brands and Investors in Real Time</h1>
          <p>
            FranchiseConnect is a platform designed to bridge the gap between franchisors 
            and investors. Discover opportunities, explore brands, and grow your business 
            with ease.
          </p>

          <button
            className="get-started-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <div className="slider">
            <img src="/dev1.png" alt="dev1" />
            <img src="/dev2.png" alt="dev2" />
            <img src="/dev3.png" alt="dev3" />
            <img src="/dev4.png" alt="dev4" />
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="services">
        <h2>Our Services</h2>

        <div className="services-grid">
          <div className="service-card">
            <i className="fa fa-users service-icon"></i>
            <h4>Investor Support</h4>
            <p>Helping investors find the best franchise opportunities.</p>
          </div>

          <div className="service-card">
            <i className="fa fa-building service-icon"></i>
            <h4>Brand Listing</h4>
            <p>Franchisors can add, edit, and manage franchise listings.</p>
          </div>

          <div className="service-card">
            <i className="fa fa-comments service-icon"></i>
            <h4>Real-time Chat</h4>
            <p>Instant messaging between brand owners and investors.</p>
          </div>

          <div className="service-card">
            <i className="fa fa-chart-line service-icon"></i>
            <h4>Analytics</h4>
            <p>Insights into growth, performance, and reach.</p>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className="about-section">
        <h2>About FranchiseConnect</h2>
        <p>
          FranchiseConnect provides a modern, secure, and scalable platform for both 
          investors and franchisors. Explore brand categories, chat in real-time, and 
          grow your business with confidence.
        </p>
      </section>

      {/* ---------------- HOVER CARDS ---------------- */}
      <section className="cards-section">
        <div className="card">
          <div className="card-inner">
          <div className="card-front">Brand</div>
          <div className="card-back">Explore top franchise brands!</div>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
          <div className="card-front">Investment</div>
          <div className="card-back">Find your best investment path.</div>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
          <div className="card-front">Support</div>
          <div className="card-back">We guide you at every step.</div>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
          <div className="card-front">Growth</div>
          <div className="card-back">Scale your business quickly.</div>
          </div>
        </div>
      </section>

      {/* ---------------- FULL WIDTH IMAGE ---------------- */}
      <div className="full-width-banner">
        <img src="/banner.png" alt="banner" />
      </div>

      {/* ---------------- FOCUS AREA ---------------- */}
      <section id="focus" className="focus-area">
        <h2>Our Focus Areas & Skills</h2>
        <p>
          We help users explore brands, track performance, build connections, and 
          gain confidence in making franchise decisions.
        </p>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="stats">
        <div className="stat-box">
          <h3>215</h3>
          <p>Brands</p>
        </div>

        

        <div className="stat-box">
          <h3>12,908</h3>
          <p>Users</p>
        </div>
      </section>

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
  );
};

export default Home;
