import { useState } from "react";
import "boxicons/css/boxicons.min.css";

export const GCHeroSection = () => {
  const [formData, setFormData] = useState({
    location: "",
    pickup: "",
    returnDate: "",
    carType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp booking logic
    const message = `New Booking Request:
📍 Location: ${formData.location}
📅 Pickup: ${formData.pickup}
📅 Return: ${formData.returnDate}
🚗 Vehicle: ${formData.carType}`;
    
    window.open(
      `https://wa.me/919970178500?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="gc-home" id="home">
      <div className="text">
        <h1>
          Safe <span>Heritage</span> & <br />
          Local Travel
        </h1>
        <p>
          The most trusted car rental in Aurangabad. From heritage tours to
          corporate travel, we ensure every mile is a premium experience.
        </p>
        <div className="gc-features-row">
          <span>
            <i className="bx bxs-check-circle"></i> 24/7 Service
          </span>
          <span>
            <i className="bx bxs-check-circle"></i> Professional Chauffeurs
          </span>
        </div>
      </div>

      <div className="gc-form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span>Pick-up Location</span>
            <input
              type="text"
              placeholder="City, Hotel or Airport"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div className="input-box">
            <span>Pick-up Date</span>
            <input
              type="date"
              value={formData.pickup}
              onChange={(e) =>
                setFormData({ ...formData, pickup: e.target.value })
              }
              required
            />
          </div>

          <div className="input-box">
            <span>Return Date</span>
            <input
              type="date"
              value={formData.returnDate}
              onChange={(e) =>
                setFormData({ ...formData, returnDate: e.target.value })
              }
              required
            />
          </div>

          <div className="input-box">
            <span>Vehicle Class</span>
            <select
              value={formData.carType}
              onChange={(e) =>
                setFormData({ ...formData, carType: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select class
              </option>
              <option value="Hatchback">Hatchback (Budget)</option>
              <option value="Sedan">Sedan (Executive)</option>
              <option value="SUV">Premium SUV</option>
              <option value="Traveller">Tempo Traveller</option>
              <option value="Bus">Luxury Coach</option>
            </select>
          </div>

          <button type="submit" className="gc-btn" style={{ width: "100%" }}>
            <i className="bx bxl-whatsapp"></i> Book Ride
          </button>
        </form>
      </div>
    </section>
  );
};
