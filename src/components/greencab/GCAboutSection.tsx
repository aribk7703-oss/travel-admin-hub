import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

export const GCAboutSection = () => {
  return (
    <section className="gc-about" id="about">
      <div className="gc-about-container">
        <div className="gc-about-img">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
            alt="GreenCab Chauffeur"
          />
        </div>
        <div className="gc-about-text">
          <h2>About Us</h2>
          <span>The GreenCab Legacy</span>
          <h2>Excellence In Motion Since 2012</h2>
          <p>
            We started with a single cab and a promise: to treat every traveler
            like family. Today, Green Cab Service is the gold standard for
            hospitality and reliability in Central Maharashtra.
          </p>
          <div className="gc-features-grid">
            <div className="gc-feature-item">
              <i className="bx bxs-badge-check"></i> GPS Enabled
            </div>
            <div className="gc-feature-item">
              <i className="bx bxs-badge-check"></i> Fixed Billing
            </div>
            <div className="gc-feature-item">
              <i className="bx bxs-badge-check"></i> Clean Interiors
            </div>
            <div className="gc-feature-item">
              <i className="bx bxs-badge-check"></i> 24/7 SOS
            </div>
          </div>
          <Link to="/about" className="gc-btn" style={{ marginTop: "30px" }}>
            Plan Your Trip
          </Link>
        </div>
      </div>
    </section>
  );
};
