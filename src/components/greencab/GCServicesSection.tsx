import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const servicesData = [
  {
    icon: "bxs-taxi",
    title: "City Taxi",
    description: "Comfortable and affordable rides within Aurangabad city with professional drivers.",
    href: "/services/city-taxi",
  },
  {
    icon: "bxs-plane-take-off",
    title: "Airport Pickup",
    description: "Timely airport transfers with flight tracking and meet & greet services.",
    href: "/services/airport-pickup",
  },
  {
    icon: "bxs-map-alt",
    title: "Heritage Tours",
    description: "Explore Ajanta, Ellora, and other UNESCO sites with expert local guides.",
    href: "/services/heritage-tours",
  },
  {
    icon: "bxs-car",
    title: "Outstation Cab",
    description: "Long-distance travel to Mumbai, Pune, Nashik, and all major cities.",
    href: "/services/outstation-cab",
  },
  {
    icon: "bxs-briefcase",
    title: "Corporate Events",
    description: "Professional fleet services for corporate meetings and events.",
    href: "/services/corporate-events",
  },
  {
    icon: "bxs-right-arrow-circle",
    title: "One Way Cab",
    description: "Pay only for one way. No return fare charges on select routes.",
    href: "/services/one-way",
  },
];

export const GCServicesSection = () => {
  return (
    <section className="gc-services" id="services">
      <div className="gc-heading">
        <span>What We Offer</span>
        <h1>Our Services</h1>
      </div>

      <div className="gc-services-container">
        {servicesData.map((service) => (
          <div key={service.title} className="gc-service-box">
            <i className={`bx ${service.icon}`}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to={service.href} className="gc-btn small-btn" style={{ marginTop: "20px" }}>
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
