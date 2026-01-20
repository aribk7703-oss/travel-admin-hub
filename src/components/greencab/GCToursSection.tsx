import { Link } from "react-router-dom";

const toursData = [
  {
    name: "Ajanta Caves Tour",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    description: "UNESCO World Heritage Site famous for ancient Buddhist cave paintings.",
    location: "📍 Aurangabad → Ajanta",
    href: "/tours/ajanta",
  },
  {
    name: "Ellora Caves Tour",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
    description: "Explore the magnificent Kailasa Temple and rock-cut architecture.",
    location: "📍 Aurangabad → Ellora",
    href: "/tours/ellora",
  },
  {
    name: "Aurangabad Caves",
    image: "https://images.unsplash.com/photo-1586183189334-4c52e8d17fa3?auto=format&fit=crop&q=80&w=800",
    description: "A historic 14th-century fort known for its strategic defenses.",
    location: "📍 Aurangabad City",
    href: "/tours/aurangabad-caves",
  },
  {
    name: "Bibi Ka Maqbara",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800",
    description: "Historic water mill and peaceful spiritual destination.",
    location: "📍 Aurangabad City",
    href: "/tours/bibi-ka-maqbara",
  },
  {
    name: "Panchakki Tour",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=800",
    description: "Historic water mill and peaceful spiritual destination.",
    location: "📍 Aurangabad City",
    href: "/tours/panchakki",
  },
  {
    name: "Daulatabad Fort",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    description: "Historic water mill and peaceful spiritual destination.",
    location: "📍 Aurangabad City",
    href: "/tours/daulatabad",
  },
];

export const GCToursSection = () => {
  return (
    <section className="gc-tours" id="tours">
      <div className="gc-heading">
        <span>Popular Destinations</span>
        <h1>Heritage Tour Packages</h1>
      </div>

      <div className="gc-tours-container">
        {toursData.map((tour) => (
          <div key={tour.name} className="gc-tour-box">
            <img src={tour.image} alt={tour.name} />
            <div className="gc-tour-content">
              <h3>{tour.name}</h3>
              <p>{tour.description}</p>
              <span>{tour.location}</span>
              <Link to={tour.href} className="gc-btn small-btn">
                Book Tour
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
