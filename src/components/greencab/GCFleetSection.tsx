import "boxicons/css/boxicons.min.css";

const fleetData = [
  {
    name: "Executive Sedan",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=400",
    seats: "4 Seats",
    bags: "3 Bags",
    price: "From ₹13/km",
  },
  {
    name: "Premium SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=400",
    seats: "7 Seats",
    bags: "5 Bags",
    price: "From ₹18/km",
  },
  {
    name: "City Hatchback",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=400",
    seats: "4 Seats",
    feature: "Eco",
    price: "From ₹11/km",
  },
  {
    name: "Urban Tempo Traveller",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=400",
    seats: "17 Seats",
    feature: "Fully AC",
    price: "From ₹24/km",
  },
  {
    name: "Economy MUV",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400",
    seats: "6 Seats",
    feature: "Hybrid",
    price: "From ₹15/km",
  },
  {
    name: "Luxury Tourist Coach",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    seats: "40+ Seats",
    feature: "Video Coach",
    price: "Contact for Quote",
  },
];

export const GCFleetSection = () => {
  const handleBook = (carName: string) => {
    const message = `I'm interested in booking: ${carName}`;
    window.open(
      `https://wa.me/919970178500?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="gc-fleet" id="fleet">
      <div className="gc-heading">
        <span>Modern Fleet</span>
        <h1>Drive in Style</h1>
      </div>
      <div className="gc-fleet-container">
        {fleetData.map((car) => (
          <div key={car.name} className="gc-fleet-box">
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <div className="gc-fleet-specs">
              <span>
                <i className="bx bxs-user"></i> {car.seats}
              </span>
              <span>
                <i className={car.bags ? "bx bxs-briefcase" : "bx bxs-cool"}></i>{" "}
                {car.bags || car.feature}
              </span>
            </div>
            <p className="gc-fleet-price">{car.price}</p>
            <button className="gc-btn small-btn" onClick={() => handleBook(car.name)}>
              Book {car.name.split(" ")[0]}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
