import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const tourismData = [
  {
    title: "🛕 Spiritual Places",
    links: [
      { label: "Shirdi", href: "/places/shirdi" },
      { label: "Pandharpur", href: "/places/pandharpur" },
      { label: "Trimbakeshwar", href: "/places/trimbakeshwar" },
      { label: "Bhimashankar", href: "/places/bhimashankar" },
      { label: "Tuljapur", href: "/places/tuljapur" },
    ],
  },
  {
    title: "🏰 Heritage & Historical",
    links: [
      { label: "Ajanta Caves", href: "/tours/ajanta" },
      { label: "Ellora Caves", href: "/tours/ellora" },
      { label: "Daulatabad Fort", href: "/tours/daulatabad" },
      { label: "Raigad Fort", href: "/places/raigad" },
      { label: "Sindhudurg Fort", href: "/places/sindhudurg" },
    ],
  },
  {
    title: "⛰️ Nature & Hill Stations",
    links: [
      { label: "Mahabaleshwar", href: "/places/mahabaleshwar" },
      { label: "Lonavala", href: "/places/lonavala" },
      { label: "Matheran", href: "/places/matheran" },
      { label: "Bhandardara", href: "/places/bhandardara" },
      { label: "Chikhaldara", href: "/places/chikhaldara" },
    ],
  },
  {
    title: "🏖️ Coastal & Beach",
    links: [
      { label: "Alibaug", href: "/places/alibaug" },
      { label: "Tarkarli", href: "/places/tarkarli" },
      { label: "Ganpatipule", href: "/places/ganpatipule" },
      { label: "Murud Janjira", href: "/places/murud-janjira" },
      { label: "Ratnagiri", href: "/places/ratnagiri" },
    ],
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Blog", href: "/blog" },
];

const serviceLinks = [
  { label: "City Taxi", href: "/services/city-taxi" },
  { label: "Airport Pickup", href: "/services/airport-pickup" },
  { label: "Heritage Tours", href: "/services/heritage-tours" },
  { label: "Outstation Cab", href: "/services/outstation-cab" },
  { label: "Corporate Events", href: "/services/corporate-events" },
  { label: "One Way Cab", href: "/services/one-way" },
];

export const GCFooter = () => {
  return (
    <footer className="gc-footer">
      {/* Tourism Section */}
      <div className="gc-footer-tourism">
        <h3>📍 Top Tourist Places in Maharashtra</h3>
        <div className="gc-tourism-grid">
          {tourismData.map((category) => (
            <div key={category.title} className="gc-tourism-col">
              <h4>{category.title}</h4>
              <ul>
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Grid */}
      <section className="gc-footer-grid">
        <div className="gc-footer-col">
          <Link to="/" className="logo">
            <i className="bx bxs-car"></i> GreenCab
          </Link>
          <p>
            Safe, reliable and eco-friendly cab services in Aurangabad with
            professional drivers.
          </p>
          <div className="gc-social-icons">
            <a
              href="https://www.facebook.com/greencabservice"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/green_cab_service"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-instagram"></i>
            </a>
            <a
              href="https://twitter.com/greencabservice"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-twitter"></i>
            </a>
          </div>
        </div>

        <div className="gc-footer-col">
          <h3>Quick Links</h3>
          <ul className="gc-footer-links">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="gc-footer-col">
          <h3>Services</h3>
          <ul className="gc-footer-links">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="gc-footer-col">
          <h3>Contact</h3>
          <div className="gc-contact-info">
            <p>24/7 Helpline</p>
            <p className="phone">+91 99701 78500</p>
            <p style={{ marginTop: "15px" }}>Aurangabad, India</p>
          </div>
        </div>
      </section>

      <div className="gc-footer-bottom">
        <p>© {new Date().getFullYear()} Green Cab Service. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
