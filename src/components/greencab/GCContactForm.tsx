import { useState } from "react";
import "boxicons/css/boxicons.min.css";

export const GCContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Contact Request:
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
💬 Message: ${formData.message}`;

    window.open(
      `https://wa.me/919970178500?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="gc-contact" id="contact">
      <div className="gc-contact-container">
        <div className="gc-contact-info-section">
          <div className="gc-heading" style={{ textAlign: "left", marginBottom: "30px" }}>
            <span>Get In Touch</span>
            <h1>Contact Us</h1>
          </div>

          <div className="gc-contact-info-box">
            <i className="bx bxs-phone"></i>
            <div>
              <h4>Phone</h4>
              <p>+91 99701 78500</p>
            </div>
          </div>

          <div className="gc-contact-info-box">
            <i className="bx bxs-envelope"></i>
            <div>
              <h4>Email</h4>
              <p>info@greencab.in</p>
            </div>
          </div>

          <div className="gc-contact-info-box">
            <i className="bx bxs-map"></i>
            <div>
              <h4>Address</h4>
              <p>Aurangabad, Maharashtra, India</p>
            </div>
          </div>

          <div className="gc-contact-info-box">
            <i className="bx bxs-time"></i>
            <div>
              <h4>Working Hours</h4>
              <p>24/7 Available</p>
            </div>
          </div>
        </div>

        <div className="gc-contact-form">
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button type="submit" className="gc-btn" style={{ width: "100%" }}>
              <i className="bx bxl-whatsapp"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
