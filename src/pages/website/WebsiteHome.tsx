import { Link } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useTours } from "@/hooks/useTours";
import { useLocations } from "@/hooks/useLocations";
import { useCars } from "@/hooks/useCars";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ArrowRight, Users, Compass, Car, Map } from "lucide-react";

const WebsiteHome = () => {
  const { tours } = useTours();
  const { locations } = useLocations();
  const { cars } = useCars();

  const activeTours = tours.filter((t) => t.status === "active").slice(0, 3);
  const activeLocations = locations.filter((l) => l.status === "active").slice(0, 4);
  const activeCars = cars.filter((c) => c.status === "active").slice(0, 3);

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Discover Maharashtra's Hidden Treasures
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
              Experience the rich heritage, ancient caves, and stunning landscapes with our expertly curated tours and reliable transportation services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/website/tours">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Compass className="h-5 w-5" />
                  Explore Tours
                </Button>
              </Link>
              <Link to="/website/fleet">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Car className="h-5 w-5" />
                  View Fleet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{tours.length}+</div>
              <div className="text-sm text-muted-foreground">Tour Packages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{locations.length}+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{cars.length}+</div>
              <div className="text-sm text-muted-foreground">Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Popular Tours</h2>
              <p className="text-muted-foreground">Discover our most-loved travel experiences</p>
            </div>
            <Link to="/website/tours">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary">
                    {tour.price}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {tour.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tour.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Top Destinations</h2>
              <p className="text-muted-foreground">Explore heritage sites and natural wonders</p>
            </div>
            <Link to="/website/destinations">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeLocations.map((location) => (
              <Card key={location.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 capitalize" variant="secondary">
                    {location.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{location.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{location.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Our Fleet</h2>
              <p className="text-muted-foreground">Comfortable and reliable vehicles for every journey</p>
            </div>
            <Link to="/website/fleet">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCars.map((car) => (
              <Card key={car.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-foreground">{car.name}</h3>
                    <Badge variant="outline">{car.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {car.seats} Seats
                    </span>
                    <span>{car.feature}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-primary font-semibold">{car.pricePerKm}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today to plan your perfect trip. We offer customized tour packages and transportation services tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/website/tours">
              <Button size="lg" variant="secondary">
                Browse Tours
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteHome;
