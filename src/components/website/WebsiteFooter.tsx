import { Link } from "react-router-dom";
import { Plane, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const WebsiteFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary-foreground flex items-center justify-center">
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold">TravelGo</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for unforgettable travel experiences. We offer the best tours, 
              car rentals, and travel packages at competitive prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tours-listing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/car-rental" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80 text-sm">Guided Tours</li>
              <li className="text-primary-foreground/80 text-sm">Car Rentals</li>
              <li className="text-primary-foreground/80 text-sm">Hotel Booking</li>
              <li className="text-primary-foreground/80 text-sm">Travel Packages</li>
              <li className="text-primary-foreground/80 text-sm">Airport Transfers</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Travel Street, Tourism City, TC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span className="text-primary-foreground/80 text-sm">info@travelgo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} TravelGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
