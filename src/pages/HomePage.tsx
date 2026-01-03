import { Link } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { TourCard } from "@/components/website/TourCard";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Car, 
  Package, 
  Shield, 
  Clock, 
  HeadphonesIcon, 
  Wallet,
  Star,
  Quote
} from "lucide-react";

const featuredTours = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
    name: "Taj Mahal Sunrise Tour",
    location: "Agra",
    duration: "1 Day",
    price: 2500,
    rating: 4.9,
    featured: true,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    name: "Kerala Backwaters",
    location: "Kerala",
    duration: "3 Days",
    price: 12000,
    rating: 4.8,
    featured: true,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    name: "Himalayan Adventure",
    location: "Himachal",
    duration: "5 Days",
    price: 18000,
    rating: 4.7,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    name: "Goa Beach Paradise",
    location: "Goa",
    duration: "4 Days",
    price: 15000,
    rating: 4.6,
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Mumbai",
    text: "Amazing experience! The tour was well organized and the guide was very knowledgeable. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    location: "Delhi",
    text: "Best travel agency I've ever used. They took care of everything and made our trip memorable.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    location: "Bangalore",
    text: "Great service and competitive prices. Will definitely book again for my next vacation.",
    rating: 4,
  },
];

const HomePage = () => {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-success to-success/80 text-primary-foreground py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Journey, Our Priority
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 animate-fade-in">
              Green Cab Tours & Travels — Explore breathtaking destinations, book unforgettable tours, 
              and create memories that last a lifetime. Safe, reliable, and affordable travel.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Link to="/tours">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                  <Plane className="mr-2 h-5 w-5" />
                  Explore Tours
                </Button>
              </Link>
              <Link to="/car-rental">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-success">
                  <Car className="mr-2 h-5 w-5" />
                  Rent a Car
                </Button>
              </Link>
              <Link to="/packages">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-success">
                  <Package className="mr-2 h-5 w-5" />
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the best travel experience with our professional services and competitive prices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Safe & Secure</h3>
              <p className="text-muted-foreground text-sm">
                Your safety is our priority. All tours are vetted and insured.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">24/7 Availability</h3>
              <p className="text-muted-foreground text-sm">
                We're always here to help, anytime you need assistance.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <HeadphonesIcon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Expert Guides</h3>
              <p className="text-muted-foreground text-sm">
                Experienced local guides who know every destination inside out.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Best Prices</h3>
              <p className="text-muted-foreground text-sm">
                Competitive pricing with no hidden costs or surprise fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Tours</h2>
              <p className="text-muted-foreground">Explore our most popular destinations</p>
            </div>
            <Link to="/tours">
              <Button variant="outline">View All Tours</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy travelers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-background p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
              >
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-success text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Contact Green Cab today and let us help you plan the perfect trip. 
            Whether it's a weekend getaway or a month-long adventure, we've got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                Book Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-success">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default HomePage;
