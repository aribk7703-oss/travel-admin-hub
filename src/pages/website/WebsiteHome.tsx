import { Link } from "react-router-dom";
import { useState } from "react";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useTours } from "@/hooks/useTours";
import { useLocations } from "@/hooks/useLocations";
import { useCars } from "@/hooks/useCars";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Car,
  CheckCircle,
  Briefcase,
  Fuel,
  Snowflake,
  MessageCircle
} from "lucide-react";

const WebsiteHome = () => {
  const { tours } = useTours();
  const { locations } = useLocations();
  const { cars } = useCars();
  const { posts } = useBlogPosts();

  const activeTours = tours.filter((t) => t.status === "active").slice(0, 6);
  const activeCars = cars.filter((c) => c.status === "active").slice(0, 6);
  const publishedPosts = posts.filter((p) => p.status === "published").slice(0, 3);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
    carType: ""
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I want to book a ride.\n\nPickup: ${bookingForm.location}\nDate: ${bookingForm.pickupDate}\nReturn: ${bookingForm.returnDate}\nVehicle: ${bookingForm.carType}`;
    window.open(`https://wa.me/919970178500?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getCarIcon = (feature: string) => {
    if (feature.toLowerCase().includes('ac') || feature.toLowerCase().includes('fully')) return <Snowflake className="h-4 w-4" />;
    if (feature.toLowerCase().includes('diesel') || feature.toLowerCase().includes('hybrid')) return <Fuel className="h-4 w-4" />;
    if (feature.toLowerCase().includes('bag')) return <Briefcase className="h-4 w-4" />;
    return <Briefcase className="h-4 w-4" />;
  };

  return (
    <WebsiteLayout>
      {/* Hero Section with Booking Form */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Safe <span className="text-yellow-400">Heritage</span> & <br />Local Travel
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                The most trusted car rental in Aurangabad. From heritage tours to corporate travel, we ensure every mile is a premium experience.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-primary-foreground font-semibold">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  24/7 Service
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  Professional Chauffeurs
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-card rounded-2xl p-6 shadow-2xl">
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Pick-up Location</label>
                  <Input
                    placeholder="City, Hotel or Airport"
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Pick-up Date</label>
                    <Input
                      type="date"
                      value={bookingForm.pickupDate}
                      onChange={(e) => setBookingForm({...bookingForm, pickupDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Return Date</label>
                    <Input
                      type="date"
                      value={bookingForm.returnDate}
                      onChange={(e) => setBookingForm({...bookingForm, returnDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Vehicle Class</label>
                  <Select value={bookingForm.carType} onValueChange={(value) => setBookingForm({...bookingForm, carType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hatchback">Hatchback (Budget)</SelectItem>
                      <SelectItem value="Sedan">Sedan (Executive)</SelectItem>
                      <SelectItem value="SUV">Premium SUV</SelectItem>
                      <SelectItem value="Traveller">Tempo Traveller</SelectItem>
                      <SelectItem value="Bus">Luxury Coach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full gap-2 bg-green-600 hover:bg-green-700" size="lg">
                  <MessageCircle className="h-5 w-5" />
                  Book Ride
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
                alt="GreenCab Chauffeur"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <span className="text-primary font-semibold">The GreenCab Legacy</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Excellence In Motion Since 2012
              </h2>
              <p className="text-muted-foreground mb-6">
                We started with a single cab and a promise: to treat every traveler like family. Today, Green Cab Service is the gold standard for hospitality and reliability in Central Maharashtra.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  GPS Enabled
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Fixed Billing
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Clean Interiors
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  24/7 SOS
                </div>
              </div>
              <Link to="/website/about">
                <Button size="lg">Plan Your Trip</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold">Modern Fleet</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Drive in Style</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCars.map((car) => (
              <Card key={car.id} className="overflow-hidden group hover:shadow-lg transition-shadow text-center">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-3">{car.name}</h3>
                  <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {car.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      {getCarIcon(car.feature)}
                      {car.feature}
                    </span>
                  </div>
                  <p className="font-bold text-primary mb-4">{car.pricePerKm === "Contact" ? "Contact for Quote" : `From ${car.pricePerKm}`}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Book {car.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/website/fleet">
              <Button variant="outline" className="gap-2">
                View All Fleet <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold">Popular Destinations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Heritage Tour Packages</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    {tour.location}
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Book Tour
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/website/tours">
              <Button variant="outline" className="gap-2">
                View All Tours <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold">Travel Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Our Latest Blogs</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                  <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link to={`/website/blog/${post.slug}`} className="text-primary font-medium hover:underline flex items-center gap-1">
                    Read Story <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/website/blog">
              <Button variant="outline" className="gap-2">
                View All Blogs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteHome;
