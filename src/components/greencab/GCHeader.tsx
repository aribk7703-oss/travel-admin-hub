import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    dropdown: [
      { href: "/services/city-taxi", label: "City Taxi" },
      { href: "/services/airport-pickup", label: "Airport Pickup" },
      { href: "/services/heritage-tours", label: "Heritage Tours" },
      { href: "/services/outstation-cab", label: "Outstation Cab" },
      { href: "/services/corporate-events", label: "Corporate Events" },
      {
        href: "/services/one-way",
        label: "One Way Cab",
        submenu: [
          { href: "/services/one-way/pune", label: "Aurangabad → Pune" },
          { href: "/services/one-way/mumbai", label: "Aurangabad → Mumbai" },
          { href: "/services/one-way/shirdi", label: "Aurangabad → Shirdi" },
          { href: "/services/one-way/nashik", label: "Aurangabad → Nashik" },
        ],
      },
    ],
  },
  { href: "/fleet", label: "Fleet" },
  {
    href: "/tours",
    label: "Tours",
    dropdown: [
      { href: "/tours/ajanta", label: "Ajanta Caves" },
      { href: "/tours/ellora", label: "Ellora Caves" },
      { href: "/tours/grishneshwar", label: "Grishneshwar Jyotirlinga" },
      { href: "/tours/bibi-ka-maqbara", label: "Bibi Ka Maqbara" },
      { href: "/tours/daulatabad", label: "Daulatabad Fort" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export const GCHeader = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="gc-header">
      <Link to="/" className="logo">
        <i className="bx bxs-car"></i> GreenCab
      </Link>

      <div
        className={`bx ${mobileMenuOpen ? "bx-x" : "bx-menu"} gc-menu-icon`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      ></div>

      <ul className={`gc-navbar ${mobileMenuOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <li
            key={link.label}
            className={`${link.dropdown ? "dropdown" : ""} ${
              openDropdowns.includes(link.label) ? "open" : ""
            }`}
          >
            {link.dropdown ? (
              <>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (window.innerWidth <= 992) {
                      e.preventDefault();
                      toggleDropdown(link.label);
                    }
                  }}
                  className={isActive(link.href) ? "active" : ""}
                >
                  {link.label} <i className="bx bx-chevron-down"></i>
                </a>
                <ul className="gc-dropdown-menu">
                  {link.dropdown.map((item) => (
                    <li
                      key={item.label}
                      className={`${item.submenu ? "gc-dropdown-submenu" : ""} ${
                        openDropdowns.includes(item.label) ? "open" : ""
                      }`}
                    >
                      {item.submenu ? (
                        <>
                          <a
                            href={item.href}
                            onClick={(e) => {
                              if (window.innerWidth <= 992) {
                                e.preventDefault();
                                toggleDropdown(item.label);
                              }
                            }}
                          >
                            {item.label} <i className="bx bx-chevron-right"></i>
                          </a>
                          <ul className="gc-submenu">
                            {item.submenu.map((sub) => (
                              <li key={sub.label}>
                                <Link
                                  to={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={isActive(link.href) ? "active" : ""}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
        <li className="nav-auth">
          <a href="#" className="gc-nav-btn">
            Login
          </a>
        </li>
        <li className="nav-auth">
          <a href="#" className="gc-nav-btn gc-signup-btn">
            Sign Up
          </a>
        </li>
      </ul>
    </header>
  );
};
