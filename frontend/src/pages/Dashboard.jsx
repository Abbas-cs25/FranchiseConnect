// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

/*
  Dashboard.jsx
  - Implements Layouts 1..7 exactly as you described.
  - All CSS is scoped under .dashboard-page to avoid leaking styles.
  - Replace images in /public/assets/... as noted below.
  - Favorites are stored in localStorage key: 'fc_favorites'
*/

/* ---------- Sample data (replace with real assets) ---------- */
const CATEGORY_LIST = [
  { id: "food", title: "Food & Beverages", icon: "food.png" },
  { id: "retail", title: "Retail & Fashion", icon: "retail.png", width: "100" ,height:"60"},
  { id: "health", title: "Health & Wellness", icon: "health.png" },
  { id: "education", title: "Education & Training", icon: "education.png" },
  { id: "beauty", title: "Beauty & Salon", icon: "beauty.png" },
  { id: "auto", title: "Automobiles & Bikes", icon: "auto.png" },
  { id: "electronics", title: "Electronics & Gadgets", icon: "electronic.png" },
  { id: "realestate", title: "Real Estate Services", icon: "realestate.png" },
  { id: "home", title: "Home Services & Maintenance", icon: "homeser.png" },
  { id: "entertainment", title: "Entertainment & Gaming", icon: "entertainment.png" },
];

// subcategories mapping (only titles shown)
const SUBCATS = {
  food: [
    "Quick Service Restaurants (QSR)",
    "Cafes & Coffee Shops",
    "Ice Cream & Dessert Parlors",
    "Juice & Shake Bars",
    "Bakery & Confectionery",
    "Cloud Kitchen / Dark Kitchen",
    "Casual Dining Restaurants",
    "Food Trucks / Mobile Food",
    "Organic & Healthy Food Brands",
    "Tea & Beverage Outlets",
  ],
  retail: [
    "Clothing & Apparel Stores",
    "Footwear Brands",
    "Bags & Accessories",
    "Jewellery Stores",
    "Optical & Eyewear Shops",
    "Children’s Fashion",
    "Uniform & Corporate Wear",
    "Thrift / Pre-Owned Stores",
    "Multi-Brand Outlets",
    "Luxury & Designer Stores",
  ],
  health: [
    "Gym & Fitness Centers",
    "Yoga & Meditation Studios",
    "Ayurvedic Centers",
    "Spa & Massage Clinics",
    "Diagnostics & Labs",
    "Pharmacy & Medical Stores",
    "Organic Products Stores",
    "Health Supplements Shops",
    "Physiotherapy Centers",
    "Slimming & Diet Clinics",
  ],
  education: [
    "Pre-Schools",
    "K-12 Coaching Centers",
    "Competitive Exam Coaching",
    "Skill Development Institutes",
    "Vocational Training",
    "IT & Software Training",
    "Language Training",
    "Abacus & Brain Development",
    "Tuition & Home Learning Services",
    "Overseas Education Consultants",
  ],
  beauty: [
    "Unisex Salons",
    "Men’s Grooming / Barber Shops",
    "Women’s Beauty Services",
    "Nail Art & Nail Studios",
    "Makeup & Beauty Academies",
    "Spa & Wellness Studios",
    "Skin & Dermatology Clinics",
    "Cosmetic Products Stores",
    "Tattoo & Piercing Studios",
    "Hair Treatment Clinics",
  ],
  auto: [
    "Car Showrooms",
    "Bike Dealerships",
    "EV (Electric Vehicle) Dealers",
    "Car Spa / Car Wash",
    "Bike & Scooter Rentals",
    "Auto Accessories Stores",
    "Spare Parts & Service Centers",
    "Battery & EV Charging Stations",
    "Bike Repair Chains",
    "Used Vehicle Dealerships",
  ],
  electronics: [
    "Mobile Showrooms",
    "Laptop & Computer Stores",
    "Smart Home Devices",
    "Home Appliances",
    "CCTV & Security Systems",
    "Repair & Service Centers",
    "Gaming & Console Stores",
    "Accessories & Gadget Shops",
    "Multi-Brand Electronics Stores",
    "LED Panels & Display Stores",
  ],
  realestate: [
    "Property Consultancy",
    "Rental Solutions",
    "Real-Estate Aggregator Platforms",
    "Builders & Developers",
    "Co-living / Co-working Spaces",
    "Interior & Furniture Studios",
    "Property Management Services",
    "Land Investment Firms",
    "Home Loan & Finance Consultants",
    "Commercial Space Leasing",
  ],
  home: [
    "Cleaning & Deep Cleaning Services",
    "Plumbing & Electrical",
    "AC & Appliance Repair",
    "Pest Control",
    "Painting & Renovation",
    "Home Tutors",
    "Packers & Movers",
    "Beauty Services at Home",
    "Laundry & Dry Cleaning",
    "Handyman / On-Demand Services",
  ],
  entertainment: [
    "Gaming Zones",
    "VR/AR Experience Centers",
    "Kids Play Areas",
    "Indoor Sports Centers",
    "Outdoor Adventure Parks",
    "Cinemas & Mini Theatres",
    "Event Management Services",
    "Dance & Music Studios",
    "Hobby & Art Classes",
    "E-Sports / Gaming Cafes",
  ],
};

// sample ad images (replace in /public/assets/ads/)
const ADS = [
  "ad1.png",
  "ad2.png",
  "ad3.jpg",
  "ad4.png",
  "ad5.jpg",
];

// ad URLs for each ad
const adUrls = [
  "https://startuptalky.com/starting-dominos-franchise-in-india/",
  "https://www.uclean.in/apply-for-franchise",
  "https://franchise.tealogy.in/?gad_source=1&gad_campaignid=21918396141&gbraid=0AAAAAo5HxPza7Yph0oKAVt8D6Hgui7UcR&gclid=CjwKCAiA3fnJBhAgEiwAyqmY5V2TiqYgbp00wpcFVBGv_MStDbghJvp6IPOqLYf2TKUTyrl1FmCZQxoCjC4QAvD_BwE",
  "https://www.burgerking.com",
  "https://www.franchisemart.in/retail-franchise/vishal-mega-mart-franchise/"
];

// generate 30 sample brand cards (replace images in /public/assets/brands/)
const generateBrands = () => {
  const brands = [];
  for (let i = 1; i <= 30; i += 1) {
    const cat = CATEGORY_LIST[(i - 1) % CATEGORY_LIST.length];
    brands.push({
      id: `brand-${i}`,
      title: `Brand ${i}`,
      categoryId: cat.id,
      categoryName: cat.title,
      image: "b${(i % 6) + 1}.png", // replace b1.jpg..b6.jpg in public/assets/brands
      investment: `${5 + (i % 10)} - ${10 + (i % 10)} Lacs`,
      area: `${100 + i} sq.ft`,
      outlets: `${(i % 50) + 1}`,
    });
  }
  return brands;
};

/* ---------- Utility ---------- */
const loadFavorites = () => {
  try {
    const raw = localStorage.getItem("fc_favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const saveFavorites = (arr) => localStorage.setItem("fc_favorites", JSON.stringify(arr));

/* ---------- TopStrip component (Layout 1) ---------- */
function TopStrip({ onSearch }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  // NOTE: Logo path -> public/assets/logo.png (replace as needed)
  const logoPath = "/assets/logo.png";

  const submitSearch = (e) => {
    e.preventDefault();
    // call parent search handler
    onSearch(q);
  };

  return (
    <div className="dashboard-page">
      <div className="navbar">
        <div className="nav-left" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="logo" className="nav-logo" />
          <h2>FranchiseConnect</h2>
        </div>
        
        <form className="nav-center" onSubmit={submitSearch} role="search" aria-label="Search brands">
          <div className="search-wrap">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search brands, categories, locations..."
              className="search-input-top"
              aria-label="Search"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <img src="/search.png" alt="Search" width="20" height="20" />
            </button>
          </div>
        </form>
      

        <div className="nav-right">
          <a role="button" title="Favorites" onClick={() => navigate("/favourite.jsx")}>
            <img src="/favourite.png" alt="favourite" width="40" height="40" />
          </a>
          <a role="button" title="Upload" onClick={() => navigate("/uploadbrand.jsx")}>
              <img src="/upload.png" alt="favourite" width="100" height="40" />
          </a>
          <a role="button" title="Profile" onClick={() => navigate("/profile.jsx")}>
            <img src="\dev1.png" alt="profile" className="profile-pic" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Categories Row (Layout 2) ---------- */
function CategoriesRow({ onSelectSubcategory }) {
  const [order, setOrder] = useState(CATEGORY_LIST); // circular order
  const [activeCategory, setActiveCategory] = useState(null);
  const panelRef = useRef();

  // slide down animation (max-height)
  useEffect(() => {
    if (!panelRef.current) return;
    if (activeCategory) {
      panelRef.current.style.maxHeight = panelRef.current.scrollHeight + "px";
    } else {
      panelRef.current.style.maxHeight = "0px";
    }
  }, [activeCategory]);

  const shiftLeft = () => {
    setOrder((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      copy.unshift(last);
      return copy;
    });
  };
  const shiftRight = () => {
    setOrder((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      copy.push(first);
      return copy;
    });
  };

  return (
    <section className="dashboard-page categories-row">
      <div className="cat-controls">
        <button className="cat-arrow" onClick={shiftLeft}>‹</button>
        <div className="cat-list">
          {order.map((c) => (
            <div key={c.id} className="cat-item" onClick={() => setActiveCategory(activeCategory?.id === c.id ? null : c)}>
              <img src={c.icon} alt={c.title} className="cat-img" />
              <div className="cat-title">{c.title}</div>
            </div>
          ))}
        </div>
        <button className="cat-arrow" onClick={shiftRight}>›</button>
      </div>

      <div ref={panelRef} className="cat-subpanel">
        {activeCategory && (
          <div className="cat-subinner">
            <div className="cat-subheader">
              <div className="cat-subinfo">
                <img src={activeCategory.icon} alt={activeCategory.title} className="cat-img-lg" />
                <div>
                  <div className="cat-subtitle">{activeCategory.title}</div>
                </div>
              </div>
              <button className="close-sub" onClick={() => setActiveCategory(null)}>Close</button>
            </div>

            <div className="subgrid">
              {SUBCATS[activeCategory.id]?.map((s, idx) => (
                <button
                  key={idx}
                  className="sub-item"
                  onClick={() => {
                    onSelectSubcategory(activeCategory.id, s);
                    // keep panel open or close as per your preference
                    // setActiveCategory(null);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Ad Slider (Layout 3) ---------- */
function AdSlider({ onAdClick }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef();
  const slides = ADS; // 5 slides
  // autoplay 5 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, slides.length]);

  return (
    <div className="dashboard-page ad-slider">
      {slides.map((src, i) => (
        <div key={i} className={`ad-slide ${i === index ? "active" : ""}`}>
          <img src={src} alt={`ad-${i}`} className="ad-img" onClick={() => onAdClick && onAdClick(i)} style={{cursor: 'pointer'}} />
        </div>
      ))}
      <button className="ad-prev" onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}>‹</button>
      <button className="ad-next" onClick={() => setIndex((i) => (i + 1) % slides.length)}>›</button>
    </div>
  );
}

/* ---------- Brands Grid (Layout 4) ---------- */
function BrandsGrid({ brands }) {
  // favorites from localStorage
  const [favorites, setFavorites] = useState(loadFavorites());
  const [visibleCount, setVisibleCount] = useState(20); // default 20 cards

  useEffect(() => saveFavorites(favorites), [favorites]);

  const toggleFav = (brand) => {
    const exists = favorites.find((f) => f.id === brand.id);
    if (exists) {
      const next = favorites.filter((f) => f.id !== brand.id);
      setFavorites(next);
    } else {
      setFavorites([...favorites, brand]);
    }
  };

  return (
    <section className="dashboard-page brands-section">
      <div className="brands-grid">
        {brands.slice(0, visibleCount).map((b) => (
          <div className="brand-card" key={b.id}>
            <div className="brand-imgwrap">
              <img src={b.image} alt={b.title} className="brand-image" />
              <button className={`brand-fav ${favorites.some((f) => f.id === b.id) ? "active" : ""}`} onClick={() => toggleFav(b)} title="Add to favorites">
                ❤
              </button>
            </div>
            <div className="brand-body">
              <div className="brand-cat">{b.categoryName}</div>
              <div className="brand-title">{b.title}</div>
              <div className="brand-info">Investment: ₹ {b.investment}</div>
              <div className="brand-info small">Area Required: {b.area}</div>
              <div className="brand-info small">Franchise Outlets: {b.outlets}</div>
              <div className="brand-actions">
                <button className="btn-know" onClick={() => window.location.assign(`/brand/${b.id}`)}>Know more</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="brands-load">
        {visibleCount < brands.length ? (
          <button className="btn-load" onClick={() => setVisibleCount((v) => Math.min(v + 20, brands.length))}>Load more</button>
        ) : (
          <div className="end-text">You have seen all brands</div>
        )}
      </div>
    </section>
  );
}

/* ---------- About FranchiseConnect (Layout 5) ---------- */
function AboutSection() {
  const paragraphs = [
    "FranchiseConnect is India’s leading platform connecting ambitious entrepreneurs with validated franchise opportunities across varied sectors. Our aim is to simplify franchise discovery through curated listings and verified brand profiles. FranchiseConnect is a modern web-based platform created to simplify and strengthen the connection between franchise brands and potential investors. The website serves as a professional digital space where franchisors can present their business opportunities and investors can explore reliable franchise options in one place. By bringing both parties onto a single platform, FranchiseConnect reduces manual communication, increases transparency, and supports faster, more informed decision-making.",
    "We list trusted brands across food, retail, education, healthcare and more — helping investors choose opportunities that match their budget and goals. Each listing includes clear investment details and contact information. The website allows franchise owners to showcase their brands with complete business details, investment requirements, location preferences, and high-quality images. This helps investors clearly understand each opportunity before initiating contact. Investors can browse multiple franchise listings easily and identify options that align with their budget, interests, and long-term business goals, making the discovery process efficient and user-friendly.",
    "Our platform supports franchisors to manage inquiries, upload brand resources, and connect directly with potential investors. We focus on transparency and data-driven insights to help both parties succeed. FranchiseConnect focuses strongly on real-time and direct communication. The platform enables instant chat and email interaction between investors and franchisors, allowing both sides to discuss opportunities without delays. This real-time engagement builds trust, improves responsiveness, and accelerates the overall franchise onboarding process.",
    "FranchiseConnect also offers market insights, industry news, and guides to help new franchisees navigate legal, operational, and financial aspects. We bring resources and experts to your fingertips. Security and reliability are key strengths of the website. FranchiseConnect uses secure authentication methods, including email verification, encrypted passwords, and protected user sessions, ensuring that personal and business data remains safe. Role-based access further ensures that users only see and manage information relevant to their responsibilities, maintaining platform integrity.",
    "Whether you are a first-time investor or an experienced multi-unit operator, FranchiseConnect provides a trusted, modern marketplace to discover, evaluate, and grow franchise businesses across India. The website is designed with a clean, responsive, and modern interface that works smoothly across desktops, tablets, and mobile devices. Features such as intuitive navigation and visually balanced layouts enhance the overall user experience, making the platform easy to use even for first-time users. Cloud-based image handling ensures fast loading and professional presentation of franchise profiles.",
    "Join us today and take the next step in your entrepreneurial journey with confidence and clarity. Overall, FranchiseConnect functions as a complete digital ecosystem for franchise networking. By combining secure technology, real-time communication, and a user-centric design, the website creates a trustworthy environment where brands can expand their reach and investors can confidently explore business opportunities.",

  ];


  return (
    <section className="dashboard-page about-card card">
      <div className="content-center">
        <h3>About Franchise India</h3>
        {paragraphs.map((p, i) => (
          <p key={i} className="about-para">{p}</p>
        ))}
      </div>
    </section>
  );
}

/* ---------- More Similar Sites (Layout 6) ---------- */
function MoreSimilarSites() {
  // 12 placeholder images in /public/assets/similar/
  const imgs = Array.from({ length: 12 }).map((_, i) => `sim${i + 1}.png`);
  const urls = [
    "https://www.entrepreneur.com",
    "https://www.indianretailer.com",
    "https://www.restaurantindia.in/",
    "https://www.franchisenepal.com/",
    "https://www.franchisebangladesh.com/",
    "https://www.indianretailer.com/brandlicense/",
    "https://www.businessex.com/",
    "https://www.bradfordlicenseindia.com/",
    "https://www.francorp.in/",
    "https://www.franglobal.com/",
    "https://www.gauravmarya.com/",
    "https://www.msme.in/"
  ];
  return (
    <section className="dashboard-page similar-sites card">
      <div className="content-center">
        <h3>More Similar Sites</h3>
        <div className="similar-grid">
          {imgs.map((src, i) => (
            <a key={i} href="#" className="similar-item" onClick={(e) => { e.preventDefault(); window.open(urls[i], "_blank"); }}>
              <img src={src} alt={`similar-${i}`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer (Layout 7) ---------- */
function SiteFooter() {
  const emails = ["info@franchiseconnect.com", "support@franchiseconnect.com", "sales@franchiseconnect.com", "ads@franchiseconnect.com"];
  return (
    <footer className="footer">
        <h3>Contact Us</h3>

        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abbaskhan.cs25@bmsce.ac.in`, "_blank")}>abbaskhan.cs25@bmsce.ac.in</a></p>
        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.cs25@bmsce.ac.in`, "_blank")}>abhishek.cs25@bmsce.ac.in</a></p>
        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abhinaya.ec24@bmsce.ac.in`, "_blank")}>abhinaya.ec24@bmsce.ac.in</a></p>
        <p><a href="#" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=abhinayaks.cs25@bmsce.ac.in`, "_blank")}>abhinayaks.cs25@bmsce.ac.in</a></p>

        <br />
        <p>© 2025 FranchiseConnect. All Rights Reserved.</p>
      </footer>
  );
}

/* ---------- Main DashboardPage (composes all layouts) ---------- */
export default function DashboardPage() {
  const navigate = useNavigate();
  const allBrands = useMemo(() => generateBrands(), []);
  const [brands, setBrands] = useState(allBrands);
  const [filteredBrands, setFilteredBrands] = useState(allBrands);

  const handleSearch = (q) => {
    const v = q.trim().toLowerCase();
    if (!v) {
      setFilteredBrands(allBrands);
      return;
    }
    setFilteredBrands(allBrands.filter(b => (b.title + " " + b.categoryName).toLowerCase().includes(v)));
  };

  const handleSelectSubcategory = (catId, subTitle) => {
    // Filter by category (you can enhance to filter by subTitle if you have mapping)
    setFilteredBrands(allBrands.filter((b) => b.categoryId === catId));
    // Scroll to brands
    setTimeout(() => window.scrollTo({ top: 600, behavior: "smooth" }), 300);
  };

  return (
    <div className="dashboard-page home-container">
      <TopStrip onSearch={handleSearch} />

      <div className="main-wrapper container">
        <CategoriesRow onSelectSubcategory={handleSelectSubcategory} />

        <AdSlider onAdClick={(i) => { window.open(adUrls[i], "_blank"); }} />

        <div className="content-grid">
          <div className="left-column">
            <BrandsGrid brands={filteredBrands} />
          </div>
        </div>

        <AboutSection />
        <MoreSimilarSites />
      </div>

      <SiteFooter />
    </div>
  );
}
